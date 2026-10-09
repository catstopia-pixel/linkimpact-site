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
- New integration tests: 6 passed (live DB content rendering, injection escaping, asset existence, donation input validation, persistence/throttling using a mocked DB).
- TypeScript passed after adding Wrangler-generated runtime declarations and typing existing JSON responses.
- Lint passed with existing image/unused-variable warnings.
- Production domain responded HTTP 200 before changes. This verifies existing service availability, not deployment of this branch.

## Required before production promotion

1. Actual Cloudflare project confirmed from the user's authenticated dashboard: Worker `linkimpact-site`, domain `linkimpact.or.kr`, repository `catstopia-pixel/linkimpact-site`, branch `cloudflare-dashboard`, build `npm run build`, deploy `npx wrangler deploy`, root `/`. Agent browser remains blocked by a verification error.
2. Existing bindings confirmed: D1 `DB` -> `site-creator-d1` (`f8b529a9-452b-4d75-a1cc-37c44e0af834`), R2 `BUCKET` -> `site-creator-r2`; runtime has encrypted `RESEND_API_KEY`. The separate older ChatGPT Sites publication is not the deployment target.
3. D1 Time Travel confirmed with a seven-day restore window. Pre-deployment recovery bookmark captured from the dashboard on 2026-10-09 around 16:28 Asia/Seoul: `00000ab6-00000000-000050ff-8911b94916d56984724332d9eba0f084`. Independent SQL export completed on the user's Mac, as recorded below. R2 backup remains unperformed; integration does not replace or delete existing R2 objects.
4. Public preview browser QA now passes for desktop, KO/EN home and detail switching, chapter navigation, notice detail navigation, EXPLORE location clustering and story opening, account copy, receipt submission, and actual H.264 video/MP3 playback. 360px and 390px iframe viewports and a 768px tablet viewport have no document horizontal overflow. These are browser viewport checks, not physical-device tests. Authenticated administrator verification remains pending.
5. Confirm actual privacy-processing operations and retention periods. The supplied privacy text still labels itself a draft and includes an unconfirmed effective date. It must not be reported as finalized.
6. Confirm production admin Access protection also covers `/admin/donations` and the existing submissions API.
7. Build and preview against a non-production database, then promote the tested commit to the verified deployment branch only after backup.
8. Recheck linkimpact.or.kr's `X-Linkimpact-Design: refinement-2026-10-09` response and all production flows; retain the actual deployment ID and GitHub commit.

Production deployment status: NOT DEPLOYED.
Database recovery status: MANAGED TIME TRAVEL BOOKMARK RECORDED. User's Wrangler 4.149.0 exported the confirmed remote database successfully to their Downloads/LINKIMPACT_DB_backup_20261009.sql, verified from the terminal screenshot at 2026-10-09 16:38 Asia/Seoul. Export file contents have not been independently restored or inspected by the agent; the user retains the private backup.

Production schema confirmed from the user's read-only D1 Console screenshot: posts, front_settings, form_submissions, impact_stats, site_settings and wild_link_scores. posts and form_submissions column definitions match the integration queries. Unauthenticated GET /admin/donations redirects HTTP 302 to Cloudflare Access (checked before promotion).

Preview branch builds enabled by the user in Cloudflare Settings > Builds > Previews Base on 2026-10-09 around 16:45 Asia/Seoul, confirmed from the dashboard screenshot. Preview build command `npm run build`, preview command `npx wrangler preview`, root `/`. This document update triggers a work-branch build; production branch remains unchanged.

## Preview verification update

Preview: https://refinement-2026-10-09-linkimpact-site.catstopia.workers.dev/
Latest tested application commit: e51a3beb8760dffcc757072bb44c4b8e7f7a03a3.
Cloudflare preview build: 504be386-f3b2-45ab-afdf-881234eef4f0, successful.
Preview D1 binding DB uses linkimpact-preview-20261009 (04a696e0-491c-41c7-b53e-2969e39156d0), distinct from production.

Resolved issues:
- Missing preview DB binding causing HTTP 503.
- Static hero and ribbon anchors pointing to wrong or absent posts.
- HEVC videos failing to play in Chrome; converted to H.264/yuv420p with faststart and refreshed URL caches.
- Activity drawers showing both languages because they sit outside .app.
- English notices linking to Korean detail pages.
- Donor-type native option translations and visible anti-spam field.

One synthetic receipt request (QA name, example.invalid email, non-personal test phone/address) was submitted only to the preview database; UI confirmed REQUEST SAVED. No money was transferred and no receipt was issued. Business registration field visibility/required state and hidden anti-spam field were rechecked. The existing native content initialization adds its original SOVAC notices/activity when /news is first visited; this existing behavior was not changed.

Account copy placed 45093701010919 in the browser clipboard. Music playback had readyState 4, paused false and increasing currentTime, and toggled off successfully. Hero video also had readyState 4 and increasing currentTime. Butterfly intro visibly played and closed automatically. Screenshot: QA_mobile_390_20261009.jpg.

Local final checks: build passed; TypeScript passed; integration tests 6/6; lint 0 errors, 18 warnings. Full historical npm test suite was not run. Preview test pages do not validate private production data or authenticated admin writes.

Production branch was rechecked and still points to 25d9dfb13e7af2a1a43b6d99af8f590231f0c57d. Production https://linkimpact.or.kr/ visibly remains the old design. No production promotion has been performed.

Blocking facts: supplied privacy text explicitly says draft and has unconfirmed effective date, retention rules and processors/international transfers. Existing approved policy or actual operational facts are needed before describing privacy as finalized. Existing administration and APIs are preserved in code; authenticated administrator read/write verification is still pending. No deployment-success claim is made.
