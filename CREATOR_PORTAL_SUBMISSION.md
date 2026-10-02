# n8n Creator Portal submission

Use these values for the Resultary community-node verification submission.

## Package

- **npm package:** `n8n-nodes-resultary`
- **Version:** `0.1.1`
- **GitHub repository:** `https://github.com/PharmedAI/n8n-nodes-resultary`
- **Product website:** `https://getresultary.com/n8n/`
- **Support:** `https://getresultary.com/support/`
- **Privacy:** `https://getresultary.com/privacy/`
- **License:** MIT

## Short description

Resultary reports n8n workflow executions to Resultary and lets users read independently verified outcome status, so automation monitoring is based on the business result rather than execution status alone.

## Authentication

Resultary uses OAuth 2.0 Authorization Code with PKCE S256. Users create a Resultary credential in n8n and click **Connect my account**. They do not enter an API key, client ID, client secret or API hostname.

## Operations

- **Report Run** — reports the current trusted n8n execution ID and workflow ID.
- **Get Result** — reads the independently verified Resultary status for a previously returned run ID.
- **Check Connection** — verifies that the Resultary OAuth credential is authorized.

## Verification notes

- Published through GitHub Actions with npm provenance.
- npm Trusted Publishing (OIDC) is configured.
- No runtime dependencies.
- No environment-variable or file-system access.
- API origin is fixed to `https://api.getresultary.com`.
- Redirect credential forwarding is disabled.
- The official `@n8n/scan-community-package` check passes.
