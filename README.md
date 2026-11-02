# dsh-skill-creative-web-design

A DSH skill pack for web and product UI design. It registers one agent skill and one short system-prompt section that makes the three-layer design rules apply to every web task.

## What it adds

- Skill `creative-web-design-kit`: a full playbook covering
  - shadcn/ui as the structure layer
  - Canvas UI as the effect layer
  - ThreeUI / three.js as the 3D layer
  - the 80 / 15 / 5 visual-area split
  - component selection, performance budgets, fallbacks and a 13-point acceptance checklist
- System-prompt section `creative-web-design-rules`: six hard rules that always apply, including the one-GPU-effect-per-viewport rule and the mobile/reduced-motion fallback requirement.

The plugin does not write `AGENTS.md`. The hard rules are contributed through `ctx.systemPrompt.section`, so installing the plugin is enough.

## Install

```bash
dsh plugin --profile web add dsh-skill-creative-web-design
```

Then add the package to the profile's `dsh.profile.bundles` list if your DSH version does not reconcile bundles automatically:

```json
{
  "dsh": {
    "profile": {
      "bundles": ["dsh-skill-creative-web-design"]
    }
  }
}
```

Restart the profile after installing.

## Use

Ask the agent for a landing page, dashboard, portfolio or any Canvas/WebGL/Three.js interface. The skill is model-invocable under the name `creative-web-design-kit`; you can also invoke it explicitly with `/skill creative-web-design-kit` where the client supports skill invocation.

## Notes

- The registered skill name is `creative-web-design-kit`, deliberately different from the local `creative-web-design` skill so that installing the package does not shadow a user's own copy.
- Runtime skills are registered at rank 250. If another provider exposes the same name, the nearest layer wins.
- The package ships no browser UI; `dsh.client` is intentionally absent.
- Requires DSH 0.1.0-rc.1 or newer.

## License

MIT
