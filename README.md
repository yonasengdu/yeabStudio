# Yeab Studio

Landing website for Yeab Studio.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This site is deployed to **Cloudflare Pages** via GitHub Actions.

- **Production**: Automatically deploys when pushing to `main`
- **PR Previews**: Each pull request gets a unique preview URL

### Setup (for new contributors)

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with "Cloudflare Pages: Edit" permission |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |
