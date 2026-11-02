# Publishing

This package is ready to publish as a DSH plugin. It is not on npm yet.

## 1. Create the repository

Create `https://github.com/Doran1110/dsh-skill-creative-web-design`, push this
directory, and add the `dsh-plugin` topic. The registry requires the repository
to be at least one day old before a submission can pass CI.

## 2. Publish to npm

```bash
npm login
npm publish --access public
```

The unscoped name `dsh-skill-creative-web-design` was free when this package was
prepared. If it is taken by the time you publish, rename the package and update
`cordis.patch.yml` plus the registry entry to match.

## 3. Verify a clean install

Use a throwaway profile so your daily profile is untouched:

```bash
dsh --profile plugin-check --from-default-profile web --dump-config
dsh plugin --profile plugin-check add dsh-skill-creative-web-design@0.1.0
dsh --profile plugin-check --dump-config | grep -A2 skill-creative-web-design
```

A real boot is the final check: start the profile, then confirm the skill
`creative-web-design-kit` appears in the session catalog and the
`creative-web-design-rules` section reaches the model.

Remove the throwaway profile afterwards.

## 4. Submit to the registry

Fork `awesome-dsh-plugin/awesome-dsh-plugin` and add exactly one file:

```text
data/plugins/Doran1110__dsh-skill-creative-web-design.yml
```

Its contents are in `submission-entry.yml`. Do not edit the generated READMEs.
Open one PR with that single file.

## 5. What CI checks

- At most 3 entries per PR.
- `dsh.bundle` exists in `package.json` (not just `dsh.client`).
- The repository is at least one day old.
- `awesome-lint` and the generated READMEs match the data files.

A maintainer then reads the repository and checks that the description is
accurate. Keep the description factual; no superlatives.

## 6. If you do not publish to npm

Attach a prebuilt `.tgz` to a GitHub Release and add a `tarball:` field to the
registry entry:

```yaml
tarball: https://github.com/Doran1110/dsh-skill-creative-web-design/releases/latest/download/dsh-skill-creative-web-design.tgz
```

The asset name must stay version-free when using `latest/download/`, otherwise
the link breaks on the next release.
