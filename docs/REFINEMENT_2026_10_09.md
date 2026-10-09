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

1. Authenticate to the actual Cloudflare dashboard. Current agent browser was signed out and displayed a verification error; no operating Worker name, account, D1 identifier, deployment branch or build command was verified.
2. Identify the Worker serving linkimpact.or.kr and record its current deployment, routes, bindings and environment. The repository's .openai/hosting.json refers to a separate older ChatGPT Sites publication; do not deploy there as a substitute.
3. Export the actual production D1 database and preserve R2/uploads and runtime settings. A Git source backup is not a database backup.
4. Verify local/preview desktop and mobile layout, language switch, actual video/audio playback, notice and article navigation, chapter accordion, EXPLORE clustering/zoom, account copy, receipt submission and authenticated admin visibility. Cloud Browser could not reach terminal.local:8787; browser QA has not passed.
5. Confirm actual privacy-processing operations and retention periods. The supplied privacy text still labels itself a draft and includes an unconfirmed effective date. It must not be reported as finalized.
6. Confirm production admin Access protection also covers `/admin/donations` and the existing submissions API.
7. Build and preview against a non-production database, then promote the tested commit to the verified deployment branch only after backup.
8. Recheck linkimpact.or.kr's `X-Linkimpact-Design: refinement-2026-10-09` response and all production flows; retain the actual deployment ID and GitHub commit.

Production deployment status: NOT DEPLOYED.
Database backup status: NOT PERFORMED.
