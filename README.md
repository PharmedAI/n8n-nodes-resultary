# Resultary for n8n

Resultary is an n8n community-node connector for reporting workflow runs to Resultary and reading independently verified outcome status.

> **Private beta release candidate.** The connector source is public and the Resultary API is live at `https://api.getresultary.com` for approved private-beta integrations. Public self-service signup, paid production entitlements and 24/7 monitoring are not enabled yet. Do not use Resultary for business-critical production workflows until the public production launch is announced.

## Operations

- **Report Run** — reports the current n8n execution/workflow IDs from trusted runtime context. This is a transport signal only, not proof of business success.
- **Get Result** — reads the independently checked status for a previously returned Resultary run ID.
- **Check Connection** — validates the scoped Resultary integration key.

The connector never accepts a user-controlled API hostname. It is pinned to `https://api.getresultary.com`, blocks redirects, and does not expose the independent destination-read credential to n8n.

## Private beta

The current hosted backend supports approved private-beta integrations with scoped, revocable Resultary API keys. Access is intentionally controlled while final customer onboarding, continuous monitoring, entitlement/billing and production operations are completed.

Private-beta testers must use disposable test workflows and an approved Resultary invitation. A successful `Report Run` only proves that Resultary received the n8n execution signal; business success is determined separately by Resultary's independent proof layer.

## Development

Requires Node.js 22.14 or newer.

```sh
npm ci --ignore-scripts
npm run build
npm run lint
npm run test:runtime
npm pack --dry-run --ignore-scripts
```

## Security

Do not commit API keys, invitation tokens, destination credentials, customer data, or private Resultary backend configuration to this repository.

AI Agent/tool execution is read-only for Resultary: **Report Run** is blocked when the node executes as an AI tool.

## Publication status

Version `0.1.0` is the first public-package release candidate. Publish to npm only after the customer-facing backend release gate is complete and a fresh end-to-end check passes against `https://api.getresultary.com`.

After npm publication, submit the package for n8n community-node verification so eligible users can discover and install it through n8n's integration experience.

## Links

- Product: https://getresultary.com
- n8n: https://getresultary.com/n8n/
- Support: https://getresultary.com/support/
- Privacy: https://getresultary.com/privacy/

## License

MIT.
