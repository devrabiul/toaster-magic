# How to Release `toaster-magic` on npm

A step-by-step guide for publishing the standalone JavaScript package to the npm registry.
All commands run from the package root (the repository root) unless noted otherwise.

> Looking for the full publishing reference? See [`docs/publish.md`](docs/publish.md).

---

## 1. One-time setup

### Create / log in to your npm account

If you don't have one, sign up at [npmjs.com/signup](https://www.npmjs.com/signup).
Enable **two-factor authentication** in your npm account settings (npm requires an OTP for publishing when 2FA is on — recommended).

```bash
npm login
# → opens a browser to authenticate

npm whoami
# → should print your npm username
```

### Confirm the package name is still free

```bash
npm view toaster-magic
# "npm error 404" means the name is still available — good.
# If someone claimed it, change "name" in package.json (e.g. @devrabiul/toaster-magic).
```

> **Scoped alternative:** publishing under your own scope (`@devrabiul/toaster-magic`) can never
> collide with anyone. Scoped packages need `npm publish --access public` on the first publish.

---

## 2. Pre-release checklist

```bash
# Fresh install and full verification
npm ci            # or: npm install
npm run build     # builds dist/ (ESM + CJS + CDN build + d.ts + CSS)
npm test          # 12 vitest tests must pass
```

Then double-check what would actually be shipped:

```bash
npm pack --dry-run
```

Expected contents (13 files, ~35 kB tarball): `dist/index.js`, `dist/index.cjs`,
`dist/index.d.ts`, `dist/index.d.cts`, `dist/toaster-magic.global.js`,
`dist/toaster-magic.css`, `dist/toaster-magic.min.css`, source maps,
`package.json`, `README.md`, `LICENSE`.

Optional but worthwhile — smoke-test the tarball in a scratch project:

```bash
npm pack                              # creates toaster-magic-<version>.tgz in this directory
TARBALL="$PWD/$(ls toaster-magic-*.tgz | tail -1)"

mkdir -p /tmp/tm-smoke && cd /tmp/tm-smoke
npm init -y
npm install "$TARBALL"
node -e "const { toastMagic } = require('toaster-magic'); console.log('CJS OK', typeof toastMagic.success)"
node --input-type=module -e "import { toastMagic } from 'toaster-magic'; console.log('ESM OK', typeof toastMagic.success)"

cd - && rm -rf /tmp/tm-smoke           # clean up when done
```

> The `TARBALL=...` line must run in the same terminal session **before** you `cd` away,
> so the install step gets the real absolute path to the `.tgz` file.

Also open `demo.html` in a browser once and click through the playground —
it runs against the same `dist/` you are about to publish.

---

## 3. Set the version

For the very first release, `package.json` is already at `1.0.0` — nothing to do.

For later releases, never edit the version by hand; let npm bump it and create the git tag:

```bash
npm version patch   # 1.0.0 → 1.0.1  (bug fixes)
npm version minor   # 1.0.0 → 1.1.0  (new features, backwards compatible)
npm version major   # 1.0.0 → 2.0.0  (breaking changes)
```

Follow [semver](https://semver.org/): if consumers must change their code, it's a major.

> Tip: the stylesheet lives in `src/styles/toaster-magic.css` (this package is standalone).
> If you edit it, a rebuild copies it into `dist/` automatically — a CSS-only change is
> usually a `patch` or `minor` release for the npm package.

---

## 4. Publish

```bash
npm publish
# scoped name instead? → npm publish --access public
```

`prepublishOnly` runs `npm run build && npm test` automatically, so a stale or broken
`dist/` can never be published. If you have 2FA enabled, npm will prompt for your OTP code.

### Verify the release

```bash
npm view toaster-magic version        # shows the published version
```

- Install it somewhere real: `npm install toaster-magic`
- Check the CDN (may take a few minutes to warm up):
  - https://unpkg.com/toaster-magic/dist/toaster-magic.global.js
  - https://cdn.jsdelivr.net/npm/toaster-magic/dist/toaster-magic.min.css
- Check the package page: https://www.npmjs.com/package/toaster-magic

---

## 5. Git housekeeping (after publishing)

The package lives on the `feature/npm-package` branch. To make the release official in the repo:

```bash
# From the repo root
git push -u origin feature/npm-package
# → open a PR into main and merge it

# Tag the release so the npm version maps to a commit
git tag toaster-magic-v1.0.0
git push origin toaster-magic-v1.0.0
```

Then create a GitHub Release from the tag (Releases → "Draft a new release") and paste the
highlights: framework support, SSR safety, HTML escaping, CDN build, etc.

> The tag is prefixed (`toaster-magic-v1.0.0`, not `v1.0.0`) because this repo also
> versions the Laravel package — plain `v2.3.0`-style tags stay reserved for it.

---

## 6. Releasing updates (the short version)

```bash
# from the package (repository) root
# 1. make and commit your changes
npm test                      # sanity check
npm version patch             # or minor / major — bumps + commits + tags
npm publish                   # prepublishOnly rebuilds and re-tests
git push && git push --tags
```

---

## 7. Optional: automate with GitHub Actions

Create an **Automation** access token on npmjs.com (Profile → Access Tokens → Generate New Token
→ *Automation*; it bypasses the OTP prompt in CI), add it to the GitHub repo as the
`NPM_TOKEN` secret, then add `.github/workflows/npm-publish.yml`:

```yaml
name: Publish toaster-magic
on:
  push:
    tags: ["toaster-magic-v*"]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write        # enables npm provenance
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          registry-url: https://registry.npmjs.org
      - run: npm ci
      - run: npm publish --provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

After that, releasing is just: bump the version, push the `toaster-magic-v*` tag, and CI
publishes with [provenance attestation](https://docs.npmjs.com/generating-provenance-statements)
(the green "Built and signed on GitHub Actions" badge on npm).

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `402 Payment Required` on publish | You used a scoped name without `--access public`. |
| `403 Forbidden` / name taken | Someone claimed the name; switch to `@devrabiul/toaster-magic`. |
| `EOTP` error | 2FA is on — re-run and enter the one-time password, or use an Automation token in CI. |
| `You must verify your email` | Verify the address on npmjs.com, then publish again. |
| Published but `dist/` missing | Can't happen via `npm publish` (`prepublishOnly` rebuilds), but if it somehow does: `npm unpublish toaster-magic@x.y.z` within 72 h, fix, and publish a new patch version. Never reuse a version number. |
| Wrong files in the tarball | Adjust the `files` field in `package.json`, verify with `npm pack --dry-run`. |

---

## Release checklist (copy/paste)

```text
[ ] npm whoami works
[ ] npm ci && npm run build && npm test all green
[ ] npm pack --dry-run shows exactly the 13 expected files
[ ] demo.html clicked through in a browser
[ ] version bumped (npm version patch|minor|major) — first release: already 1.0.0
[ ] npm publish (with OTP)
[ ] npm view toaster-magic version shows the new version
[ ] unpkg/jsdelivr URLs resolve
[ ] branch pushed, PR merged, toaster-magic-v* tag pushed
[ ] GitHub Release drafted
```
