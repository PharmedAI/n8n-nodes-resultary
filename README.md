# Resultary for n8n — private release candidate

**Not published yet.** This directory is the reviewed release candidate for the official Resultary n8n community node.

## Customer experience

The native node is designed to remove the API-key copy/paste step.

1. Add **Resultary** in n8n.
2. Create the **Resultary** credential.
3. Click **Connect my account**.
4. Resultary authorizes n8n with OAuth 2.0 Authorization Code + PKCE.
5. The credential is stored by n8n and the workflow can use Resultary immediately.

The OAuth client ID is fixed to `resultary-n8n`. The connector does not ask customers for a client ID, client secret, Resultary API key, hostname, or proof-provider credential.

For n8n Cloud the registered callback is:

`https://oauth.n8n.cloud/oauth2/callback`

## Operations

- **Report Run** — sends the current n8n execution ID and workflow ID from trusted n8n runtime context. It does not claim business success.
- **Get Result** — reads the independently verified Resultary status for a previously reported run.
- **Check Connection** — checks the authenticated Resultary integration.

Independent proof credentials remain server-side in Resultary and are never distributed in this package.

## OAuth security

- OAuth 2.0 Authorization Code with PKCE S256.
- Short-lived, single-use authorization codes.
- The browser-to-Resultary setup session is HttpOnly, Secure, SameSite=Lax and scoped to `/oauth`.
- Access tokens are returned only from the token endpoint and stored by n8n's credential manager.
- No Resultary access token is placed in URLs, workflow JSON, source code, cookies, localStorage or sessionStorage.
- The node sends authenticated requests only to `https://api.getresultary.com` and explicitly blocks cross-origin redirect credential forwarding.

## Development validation

```sh
cd integrations/n8n-nodes-resultary
npm install --ignore-scripts
npm run check
npm run build
npm run lint
npm run test:runtime
node --test tests/package.test.cjs tests/public-release-template.test.cjs
```

The monorepo copy remains deliberately non-publishable: `private: true`, version `0.0.0-private`, and no publish script. The reviewed public handoff lives under `release/` and must be exported into the dedicated public repository before npm publication.

## Publication

Before external distribution:

1. keep the backend OAuth endpoints live and tested;
2. validate the OAuth flow in a disposable n8n Cloud workspace;
3. export only the connector source using `release/build-public-source.cjs`;
4. push that export to the dedicated public `PharmedAI/n8n-nodes-resultary` repository;
5. run official n8n node build/lint checks;
6. publish with npm provenance / Trusted Publishing;
7. submit the package for n8n verified-community-node review.

The MIT license in this connector directory applies only to the distributable n8n client. It does not grant access to private Resultary SaaS backend code, hosting, databases, Paddle credentials or independent proof-provider credentials.
