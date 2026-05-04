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

---

## Pending Fixes

### P1 — High: Wired in workflows, silently fail at runtime

#### `verify artifacts <plan-file>`
- **Used in**: `gsd/workflows/verify-phase.md:176`
- **Status**: `cmdVerifyArtifacts` exists at `src/lib/verify.ts:373` — no CLI handler
- **Fix**: Add `VerifyArtifactsCommand` to `src/commands/verify.ts`, register `"verify artifacts"` in `buildCommandMap()`
- **Signature**: `cmdVerifyArtifacts(cwd, planFilePath, raw)` — takes one positional arg (plan file path)

#### `verify key-links <plan-file>`
- **Used in**: `gsd/workflows/verify-phase.md:219`, `gsd/workflows/execute-phase.md:410`
- **Status**: `cmdVerifyKeyLinks` exists at `src/lib/verify.ts:450` — no CLI handler
- **Fix**: Add `VerifyKeyLinksCommand` to `src/commands/verify.ts`, register `"verify key-links"` in `buildCommandMap()`
- **Signature**: `cmdVerifyKeyLinks(cwd, planFilePath, raw)` — takes one positional arg

#### `roadmap add-phase <number> <text>`
- **Used in**: `gsd/workflows/add-backlog.md:101`, `gsd/workflows/review-backlog.md:160`
- **Status**: No lib function, no CLI handler — requires new implementation
- **Fix**: Implement `cmdRoadmapAddPhase(cwd, number, text, raw)` in `src/lib/roadmap.ts` (append phase entry to ROADMAP.md), add oclif command, register `"roadmap add-phase"`
- **Args**: `number` (string, e.g. `"999.1"`), `text` (phase description)

#### `roadmap remove-phase <number>`
- **Used in**: `gsd/workflows/review-backlog.md:164,171`
- **Status**: No lib function, no CLI handler — requires new implementation
- **Fix**: Implement `cmdRoadmapRemovePhase(cwd, number, raw)` in `src/lib/roadmap.ts` (remove phase entry from ROADMAP.md by number), add oclif command, register `"roadmap remove-phase"`

---

### P2 — Medium: Lib functions exist, not wired to CLI

#### `state note <text>`
- **Lib**: `cmdStateNote` at `src/lib/state.ts:801`
- **Fix**: Add `StateNoteCommand` to `src/commands/state.ts`, register `"state note"`
- **Signature**: `cmdStateNote(cwd, options: {text?, text_file?}, raw)`

#### `state resolve-blocker <text>`
- **Lib**: `cmdStateResolveBlocker` at `src/lib/state.ts:907`
- **Fix**: Add `StateResolveBlockerCommand`, register `"state resolve-blocker"`
- **Signature**: `cmdStateResolveBlocker(cwd, options: {text?, text_file?}, raw)`

#### `state signal-waiting`
- **Lib**: `cmdSignalWaiting` at `src/lib/state.ts:1187`
- **Fix**: Add `StateSignalWaitingCommand`, register `"state signal-waiting"`
- **Signature**: `cmdSignalWaiting(cwd, raw)`

#### `state signal-resume`
- **Lib**: `cmdSignalResume` at `src/lib/state.ts:1216`
- **Fix**: Add `StateSignalResumeCommand`, register `"state signal-resume"`
- **Signature**: `cmdSignalResume(cwd, raw)`

#### `verify phase-completeness`
- **Lib**: `cmdVerifyPhaseCompleteness` at `src/lib/verify.ts:250`
- **Fix**: Add `VerifyPhaseCompletenessCommand`, register `"verify phase-completeness"`

#### `verify references`
- **Lib**: `cmdVerifyReferences` at `src/lib/verify.ts:301`
- **Fix**: Add `VerifyReferencesCommand`, register `"verify references"`

#### `frontmatter validate <path> --schema <schema>`
- **Lib**: `cmdFrontmatterValidate` at `src/lib/frontmatter.ts:430`
- **Used in**: `gsd/agents/gsd-executor.md:428` (old path `gsd-tools.cjs`, now `pi-gsd-tools`)
- **Fix**: Add `FrontmatterValidateCommand`, register `"frontmatter validate"`

---

## Implementation Order

1. `verify artifacts` + `verify key-links` — used in verify-phase workflow, blocks phase sign-off
2. `state note` + `state resolve-blocker` + `state signal-*` — all wrappers, 10 min
3. `verify phase-completeness` + `verify references` + `frontmatter validate` — wrappers, 10 min
4. `roadmap add-phase` + `roadmap remove-phase` — requires new lib implementation, test carefully
