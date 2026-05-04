# pi-gsd: Known Fixes Required

Audit date: 2026-05-04. Branch: `fix/missing-state-subcommands`.

---

## Already Fixed (this branch)

| Command | Fix | Commit |
|---|---|---|
| `state record-session` | Added oclif wrapper + registered in CLI map | 45ffabd |
| `state record-metric` | Added oclif wrapper + registered in CLI map | 45ffabd |
| `state add-decision` | Added oclif wrapper + registered in CLI map | 45ffabd |
| `state add-blocker` | Added oclif wrapper + registered in CLI map | 45ffabd |
| `state begin-phase` | Added oclif wrapper + registered in CLI map | 45ffabd |
| hooks ctx crash on session reload | Capture `ctx.cwd`/`ctx.ui` early in context hook | c45855f |
| `execute-phase` `--wave` flag missing | Added to workflow arg spec | c45855f |
| `execute-phase` newline delimiter splitting args | Removed `<delimiter>` from settings | c45855f |
| false "missing agents" error | `getAgentsDir()` now checks `~/.claude/agents/` first | HEAD |
| W010 wrong install command | Fixed message + remediation text in verify.ts | HEAD |
| `verify artifacts <plan>` | Added `VerifyArtifactsCommand`, registered `"verify artifacts"` | HEAD |
| `verify key-links <plan>` | Added `VerifyKeyLinksCommand`, registered `"verify key-links"` | HEAD |
| `verify phase-completeness <phase>` | Added `VerifyPhaseCompletenessCommand`, registered | HEAD |
| `verify references <file>` | Added `VerifyReferencesCommand`, registered | HEAD |
| `state note <text>` | Added `StateNoteCommand`, registered `"state note"` | HEAD |
| `state resolve-blocker <text>` | Added `StateResolveBlockerCommand`, registered | HEAD |
| `state signal-waiting` | Added `StateSignalWaitingCommand`, registered | HEAD |
| `state signal-resume` | Added `StateSignalResumeCommand`, registered | HEAD |
| `frontmatter validate <file> --schema` | Added `FrontmatterValidateCommand`, registered | HEAD |
| `roadmap add-phase <number> <text>` | Implemented lib fn + command, registered | HEAD |
| `roadmap remove-phase <number>` | Implemented lib fn + command, registered | HEAD |
| `VerifyCommand` ignores phase arg | Routes to `cmdVerifyPhaseCompleteness` when phase present | HEAD |
| `StateNoteCommand` unhandled readFileSync | Wrapped in try/catch with clean error message | HEAD |
| `StateResolveBlockerCommand` unhandled readFileSync | Wrapped in try/catch with clean error message | HEAD |
| `StatePatchCommand` argv base-flag leak | Filter known base flags by name before pair-building | HEAD |
| `StateSignalWaitingCommand` options not validated | JSON.parse validation before passing to lib | HEAD |
| `roadmap add-phase` fragile anchor + no format validation | Uses `replaceInCurrentMilestone`; validates phase number format | HEAD |
| `verify-summary` parseInt on undefined | Guard with `args[2] !== undefined` check | HEAD |

---

## Nothing pending — all known issues resolved as of 2026-05-04.
