# Resultary for n8n

Resultary is an n8n community node for reporting workflow runs and reading independently verified outcome status.

## Connect without copying an API key

The Resultary credential uses OAuth 2.0 Authorization Code with PKCE.

1. Add the **Resultary** node in n8n.
2. Create a **Resultary OAuth2 API** credential.
3. Click **Connect my account**.
4. Complete or confirm your Resultary trial if needed.
5. Return to n8n. The credential is connected automatically.

For n8n Cloud, Resultary uses the standard n8n callback:

`https://oauth.n8n.cloud/oauth2/callback`

You do not need to enter a Resultary API key, API hostname, client ID, or client secret.

## Operations

- **Report Run** — reports the current n8n execution/workflow IDs from trusted n8n runtime context. This is a transport signal, not proof of business success.
- **Get Result** — reads the independently checked Resultary status for a previously returned run ID.
- **Check Connection** — verifies that the connected Resultary account is authorized.

The connector is pinned to `https://api.getresultary.com`. Independent proof credentials stay server-side in Resultary and are never distributed to n8n.

## Security

- OAuth 2.0 Authorization Code with PKCE S256.
- Short-lived, single-use Resultary authorization codes.
- Access tokens are stored by n8n's credential manager.
- No Resultary access token is placed in workflow JSON or a URL.
- The node blocks bearer-token forwarding across redirects.
- **Report Run** is blocked when the node executes as an AI Agent tool.

## Development

Requires Node.js 22.14 or newer.

```sh
npm ci --ignore-scripts
npm run check --if-present
npm run build
npm run lint
npm run test:runtime
npm pack --dry-run --ignore-scripts
```

## Publication status

This repository is the public release candidate for `n8n-nodes-resultary`. The OAuth backend is live at `https://api.getresultary.com`; npm publication and n8n verified-community-node review are the remaining distribution gates.

## Links

- Product: https://getresultary.com
- n8n: https://getresultary.com/n8n/
- Support: https://getresultary.com/support/
- Privacy: https://getresultary.com/privacy/

## License

MIT.
