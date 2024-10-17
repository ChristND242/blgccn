# Environment variable list

## Front-end environment variable list

| Name | Required | Description | Default value | Example value |
|-------------|------|------------------------------|-------|--------------------------------------------------|
| API_URL | Yes | Backend address | None | http://localhost:3001 |
| AVATAR | Yes | Avatar address in the upper left corner of the website | None | https://avatars.githubusercontent.com/u/36541432 |
| NAME | Yes | Website name & title in the upper left corner | None | Xeu |
| DESCRIPTION | No | Website description in the upper left corner | None | Omnivore |
| PAGE_SIZE | No | Default paging limit | 5 | 5 |
| RSS_ENABLE | No | Whether to enable RSS (if enabled, the RSS link will be displayed at the bottom of the site) | false | true |

**List of deployment environment variables**

> [!CAUTION]
> The following environment variables are required for deployment to Cloudflare Pages and cannot be modified)

| Name | Value | Description |
|-------------------------|------------------------------------------------------------|----------------------|
| SKIP_DEPENDENCY_INSTALL | true | Skip the default npm install command |
| UNSTABLE_PRE_BUILD | asdf install bun latest && asdf global bun latest && bun i | Install and use Bun for dependency installation |

## Backend environment variable list

**Plain text environment variables**

> [!NOTE]
> The following variables can remain unencrypted in Cloudflare Workers

| Name | Required | Description | Default value | Example value |
|-----------------|------|-----------------------------------------|-------------|-----------------------------------------------------------------|
| FRONTEND_URL | Temporarily required | Required to include the comment article link when comment notification webhook, can be left blank | None | https://xeu.life |
| S3_FOLDER | Yes | File path where resources are stored when uploading and saving images | None | images/ |
| S3_BUCKET | Yes | S3 bucket name | None | images |
| S3_REGION | Yes | Region where the S3 bucket is located, if using Cloudflare R2, fill in auto | None | auto |
| S3_ENDPOINT | Yes | S3 bucket access point address | None | https://1234567890abcdef1234567890abcd.r2.cloudflarestorage.com |
| WEBHOOK_URL | No | Webhook notification destination address when adding a comment | None | https://webhook.example.com/webhook |
| S3_ACCESS_HOST | No | S3 bucket access address | S3_ENDPOINT | https://image.xeu.life |
| S3_CACHE_FOLDER | No | S3 cache folder (for SEO, high-frequency request cache) | cache/ | cache/ |

**Encrypt environment variables, all of the following are required (except Webhook)**

> [!NOTE]
> All plaintext variables not in `wrangler.toml` will be cleared during deployment. \
> The following environment variables must be encrypted after debugging in Cloudflare Workers, otherwise they will be cleared

| Name | Description | Example Value |
|--------------------------|-------------------------------------------------------------|------------------------------------------------------------------|
| RIN_GITHUB_CLIENT_ID | Github OAuth client ID | Ux66poMrKi1k11M1Q1b2 |
| RIN_GITHUB_CLIENT_SECRET | Github OAuth client secret | 1234567890abcdef1234567890abcdef12345678 |
| JWT_SECRET | The key required for JWT authentication, which can be any password in the regular format | J0sT%Ch@nge#Me1 |
| S3_ACCESS_KEY_ID | The KEY ID required for S3 bucket access, when using Cloudflare R2, it is an API token with R2 edit permissions ID | 1234567890abcdef1234567890abcd |
| S3_SECRET_ACCESS_KEY | Secret required for S3 bucket access, or an API token with R2 edit permissions when using Cloudflare R2 | 1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef |