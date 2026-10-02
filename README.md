# Resultary for n8n

Resultary is an n8n community node for reporting workflow runs to Resultary and reading independently verified outcome status.

## Quick start

1. Add the **Resultary** node to an n8n workflow.
2. Create a **Resultary OAuth2 API** credential.
3. Click **Connect my account**.
4. If you do not yet have an active Resultary trial or subscription, complete the Resultary checkout.
5. Return to n8n. The credential is connected automatically.
6. Use **Report Run** when the workflow execution should be recorded by Resultary.
7. Use the returned `runId` with **Get Result** to read the independently verified outcome.

No Resultary API key, client ID, client secret, or custom API hostname is entered by the user.

For n8n Cloud, Resultary uses the standard callback:

`https://oauth.n8n.cloud/oauth2/callback`

## Example workflow

A typical workflow can end with a **Resultary → Report Run** node after the business action you want to monitor.

Example:

`Trigger → CRM/ERP/API action → Resultary: Report Run`

Resultary returns a `runId`. A later workflow can use:

`Resultary: Get Result → route or notify based on the verified status`

**Report Run does not claim that the downstream business result succeeded.** It only reports that the n8n execution ran. Resultary evaluates outcome evidence independently on the Resultary service.

## Operations

- **Report Run** — reports the current n8n execution ID and workflow ID from trusted n8n runtime context.
- **Get Result** — reads the independently checked Resultary status for a previously returned `runId`.
- **Check Connection** — verifies that the connected Resultary integration is authorized.

The connector is pinned to `https://api.getresultary.com`. Independent proof-provider credentials stay server-side in Resultary and are never distributed to n8n.

## Authentication

Resultary uses OAuth 2.0 Authorization Code with PKCE S256.

- Authorization codes are short-lived and single-use.
- Access tokens are stored by n8n's credential manager.
- No Resultary access token is placed in workflow JSON or in a URL.
- The node blocks bearer-token forwarding across redirects.

## Security behavior

- The package has no runtime dependencies.
- It does not read environment variables or the local file system.
- **Report Run** is blocked when the node executes as an AI Agent tool.
- Execution ID and workflow ID come from n8n runtime context rather than editable node parameters.

## Development

Requires Node.js 22.14 or newer.

```sh
npm install --ignore-scripts
npm run build
npm run lint
npm run test:runtime
npm pack --dry-run --ignore-scripts
```

For the exact published package, use n8n's official verification scanner:

```sh
npx @n8n/scan-community-package n8n-nodes-resultary
```

## Links

- Product: https://getresultary.com
- n8n setup: https://getresultary.com/n8n/
- Support: https://getresultary.com/support/
- Privacy: https://getresultary.com/privacy/
- Source: https://github.com/PharmedAI/n8n-nodes-resultary

## License

MIT.
