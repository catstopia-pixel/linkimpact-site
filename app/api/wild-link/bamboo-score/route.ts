import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GAME_KEY = "bamboo-for-tomorrow-2026";

async function ensureTable() {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS wild_link_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_key TEXT NOT NULL,
      player_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run();

  await env.DB.prepare(`
    CREATE INDEX IF NOT EXISTS idx_wild_link_scores_game_score
    ON wild_link_scores(game_key, score DESC, created_at ASC)
  `).run();
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await env.DB.prepare(
      `SELECT player_name, score, created_at
       FROM wild_link_scores
       WHERE game_key = ?
         AND date(created_at) = date('now')
       ORDER BY score DESC, created_at ASC
       LIMIT 10`
    ).bind(GAME_KEY).all();

    return NextResponse.json({ leaderboard: rows.results ?? [] });
  } catch {
    return NextResponse.json({ leaderboard: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { score?: unknown; playerName?: unknown };
    const score = Number(body.score);
    const playerName = typeof body.playerName === "string"
      ? body.playerName.trim().slice(0, 20)
      : "";

    if (!Number.isInteger(score) || score < 0 || score > 10000) {
      return NextResponse.json({ error: "invalid_score" }, { status: 400 });
    }

    await ensureTable();
    const fallbackName = `대나무친구-${Math.floor(1000 + Math.random() * 9000)}`;
    const safeName = playerName || fallbackName;

    await env.DB.prepare(
      `INSERT INTO wild_link_scores (game_key, player_name, score)
       VALUES (?, ?, ?)`
    ).bind(GAME_KEY, safeName, score).run();

    const rankRow = await env.DB.prepare(
      `SELECT 1 + COUNT(*) AS rank
       FROM wild_link_scores
       WHERE game_key = ?
         AND date(created_at) = date('now')
         AND score > ?`
    ).bind(GAME_KEY, score).first<{ rank: number }>();

    const leaders = await env.DB.prepare(
      `SELECT player_name, score, created_at
       FROM wild_link_scores
       WHERE game_key = ?
         AND date(created_at) = date('now')
       ORDER BY score DESC, created_at ASC
       LIMIT 10`
    ).bind(GAME_KEY).all();

    return NextResponse.json({
      playerName: safeName,
      rank: Number(rankRow?.rank ?? 1),
      leaderboard: leaders.results ?? [],
    });
  } catch {
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }
}
