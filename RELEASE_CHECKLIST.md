# Resultary n8n verification checklist

This repository is the public source for `n8n-nodes-resultary`.

## Package status

- [x] Package name is `n8n-nodes-resultary`
- [x] Package is public on npm
- [x] Latest release is `0.1.1`
- [x] Published from GitHub Actions with npm provenance
- [x] npm Trusted Publisher is configured for `PharmedAI/n8n-nodes-resultary` and `publish.yml`
- [x] No runtime dependencies
- [x] MIT license
- [x] Public GitHub repository matches npm metadata
- [x] Package includes `n8n-community-node-package` keyword
- [x] n8n node and credential entries are declared in `package.json`
- [x] TypeScript build passes
- [x] n8n lint passes
- [x] Runtime tests pass
- [x] Published package passes `@n8n/scan-community-package`

## Security

- [x] OAuth 2.0 Authorization Code with PKCE S256
- [x] No API key copy/paste in the native node
- [x] Fixed Resultary API hostname
- [x] Bearer credentials are not forwarded across redirects
- [x] No environment-variable access
- [x] No file-system access
- [x] No production dependencies
- [x] `Report Run` uses trusted n8n execution/workflow IDs
- [x] `Report Run` is blocked during AI-tool execution

## Documentation

- [x] README explains setup and OAuth authentication
- [x] README includes example workflow patterns
- [x] README documents operations
- [x] README documents security boundaries
- [x] Support, privacy and product links are public
- [x] Documentation and node UI are English-only

## Distribution

- [x] `0.1.1` published through GitHub Actions
- [x] Provenance signed by GitHub Actions
- [x] Automatic OIDC-only publication is configured for future version bumps
- [ ] Submit `n8n-nodes-resultary` in the n8n Creator Portal
- [ ] n8n verification approved
- [ ] Switch Resultary Cloud onboarding from temporary workflow import to native **Connect Resultary** path
