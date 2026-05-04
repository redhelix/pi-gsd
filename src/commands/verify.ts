import { Args, Flags } from "@oclif/core";
import { BaseCommand } from "./base.js";

export class ValidateConsistencyCommand extends BaseCommand {
  static override description = "Validate planning consistency";
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags } = await this.parse(ValidateConsistencyCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const v = await import("../lib/verify.js");
    v.cmdValidateConsistency(cwd, raw);
  }
}

export class ValidateHealthCommand extends BaseCommand {
  static override description = "Check .planning/ health";
  static override flags = {
    ...BaseCommand.baseFlags,
    repair: Flags.boolean({ description: "Auto-repair issues", default: false }),
  };

  async run() {
    const { flags } = await this.parse(ValidateHealthCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const v = await import("../lib/verify.js");
    v.cmdValidateHealth(cwd, { repair: flags.repair }, raw);
  }
}

export class ValidateAgentsCommand extends BaseCommand {
  static override description = "Validate agent configurations";
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags } = await this.parse(ValidateAgentsCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const v = await import("../lib/verify.js");
    v.cmdValidateAgents(cwd, raw);
  }
}

export class VerifyCommand extends BaseCommand {
  static override description = "Run UAT verification";
  static override args = { phase: Args.string({ required: false }) };
  static override flags = {
    ...BaseCommand.baseFlags,
    plan: Flags.string({ description: "Plan to verify" }),
  };

  async run() {
    const { flags, args } = await this.parse(VerifyCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const v = await import("../lib/verify.js");
    if (args.phase) {
      v.cmdVerifyPhaseCompleteness(cwd, args.phase, raw);
    } else {
      v.cmdValidateConsistency(cwd, raw);
    }
  }
}

export class AuditUatCommand extends BaseCommand {
  static override description = "Audit UAT results";
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags } = await this.parse(AuditUatCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const { cmdAuditUat } = await import("../lib/uat.js");
    cmdAuditUat(cwd, raw);
  }
}

export class VerifyArtifactsCommand extends BaseCommand {
  static override description = "Verify plan artifacts exist on disk";
  static override args = { plan: Args.string({ required: true }) };
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags, args } = await this.parse(VerifyArtifactsCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const v = await import("../lib/verify.js");
    v.cmdVerifyArtifacts(cwd, args.plan, raw);
  }
}

export class VerifyKeyLinksCommand extends BaseCommand {
  static override description = "Verify key links in a plan file are reachable";
  static override args = { plan: Args.string({ required: true }) };
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags, args } = await this.parse(VerifyKeyLinksCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const v = await import("../lib/verify.js");
    v.cmdVerifyKeyLinks(cwd, args.plan, raw);
  }
}

export class VerifyPhaseCompletenessCommand extends BaseCommand {
  static override description = "Verify all plans in a phase have summaries";
  static override args = { phase: Args.string({ required: true }) };
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags, args } = await this.parse(VerifyPhaseCompletenessCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const v = await import("../lib/verify.js");
    v.cmdVerifyPhaseCompleteness(cwd, args.phase, raw);
  }
}

export class VerifyReferencesCommand extends BaseCommand {
  static override description = "Verify @file references in a file exist";
  static override args = { file: Args.string({ required: true }) };
  static override flags = { ...BaseCommand.baseFlags };

  async run() {
    const { flags, args } = await this.parse(VerifyReferencesCommand);
    const { cwd, raw } = this.resolveContext(flags);
    const v = await import("../lib/verify.js");
    v.cmdVerifyReferences(cwd, args.file, raw);
  }
}
