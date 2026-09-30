# Resultary for n8n

Resultary is an n8n community-node connector for reporting workflow runs to Resultary and reading independently verified outcome status.

> **Pre-release repository.** The connector source is public, but the production customer API at `https://api.getresultary.com` is not live yet. Do not install this package for production use and do not treat a reported n8n run as proof of a downstream business result.

## Operations

- **Report Run** — reports the current n8n execution/workflow IDs from trusted runtime context. This is a transport signal only, not proof of business success.
- **Get Result** — reads the independently checked status for a previously returned Resultary run ID.
- **Check Connection** — validates the scoped Resultary integration key.

The connector never accepts a user-controlled API hostname. It is pinned to `https://api.getresultary.com`, blocks redirects, and does not expose the independent destination-read credential to n8n.

## Development

Requires Node.js 22.14 or newer.

```sh
npm ci --ignore-scripts
npm run build
npm run lint
npm run test:runtime
```

## Security

Do not commit API keys, invitation tokens, destination credentials, customer data, or private Resultary backend configuration to this repository.

AI Agent/tool execution is read-only for Resultary: **Report Run** is blocked when the node executes as an AI tool.

## Status

Version `0.1.0` is prepared as a public-source pre-release. npm publication should occur only after the hardened customer API is live and end-to-end production checks pass.

## License

MIT.
