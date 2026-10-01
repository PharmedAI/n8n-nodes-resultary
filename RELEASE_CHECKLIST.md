# Resultary n8n release checklist

This checklist is the final gate before publishing `n8n-nodes-resultary` to npm and submitting it for n8n community-node verification.

## Connector package

- [ ] `npm ci --ignore-scripts`
- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] `npm run test:runtime`
- [ ] `npm pack --dry-run --ignore-scripts`
- [ ] Package name remains `n8n-nodes-resultary`
- [ ] Package contains only `dist` plus npm metadata
- [ ] No API keys, invitation tokens, destination credentials or customer data in the package
- [ ] Node remains pinned to `https://api.getresultary.com`
- [ ] Redirects remain disabled
- [ ] Credential is stored through n8n credentials, not workflow JSON
- [ ] `Report Run` remains blocked during AI-tool execution

## Hosted Resultary backend

- [ ] `https://api.getresultary.com/healthz` is healthy
- [ ] Approved private integration can pass **Check Connection**
- [ ] Revoked integration key is rejected
- [ ] Fresh n8n run is accepted and isolated to its integration
- [ ] Independent proof can produce **Healthy**
- [ ] Missing independent proof can produce **Incident**
- [ ] Restored independent proof can produce **Recovery**
- [ ] Dashboard shows only the authenticated integration's data
- [ ] Logs contain no secrets or customer payloads
- [ ] Database runtime role is least-privilege
- [ ] Backup/restore and operational alerting have been reviewed

## Customer launch gate

- [ ] Final onboarding path is live
- [ ] Support path is live
- [ ] Privacy notice matches collected data
- [ ] Public claims match actual monitoring/availability
- [ ] Billing/entitlement is enabled before any paid production promise
- [ ] Public production terms are ready

## Publication

- [ ] Publish `0.1.0` to npm
- [ ] Install published package in a fresh disposable n8n instance
- [ ] Run one fresh end-to-end smoke test against the published package
- [ ] Submit package for n8n community-node verification
- [ ] Update getresultary.com/n8n/ from private-beta wording only when the corresponding launch gate is complete
