# UI walkthrough notes for <your app>

Point `notes` in `ui-walkthrough.config.json` at a copy of this file. The agent reads it before planning a video. Keep it short and specific.

## Accounts and sessions

- Who signs in for recordings, and which roles they cover (e.g. "the admin account can also open the customer area as Test Customer").
- Separate session files, if any (e.g. `.ui-walkthrough/auth/customer.json`).

## Test data

- Records that are safe to film and to change temporarily: …
- Records never to film (real customers, payroll, anything personal): …

## Never do

- Actions with side effects that a tour must not trigger (sending email, charging cards, provisioning, webhooks): …
- Commands not to run from the before/after copies (e.g. backend dev commands that deploy or sync to a shared environment): …

## On screen

- Banners or dialogs to dismiss in `setup` (cookie consent, onboarding tours, beta notices) and the button to press: …
- Pages that load slowly or need a wait (`waitForHidden` on a loading line): …

## Words

- Product names whisper may mishear, for `captionFixes`: …
