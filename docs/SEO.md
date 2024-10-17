# Introduction to SEO working principle and configuration guide
## Preface
Due to the use of front-end and back-end separation technology, search engines cannot directly obtain page content, so SEO optimization is needed to improve the search engine's inclusion effect. This article will introduce the working principle and configuration guide of SEO implementation in this project.

## Working principle
The SEO optimization solution adopted in this project is to pre-render through Github Action, upload the pre-rendered page to the S3 bucket, and proxy the request through Cloudflare Workers to achieve SEO optimization.

Pre-rendering is a simple crawler. Starting from the provided SEO_BASE_URL, each time a page is requested, the rendered html content is uploaded to the S3 bucket cache. At the same time, all links in the page are extracted to determine whether they start with SEO_BASE_URL or contain the SEO_CONTAINS_KEY keyword. If so, the link is requested and pre-rendered until there are no new links.

## Configuration Guide
### Environment variables
When deploying the backend, you need to configure the following environment variables (plain text) in Github:
```ini
SEO_BASE_URL=<SEO base address, used for SEO indexing, defaults to FRONTEND_URL>
SEO_CONTAINS_KEY=<SEO indexing only indexes links starting with SEO_BASE_URL or containing the SEO_CONTAINS_KEY keyword, default is empty>
S3_FOLDER=<Folder where S3 image resources are stored, default is 'images/'>
S3_CACHE_FOLDER=<S3 cache folder (used for SEO, high-frequency request cache), default is 'cache/'>
S3_BUCKET=<S3 bucket name>
S3_REGION=<S3 bucket region, if using Cloudflare R2, fill in auto>
S3_ENDPOINT=<S3 Bucket access point address>
S3_ACCESS_HOST=<S3 bucket access address>
```

And the following environment variables (encrypted):
```ini
S3_ACCESS_KEY_ID=<your S3AccessKeyID>
S3_SECRET_ACCESS_KEY=<your S3SecretAccessKey>
```

Because these environment variables are huge and cover a considerable part of the full list of environment variables, it is recommended to add these environment variables directly in Github during deployment in `v0.2.0` and later, instead of adding them through the Cloudflare panel. This can reduce the time cost of configuration to a certain extent.

### Deployment
After configuring the environment variables, you can manually trigger a Workflow in Github Action. If everything goes well, the deployment will be completed quickly.

### Configure Workers route
Open your domain details page in the Cloudflare Workers panel, click `Workers route`, add a new route, and fill in the route as follows:
```
<frontend domain>/seo/*
```
For example:
```
xeu.life/seo/*
```
![Image](https://github.com/openRin/Rin/assets/36541432/ed0ecc72-f61f-4460-8ede-4475ca54ffcb)

Select Worker as the deployed Worker and click Save.

Then click the sidebar menu > `Rules` > `Conversion Rules` > `Rewrite URL` > `Create Rule`, the rule name is arbitrary, and the custom filter expression is:
> [!NOTE]
> This filter expression is only optimized for Google. If you need optimization for other search engines, please find the corresponding crawler UA and fill it in
```
(http.host eq "<front-end domain name, such as xeu.life>" and http.user_agent contains "Googlebot")
```
The rewrite path is set to `Dynamic`, and the value is:
```
concat("/seo",http.request.uri.path)
```
Select `Keep Query`

Reference configuration screenshot:
![Conversion Rules](https://github.com/openRin/Rin/assets/36541432/657e9546-1dc0-4390-9bfc-5d3eb725e792)

Click Deploy to complete the SEO configuration.