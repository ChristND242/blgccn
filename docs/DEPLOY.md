# Deployment

The project is currently in the development stage, and the documentation may not be updated in time or the description is unclear. If the deployment fails, please raise an [Issue](https://github.com/openRin/Rin/issues/new?assignees=&labels=help+wanted&projects=&template=need-help.md&title=%5BHelp%5D+%E9%97%AE%E9%A2%98%E6%8F%8F%E8%BF%B0)

> [!TIP]
> We have added a complete deployment process demonstration video at the end of the document to solve some of the difficulties you encounter during deployment
> [Click to go directly](#Operation video)

## Changelog

### v0.2.0 2024-06-07 Update

- Added `S3_CACHE_FOLDER` environment variable
- Updated the environment variable encryption list and variable list to keep only the environment variables that must be encrypted
- Encrypted variables can now be passed GitHub direct configuration
- GitHub variable configuration update, adding encrypted variables that must be configured through GitHub (S3 storage, for SEO index storage)
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` now have the prefix `RIN_` (`RIN_GITHUB_CLIENT_ID`,`RIN_GITHUB_CLIENT_SECRET`) to solve the problem that GitHub variables cannot start with `GITHUB_`. `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` configured using the Cloudflare panel are not affected

## Migration Guide

If there is no special instructions, normal version updates can be directly synchronized with the forked repository

### v0.2.0 Migration Guide

- Due to the introduction of SEO optimization, it is necessary to configure S3 storage environment variables in GitHub, so the following environment variables need to be configured in GitHub (plain text, added to Variables):

```ini
SEO_BASE_URL=<SEO base address, used for SEO indexing, default is FRONTEND_URL>
SEO_CONTAINS_KEY=<SEO indexing only indexes links starting with SEO_BASE_URL or containing the SEO_CONTAINS_KEY keyword, default is empty>
S3_FOLDER=<Folder where S3 image resources are stored, default is 'images/'>
S3_CACHE_FOLDER=<S3 cache folder (used for SEO, high-frequency request cache), default is 'cache/'>
S3_BUCKET=<S3 bucket name>
S3_REGION=<S3 bucket region, if using Cloudflare R2, fill in auto>
S3_ENDPOINT=<S3 bucket access point address>
S3_ACCESS_HOST=<S3 Bucket access address, no '/' at the end>
```

Also add the following encrypted environment variables (encrypted, added to Secrets):

```ini
S3_ACCESS_KEY_ID=<your S3AccessKeyID>
S3_SECRET_ACCESS_KEY=<your S3SecretAccessKey>
```

The above environment variables were configured through the Cloudflare panel in previous versions. Now they need to be migrated to GitHub for configuration. The new version of the deployment GitHub Action will automatically upload them to Cloudflare. After that, you no longer need to configure these environment variables in the Cloudflare panel

## Other documents

[Environment variable list](./ENV.md)

> [!TIP]
> If there is a content like <text> in the code block below, it means that you need to replace it with your own content according to the text prompt (do not keep `<` and `>`), such as:
>
> ```
> bun wrangler d1 create <database name>
> ```
>
> means to replace <database name> Replace with your favorite name, here use rin:
>
> ```
> bun wrangler d1 create rin
> ```
>
> This is the final command

Open the repository page: https://github.com/openRin/Rin

## Fork

Click the Fork button to fork a new repository
![1000000657](https://github.com/openRin/Rin/assets/36541432/df3607ca-a8a9-49b8-92ce-6b348afeb13f)

## Frontend

> [!TIP]
> Let's first briefly introduce the relationship between the frontend and the backend. The frontend is a static page hosted on Cloudflare Pages. The frontend is essentially just a bunch of files and codes that will not change, and there is no content such as your article data. If you want to implement logic such as logging in, writing articles, commenting, obtaining article lists and content, comment lists, etc., you also need to exchange data with the backend;
>
> The backend is responsible for handling specific logic. In this project, the backend runs on Cloudflare Workers. The frontend communicates with the backend through the API. The backend saves articles and other data through Cloudflare D1 and stores pictures in articles through Cloudflare R2.
>
> You can replace the frontend and backend mentioned below with Cloudflare Pages and Cloudflare Workers respectively. When it is mentioned that the frontend address or backend address is needed, it is the Cloudflare Pages address or Cloudflare Workers address. You can find these two addresses in the Cloudflare control panel with a few operations, as shown in the screenshot below:
> The address of the frontend (Pages) can be found in `Workers and Pages` > your Pages project > `Deployment`:
> ![图片](https://github.com/openRin/Rin/assets/36541432/d9dcc5f2-6930-4487-af4b-0ab52e948114)
> In the figure, `rin-6qe.pages.dev` and `direct.xeu.life` are both front-end addresses. If there are more addresses, you can click the link in the form of `+2 domains` to view more addresses. These addresses are all accessible. You can use any of them, but you need to keep the same front-end address filled in different places (if there are multiple environment variables that require the front-end address to be filled in). Generally speaking, the front-end address is in the form of `https://rin-6qe.pages.dev` or `https://direct.xeu.life`
>
> The address of the back-end (Workers) can be found in `Workers and Pages` > Your Workers Project > `Settings` > `Triggers`:
> ![Image](https://github.com/openRin/Rin/assets/36541432/0a2385b7-94db-4469-bef9-399cc334f1b6)
> In the figure, `rin.xeu.life` and `rin-server.xeu.workers.dev` are both backend addresses. The former is a custom domain name, and the latter is a default domain name. You can use the default domain name or a custom domain name. The custom domain name needs to be configured in the Cloudflare control panel. In this document, when you are asked to fill in the backend address, you can fill in an address like `https://rin.xeu.life` or `https://rin-server.xeu.workers.dev`, but you need to keep the same backend address in different places (if there are multiple environment variables that require the backend address to be filled in)

Log in to the [Cloudflare](https://dash.cloudflare.com) console, enter the `Workers and Pages` page, click `Create Application`, and select Pages

![1000000658](https://github.com/openRin/Rin/assets/36541432/35d4f9e3-3af3-4ec8-8060-2a352f4d51ae)

Click Connect to Git to connect to your own GitHub account and select the Forked repository

![1000000666](https://github.com/openRin/Rin/assets/36541432/e3b6da75-1a5f-46ec-9820-636cc5238023)

Click `Start Settings` to enter the configuration page:

Build settings fill in the following content:

```
Framework preset: None
Build command: bun b
Build output directory: client/dist
Path: <Leave blank>
```

![1000000659](https://github.com/openRin/Rin/assets/36541432/98fb3021-932b-4bfa-8118-3378f98ff628)

Environment variables Copy the following content and modify the variable value according to your own situation:

> [!IMPORTANT]
> The last two lines of environment variables `SKIP_DEPENDENCY_INSTALL` and `UNSTABLE_PRE_BUILD` are parameters for configuring Cloudflare to use Bun for building. Do not modify them.

```ini
NAME=Xeu # Nickname, displayed in the upper left corner
DESCRIPTION=Omnivore # Personal description, displayed below the nickname in the upper left corner
AVATAR=https://avatars.githubusercontent.com/u/36541432 # Avatar address, displayed in the upper left corner
API_URL=https://rin.xeu.life # Server domain name, you can use the default value to see the effect first, and then modify it after deploying the server later
PAGE_SIZE=5 # Default paging size, 5 is recommended
SKIP_DEPENDENCY_INSTALL=true
UNSTABLE_PRE_BUILD=asdf install bun latest && asdf global bun latest && bun i
```

![1000000660](https://github.com/openRin/Rin/assets/36541432/0fe9276f-e16f-4b8a-87c5-14de582c9a3a)

Click `Save and deploy` and wait for the build deployment, which will take about 30 seconds if nothing goes wrong. After that, the deployment is complete:

![1000000661](https://github.com/openRin/Rin/assets/36541432/979810b7-3f6f-415b-a8e8-5b08b0da905d)

Click to open and you can see the front-end page

![1000000662](https://github.com/openRin/Rin/assets/36541432/57c61ad6-c324-48e4-a28f-a1708fd7d41a)

The front-end is fully deployed 🎉

### Troubleshooting

If you encounter the following error, please check whether there are spaces and other irrelevant content in the environment variables
```
2024-06-07T02:24:04.979145Z Using v2 root directory strategy
2024-06-07T02:24:05.003931Z Success: Finished cloning repository files
2024-06-07T02:24:06.568608Z Checking for configuration in a wrangler.toml configuration file (BETA)
2024-06-07T02:24:06.56923Z
2024-06-07T02:24:06.667468Z No wrangler.toml file found. Continuing.
2024-06-07T02:24:07.542274Z Failed: an internal error occurred. If this continues, contact support: https://cfl.re/3WgEyrH
```

If the error message is as follows, please click `Retry deployment` to try again:
```
16:30:39.855 Using v2 root directory strategy
16:30:39.881 Success: Finished cloning repository files
16:30:40.746 Failed: unable to read wrangler.toml file with code: -11
16:30:41.587 Failed: an internal error occurred. If this continues, contact support: https://cfl.re/3WgEyrH
```

You can modify the environment variables and configure the domain name again in the Pages settings later

But there is nothing on the page now because we haven't started deploying the backend yet

## Backend

Backend deployment is cumbersome, but after several optimizations, it has been greatly simplified

### Get user ID and API Token

Refer to https://developers.cloudflare.com/workers/wrangler/ci-cd/ to configure the Cloudflare login environment variables required by GitHub Actions

ID Click on a domain name you have bound to at random. After entering, you can find the `Account ID` on the right (you need to scroll down a distance)

Create an API token: Click the `avatar` in the upper right corner > `My profile` > `API token` > `Create token`, and select the template `Edit Cloudflare Workers`:
![1000000663](https://github.com/openRin/Rin/assets/36541432/3a34a2ad-b993-47fe-965d-31cca4a8e92a)

Save the token after creation

### Configure GitHub Action

In your forked repository > `Settings` > `Secrets and Variables` > `Actions` > `Repository secrets` Click `New repository secret` to create the following two keys:

```
CLOUDFLARE_ACCOUNT_ID=<your user ID>
CLOUDFLARE_API_TOKEN=<your token>
```

You can also create the following variables in `Variables` of `Actions secrets and variables`:

```ini
DB_NAME=<database name, default rin>
WORKER_NAME=<Cloudflare Worker name, default rin-server>
FRONTEND_URL=<front-end address, used for concatenating addresses when Webhook notifications, optional>
SEO_BASE_URL=<SEO base address, used for SEO indexing, default is FRONTEND_URL>
SEO_CONTAINS_KEY=<SEO indexing only indexes links starting with SEO_BASE_URL or containing the SEO_CONTAINS_KEY keyword, default is empty>
S3_FOLDER=<folder for S3 image resource storage, default is 'images/'>
S3_CACHE_FOLDER=<S3 cache folder (for SEO, high-frequency request cache), default is 'cache/'>
S3_BUCKET=<S3 bucket name>
S3_REGION=<S3 bucket region, if using Cloudflare R2, fill in auto>
S3_ENDPOINT=<S3 bucket access point address>
S3_ACCESS_HOST=<S3 bucket access address, no '/' at the end>
```

> [!TIP]
> For SEO working principle and configuration, please refer to [SEO Document](./SEO.md)

After completing the preparations, you can manually trigger a Workflow in GitHub Action. If everything goes well, the deployment will be completed soon

The server is deployed, but it still cannot run. We also need to configure GitHub OAuth for login and S3 storage for storing images

> [!TIP]
> In v0.2.0 After version 0.2.0, you no longer need to go back to the Cloudflare panel to configure the backend domain name and some sensitive environment variables. All environment variables can be added by creating corresponding keys through GitHub. If you have deployed in an earlier version, you need to migrate the environment variables to GitHub.

> ~~Go back to the Cloudflare panel to configure the backend domain name and some sensitive environment variables~~
>
> ~~You can customize the backend domain name in `Settings` > `Triggers` > `Custom Domains`. By default, a domain name of `workers.dev` is also assigned~~
>
> ~~Edit variables in `Settings` > `Variables` > `Environment Variables`, click Add Variable, copy and paste the following content to the variable name to automatically add all environment variables, and then modify the variable value according to your specific configuration:~~
> After version 0.2.0, it is recommended that all the following environment variables be added by creating corresponding keys in GitHub. The addition method is the same as adding `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` above. Same, here is the list of environment variables:

```ini
RIN_GITHUB_CLIENT_ID=<your GithubClientID>
RIN_GITHUB_CLIENT_SECRET=<your GithubClientSecret>
JWT_SECRET=<the key required for JWT authentication, which can be any password in the regular format>
S3_ACCESS_KEY_ID=<your S3AccessKeyID>
S3_SECRET_ACCESS_KEY=<your S3SecretAccessKey>
```

## Connect to GitHub OAuth

Open <https://github.com/settings/developers>, select `New OAuth App` to create a new Oauth App, fill in your own application name and homepage address (with `http://` or `https://`), fill in `Authorization callback URL`

```
https://<your backend address>/user/github/callback
```

Here are my parameters
![GitHub OAuth configuration](https://github.com/openRin/Rin/assets/36541432/74ab8d16-93ca-4919-beec-4beb7a2003a6)

Then configure the OAuth part in the environment variables

The following is the specific configuration, `RIN_GITHUB_CLIENT_ID` fill in the `Client ID` in GitHub OAuth App, `RIN_GITHUB_CLIENT_SECRET` fill in the GitHub OAuth App click `Generate a new client secret` `Client secret` after each creation. Note that it is only displayed once each time it is created and cannot be viewed later. If you accidentally lose it, just regenerate a new one.

## Create R2 bucket

In theory, it supports any object storage service that follows the S3 protocol. Here we only introduce the operation of connecting to Cloudflare R2

Click `R2` > `Create bucket` in the Cloudflare panel, fill in the name, and select a location close to you:

![1000000665](https://github.com/openRin/Rin/assets/36541432/17c5ad7b-8a3a-49b2-845a-8d043484aa63)

After creating the bucket, go to the bucket details page > `Settings`, copy the S3 API address, remove the bucket name at the end and fill in `S3_ENDPOINT`, such as:

```ini
S3_BUCKET=image # Bucket name
S3_REGION=auto # Region auto No need to modify
S3_ENDPOINT=https://8879900e5e1219fb745c9f69b086565a.r2.cloudflarestorage.com
```

Then bind a domain name at `Public Access` to access resources. The bound domain name corresponds to the `S3_ACCESS_HOST` environment variable:

```ini
S3_ACCESS_HOST=https://image.xeu.life
```

Then create an API token to access the bucket. You can refer to https://developers.cloudflare.com/r2/api/s3/tokens/. I won't repeat it here. Get the ID and TOKEN corresponding to the `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY` variables and fill them in the Workers environment variables

The backend has been deployed so far. Remember to change the front-end API_URL to the backend address. At the same time, if you need WebHook If you want to notify, you can also configure the environment variable `WEBHOOK_URL` as your Webhook address in the backend. When adding a comment, a POST message will be sent to the target URL. The message format is:

```json
{
"content": "message content"
}
```

> [!TIP]
> After all environment variables are debugged, you can click the encrypt button to encrypt the environment variables (only keep FRONTEND_URL and S3_FOLDER), so that the encrypted environment variables will not be overwritten/deleted during the next deployment

# Operation video
Due to time constraints, the following video has not been edited and post-processed. If you do not understand or are confused about the deployment process, you can refer to the video steps

https://github.com/openRin/Rin/assets/36541432/3ed98e93-2cc3-4e5f-a885-4d16a48500c3