# RSS support and configuration

Supports three subscription formats: RSS, Atom, and Json

## Configuration

## Environment variables

RSS itself does not require much configuration and is out-of-the-box by default. However, you can modify its default configuration through the following environment variables:

```ini
RSS_TITLE=<RSS title, default is your username>
RSS_DESCRIPTION=<RSS description, default is Feed from Rin>
```

The above environment variables can be added in Github's `Settings` > `Secrets and Variables` > `Actions` > `Variables` > `New repository variable`.

## Workers route

Open your domain details page in the Cloudflare Workers panel, click `Workers route`, add a new route, and fill in the route as follows:

```
<front-end domain>/sub/*
```

For example:

```
xeu.life/sub/*
```

Select Worker as the deployed Worker and click Save.

> [!NOTE]
> If you have also configured domestic CDN acceleration, you also need to set the Workers route for the back-to-source domain in the same way as above.

## Use

RSS subscription address is:

```
<front-end domain>/sub/rss.xml
```

Atom subscription address is:

```
<front-end domain>/sub/atom.xml
```

Json subscription address is:

```
<front-end domain>/sub/rss.json
```