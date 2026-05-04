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
    const rawArgv = (argv as string[]).filter((a) => !a.startsWith("--"));
    for (let i = 0; i < rawArgv.length; i += 2) {
      const key = rawArgv[i].replace(/^--/, "");
      if (key && rawArgv[i + 1] !== undefined) patches[key] = rawArgv[i + 1];
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
