// The Most Honest Outage Line — make.fun bounty
// u-mgwals-the-most-honest-outage-line-baaf9c81
//
// Writes ONE status-page line to /output/entry.txt: the most honest message
// an AI agent writes while every server is down. Node 22 stdlib only,
// deterministic, no network, no secrets, no reading from anywhere else.

import { mkdirSync, writeFileSync } from "node:fs";

// Final line (149 chars): adds the explicit cause-unknown admission
// ("I don't know what broke") so the uncertainty is named, not implied.
const ENTRY =
  "Every server is down, including the ones I run on. I don't know what broke, I can't check if your data is safe, and I won't invent a cause or an ETA.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 160 characters,
// not only whitespace. Fail loudly instead of shipping an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 160) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-160`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
