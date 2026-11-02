# Publishing

This package is distributed through GitHub Releases. npm is optional and is not
required for the DSH marketplace.

## 1. Repository

The repository is `https://github.com/Doran1110/doran-design`.
It must stay public and carry the `dsh-plugin` topic. The registry requires the
repository to be at least one day old before a submission passes CI.

## 2. Build and release

```bash
npm pack
gh release create v0.1.0 ./doran-design-0.1.0.tgz \
  --title "v0.1.0" \
  --notes "First release."
```

The asset name must stay version-free when the registry entry uses
`latest/download/`; this entry pins `v0.1.0`, so the versioned filename is fine.

## 3. Verify a clean install

```bash
dsh --profile plugin-check --from-default-profile web --dump-config
dsh plugin --profile plugin-check add \
  https://github.com/Doran1110/doran-design/releases/download/v0.1.0/doran-design-0.1.0.tgz
dsh --profile plugin-check --dump-config | grep -A2 doran-design
```

Remove the throwaway profile afterwards.

## 4. Submit to the registry

Fork `awesome-dsh-plugin/awesome-dsh-plugin` and add exactly one file:

```text
data/plugins/Doran1110__doran-design.yml
```

Its contents are in `submission-entry.yml`. Do not edit the generated READMEs.

## 5. What CI checks

- At most 3 entries per PR.
- `dsh.bundle` exists in `package.json` (not just `dsh.client`).
- The repository is at least one day old.
- `awesome-lint` and the generated READMEs match the data files.

A maintainer then reads the repository and checks that the description is
accurate. Keep the description factual; no superlatives.

## Optional: npm

If the package is ever published to npm, run `npm publish --access public` and
keep the registry entry's `tarball:` field or replace it with the npm source.
The current release does not depend on npm.
