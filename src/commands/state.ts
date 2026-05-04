import { Args, Flags } from "@oclif/core";
import { BaseCommand } from "./base.js";

export class StateJsonCommand extends BaseCommand {
  static override description = "Output GSD state as JSON";
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags } = await this.parse(StateJsonCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateJson(cwd, raw);
  }
}

export class StateGetCommand extends BaseCommand {
  static override description = "Get a specific state field";
  static override args = { field: Args.string({ required: true }) };
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags, args } = await this.parse(StateGetCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateGet(cwd, args.field, raw);
  }
}

export class StateUpdateCommand extends BaseCommand {
  static override description = "Update a state field";
  static override args = {
    field: Args.string({ required: true }),
    value: Args.string({ required: true }),
  };
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags, args } = await this.parse(StateUpdateCommand);
    const { cwd } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateUpdate(cwd, args.field, args.value);
  }
}

export class StatePatchCommand extends BaseCommand {
  static override description = "Patch multiple state fields";
  static override args = { pairs: Args.string({ required: false }) };
  static override flags = {
    ...BaseCommand.baseFlags,
    field: Flags.string({ multiple: true, description: "field=value pair" }),
  };

  async run() {
    const { flags, argv } = await this.parse(StatePatchCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    // Parse remaining argv as key value pairs
    const patches: Record<string, string> = {};
    const BASE_FLAGS = new Set(["--cwd", "--raw", "--ws", "--output", "-o", "--pick", "-p"]);
    const positional = (argv as string[]).filter((a) => !BASE_FLAGS.has(a) && !a.startsWith("--"));
    for (let i = 0; i < positional.length; i += 2) {
      const key = positional[i];
      if (key && positional[i + 1] !== undefined) patches[key] = positional[i + 1];
    }
    state.cmdStatePatch(cwd, patches, raw);
  }
}

export class StateAdvancePlanCommand extends BaseCommand {
  static override description = "Advance to next plan";
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags } = await this.parse(StateAdvancePlanCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateAdvancePlan(cwd, raw);
  }
}

export class StateLoadCommand extends BaseCommand {
  static override description = "Load and display state";
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags } = await this.parse(StateLoadCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateLoad(cwd, raw);
  }
}

export class StateUpdateProgressCommand extends BaseCommand {
  static override description = "Update progress counters";
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags } = await this.parse(StateUpdateProgressCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateUpdateProgress(cwd, raw);
  }
}

export class StateReconcileCommand extends BaseCommand {
  static override description = "Reconcile STATE.md with disk truth";
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags } = await this.parse(StateReconcileCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateReconcile(cwd, raw);
  }
}

export class StateRecordSessionCommand extends BaseCommand {
  static override description = "Update last session timestamp and stopped-at note";
  static override args = { stopped_at: Args.string({ required: false }) };
  static override flags = {
    ...BaseCommand.baseFlags,
    "resume-file": Flags.string({ description: "Path to resume file" }),
  };

  async run() {
    const { flags, args } = await this.parse(StateRecordSessionCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateRecordSession(
      cwd,
      { stopped_at: args.stopped_at ?? null, resume_file: flags["resume-file"] ?? null },
      raw,
    );
  }
}

export class StateRecordMetricCommand extends BaseCommand {
  static override description = "Append a performance metric row to STATE.md";
  static override flags = {
    ...BaseCommand.baseFlags,
    phase: Flags.string({ required: true }),
    plan: Flags.string({ required: true }),
    duration: Flags.string({ required: true }),
    tasks: Flags.string({ required: false }),
    files: Flags.string({ required: false }),
  };

  async run() {
    const { flags } = await this.parse(StateRecordMetricCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateRecordMetric(
      cwd,
      { phase: flags.phase, plan: flags.plan, duration: flags.duration, tasks: flags.tasks ?? null, files: flags.files ?? null },
      raw,
    );
  }
}

export class StateAddDecisionCommand extends BaseCommand {
  static override description = "Append a decision to STATE.md Decisions section";
  static override flags = {
    ...BaseCommand.baseFlags,
    phase: Flags.string({ required: false }),
    summary: Flags.string({ required: false }),
    "summary-file": Flags.string({ required: false }),
    rationale: Flags.string({ required: false }),
    "rationale-file": Flags.string({ required: false }),
  };

  async run() {
    const { flags } = await this.parse(StateAddDecisionCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateAddDecision(
      cwd,
      {
        phase: flags.phase ?? null,
        summary: flags.summary ?? null,
        summary_file: flags["summary-file"] ?? null,
        rationale: flags.rationale ?? null,
        rationale_file: flags["rationale-file"] ?? null,
      },
      raw,
    );
  }
}

export class StateAddBlockerCommand extends BaseCommand {
  static override description = "Append a blocker to STATE.md Blockers section";
  static override args = { text: Args.string({ required: false }) };
  static override flags = {
    ...BaseCommand.baseFlags,
    "text-file": Flags.string({ description: "Read blocker text from file" }),
  };

  async run() {
    const { flags, args } = await this.parse(StateAddBlockerCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateAddBlocker(
      cwd,
      { text: args.text ?? null, text_file: flags["text-file"] ?? null },
      raw,
    );
  }
}

export class StateBeginPhaseCommand extends BaseCommand {
  static override description = "Initialize STATE.md for a new phase";
  static override flags = {
    ...BaseCommand.baseFlags,
    phase: Flags.string({ required: true }),
    name: Flags.string({ required: false }),
    plans: Flags.integer({ required: false }),
  };

  async run() {
    const { flags } = await this.parse(StateBeginPhaseCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdStateBeginPhase(
      cwd,
      flags.phase,
      flags.name ?? null,
      flags.plans ?? null,
      raw,
    );
  }
}

export class StateNoteCommand extends BaseCommand {
  static override description = "Append a note to STATE.md Roadmap Evolution section";
  static override args = { text: Args.string({ required: false }) };
  static override flags = {
    ...BaseCommand.baseFlags,
    "text-file": Flags.string({ description: "Read note text from file" }),
  };

  async run() {
    const { flags, args } = await this.parse(StateNoteCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    const fs = await import("fs");
    let text = args.text;
    if (!text && flags["text-file"]) {
      try { text = fs.default.readFileSync(flags["text-file"], "utf-8").trim(); }
      catch (e) { throw new Error(`Cannot read text-file: ${(e as Error).message}`); }
    }
    state.cmdStateNote(cwd, text, raw);
  }
}

export class StateResolveBlockerCommand extends BaseCommand {
  static override description = "Mark a blocker as resolved in STATE.md";
  static override args = { text: Args.string({ required: false }) };
  static override flags = {
    ...BaseCommand.baseFlags,
    "text-file": Flags.string({ description: "Read blocker text from file" }),
  };

  async run() {
    const { flags, args } = await this.parse(StateResolveBlockerCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    const fs = await import("fs");
    let text = args.text ?? null;
    if (!text && flags["text-file"]) {
      try { text = fs.default.readFileSync(flags["text-file"], "utf-8").trim(); }
      catch (e) { throw new Error(`Cannot read text-file: ${(e as Error).message}`); }
    }
    state.cmdStateResolveBlocker(cwd, text, raw);
  }
}

export class StateSignalWaitingCommand extends BaseCommand {
  static override description = "Write WAITING.json to signal agent is blocked";
  static override flags = {
    ...BaseCommand.baseFlags,
    type: Flags.string({ description: "Wait type (e.g. decision_point)" }),
    question: Flags.string({ description: "Question to present" }),
    options: Flags.string({ description: "Options JSON string" }),
    phase: Flags.string({ description: "Current phase" }),
  };

  async run() {
    const { flags } = await this.parse(StateSignalWaitingCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    let options = flags.options ?? null;
    if (options) {
      try { JSON.parse(options); }
      catch { throw new Error("--options must be valid JSON"); }
    }
    state.cmdSignalWaiting(cwd, flags.type ?? null, flags.question ?? null, options, flags.phase ?? null, raw);
  }
}

export class StateSignalResumeCommand extends BaseCommand {
  static override description = "Remove WAITING.json to signal agent can resume";
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags } = await this.parse(StateSignalResumeCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const state = await import("../lib/state.js");
    state.cmdSignalResume(cwd, raw);
  }
}
