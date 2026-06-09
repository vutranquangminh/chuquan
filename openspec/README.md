# OpenSpec

Spec-driven development artifacts, managed with
[OpenSpec](https://github.com/Fission-AI/OpenSpec) (same as `opilot-pm`).

OpenSpec is **not** a project dependency — run it on demand:

```bash
# one-off, no install
npx --yes @fission-ai/openspec          # or: yarn spec

# regenerate AI tool instructions (AGENTS.md / CLAUDE.md) after changing config
npx --yes @fission-ai/openspec update
```

## Layout

```
openspec/
  config.yaml      OpenSpec config (schema + shared context)
  project.md       Tech stack + conventions shown to AI when authoring specs
  specs/           Current capability specs — the source of truth
    <capability>/spec.md
  changes/         In-flight change proposals
    <change-id>/
      proposal.md  Why + what changes + impact
      design.md    Technical design (optional)
      tasks.md     Implementation checklist
      specs/       Spec deltas this change introduces
```

## Workflow

1. Create a change folder under `changes/` with a `proposal.md`.
2. Break work into `tasks.md`; capture spec deltas under the change's `specs/`.
3. Once shipped, fold the deltas into the canonical `specs/` and archive the
   change.
