# LINKIMPACT refinement — deployment preparation

Source archive: LINKIMPACT_final_refinement_2026(1).zip.
Production base: 25d9dfb13e7af2a1a43b6d99af8f590231f0c57d (cloudflare-dashboard).
Backup branch: backup/pre-refinement-2026-10-09.

## Implementation

- Worker serves the latest front document at `/` through `/api/front`, retaining the existing app router, administrator, post APIs, D1 and R2 bindings.
- Published posts, notices, chapter counts, article content and map entries come from the same production database. The public rendering query does not migrate, seed, update or delete records.
- Archive article metadata maps to existing database IDs (including SOVAC 43). Newly added activities appear in the community chapter; unknown locations are not invented on the map.
- Prototype localStorage CMS, static admin.html and example recruitment form are excluded. Original news and application routes remain available.
- Donation receipt requests use the existing `form_submissions` store and a protected `/admin/donations` view. No new table or outbound email is added. The form only requests an eligibility review; it does not promise legal issuance.
- KO/EN donation text, audio toggle, media files, chapter and map controls, account copy and receipt modal are retained.
- Existing applicant form had duplicated `interests` label/options keys; these now use distinct keys.

## Completed checks

- Vinext build passed.
- New integration tests: 5 passed (live DB content rendering, injection escaping, asset existence, donation input validation, persistence/throttling using a mocked DB).
- TypeScript passed after adding Wrangler-generated runtime declarations and typing existing JSON responses.
- Lint passed with existing image/unused-variable warnings.
- Production domain responded HTTP 200 before changes. This verifies existing service availability, not deployment of this branch.

## Required before production promotion

1. Actual Cloudflare project confirmed from the user's authenticated dashboard: Worker `linkimpact-site`, domain `linkimpact.or.kr`, repository `catstopia-pixel/linkimpact-site`, branch `cloudflare-dashboard`, build `npm run build`, deploy `npx wrangler deploy`, root `/`. Agent browser remains blocked by a verification error.
2. Existing bindings confirmed: D1 `DB` -> `site-creator-d1` (`f8b529a9-452b-4d75-a1cc-37c44e0af834`), R2 `BUCKET` -> `site-creator-r2`; runtime has encrypted `RESEND_API_KEY`. The separate older ChatGPT Sites publication is not the deployment target.
3. D1 Time Travel confirmed with a seven-day restore window. Pre-deployment recovery bookmark captured from the dashboard on 2026-10-09 around 16:28 Asia/Seoul: `00000ab6-00000000-000050ff-8911b94916d56984724332d9eba0f084`. Independent SQL export completed on the user's Mac, as recorded below. R2 backup remains unperformed; integration does not replace or delete existing R2 objects.
4. Verify local/preview desktop and mobile layout, language switch, actual video/audio playback, notice and article navigation, chapter accordion, EXPLORE clustering/zoom, account copy, receipt submission and authenticated admin visibility. Cloud Browser could not reach terminal.local:8787; browser QA has not passed.
5. Confirm actual privacy-processing operations and retention periods. The supplied privacy text still labels itself a draft and includes an unconfirmed effective date. It must not be reported as finalized.
6. Confirm production admin Access protection also covers `/admin/donations` and the existing submissions API.
7. Build and preview against a non-production database, then promote the tested commit to the verified deployment branch only after backup.
8. Recheck linkimpact.or.kr's `X-Linkimpact-Design: refinement-2026-10-09` response and all production flows; retain the actual deployment ID and GitHub commit.

Production deployment status: NOT DEPLOYED.
Database recovery status: MANAGED TIME TRAVEL BOOKMARK RECORDED. User's Wrangler 4.149.0 exported the confirmed remote database successfully to their Downloads/LINKIMPACT_DB_backup_20261009.sql, verified from the terminal screenshot at 2026-10-09 16:38 Asia/Seoul. Export file contents have not been independently restored or inspected by the agent; the user retains the private backup.

Production schema confirmed from the user's read-only D1 Console screenshot: posts, front_settings, form_submissions, impact_stats, site_settings and wild_link_scores. posts and form_submissions column definitions match the integration queries. Unauthenticated GET /admin/donations redirects HTTP 302 to Cloudflare Access (checked before promotion).

Preview branch builds enabled by the user in Cloudflare Settings > Builds > Previews Base on 2026-10-09 around 16:45 Asia/Seoul, confirmed from the dashboard screenshot. Preview build command `npm run build`, preview command `npx wrangler preview`, root `/`. This document update triggers a work-branch build; production branch remains unchanged.
