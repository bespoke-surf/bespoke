<p align="center">
  <a href="https://bespoke.surf">
    <img src="https://github.com/bespoke-surf/bespoke/assets/3761062/523654f1-74f1-4395-885c-b3ca1dc40a7a" width="318px" alt="Bespoke logo" />
  </a>

  <!-- <h1 align="center"><a href="https://bespoke.surf">Bespoke</a></h1> -->
</p>

<strong>
<h3 align="center">Open Source Personalized Marketing Platform.</h3></strong>
<p align="center">Combining best parts of Mailchimp, Kalvioy's automation, Substack's newsletter and Typeform for surveys.</p>
<p align="center"><a href="https://bespoke.surf">Bespoke Cloud</a> · <a href="https://bespoke-api.readme.io/reference">API Reference</a></p>

<p align="center">
<a href="https://discord.gg/sXAkfWBM">
    <img src="https://img.shields.io/discord/957706478670712893?label=Discord" alt="Bespoke on Discord" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=bespoke_surf">
    <img alt="Follow us on Twitter" src="https://img.shields.io/twitter/follow/bespoke_surf?style=social"/>
  </a>
</p>

<br />

<p align="center">
  <a href="https://bespoke.surf">
    <img src="https://github.com/bespoke-surf/bespoke/assets/3761062/192c2c20-3eb4-46f4-99f3-9c672dde2b0f" alt="Administration panel" />
  </a>
</p>
<div align="center">
</div>
   <p>
   Bespoke's mission is to gather information about the customer and do personalized content recommendations.

We gather customer data through various means, including API's, behavioral intent, surveys and integrations with platforms for data ingestion. Recommendations are delivered via Automations and Campaigns.</p>

<br>

## Feature roadmap

- [x] Automations
- [x] Newsletter
- [x] Sign-up Forms
- [x] Design Emails
- [x] Lists
- [ ] Segmentation
- [ ] Campaigns
- [ ] Analytics Dashboard
- [ ] Transactional Emails & Webhooks
- [ ] Surveys
- [ ] Behavioral Intent API

> For full feature breakdown see Bespoke Cloud [Pricing Page](https://bespoke.surf/pricing)

<br>

## Documentation

- [API Reference](https://bespoke-api.readme.io/reference/introduction-to-bespoke) for Bespoke REST API
- Details about Bespoke's [Suppression](https://bespoke-api.readme.io/reference/supression-hit-tier) process

<br>

## Quick Links

- 🆘 Join
  [Disocrd](https://discord.gg/sXAkfWBM)
  to talk to devs
- 💡 Suggest
  [Feature and Integration Requests](https://feedback.bespoke.surf).
- 🐛 Open a [GitHub issue](https://github.com/bespoke-surf/bespoke/issues) to
  report a bug.

<br>

## Developing Bespoke

1. Clone this repository

2. Initial setup

   ```sh
   ~/bespoke$: yarn setup
   ```

3. Run both `web` and `server` using turbo repo in parallel mode:

   ```sh
   ~/bespoke$: yarn dev
   ```

   ℹ️ we recommed not running it parallel.

   ```sh
   ~/bespoke/apps/web$: yarn dev

   ```

   ```sh
   ~/bespoke/packages/server$: yarn dev

   ```

   > Do not forget to fill the env variables in `web` and `server` folder

This starts your app in development mode.

<br>

## Deploying Bespoke

Bespoke comes with a GitHub Action that handles automatically deploying your app to production environments.

Prior to your first deployment, you'll need to do a few things:

1.  Install, sign up and login to [Fly](https://fly.io/docs/hands-on/install-flyctl/)

2.  Create two apps on Fly, one for web and one for server:
    ```sh
    fly apps create [your-app-name]-web
    fly apps create [your-app-name]-server
    ```
3.  Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.
4.  Dealing with Bespoke Web

    1. Add the following secrets to your fly app secrets, to do this you can run the following commands:

       ```sh
       fly secrets set FRONTEND_HOST= BACKEND_HOST= FLY_BACKEND_HOST= SENTRY_DSN= POSTHOG_TOKEN= POSTHOG_ORGANISATION= POSTHOG_PROJECT_ID= CLOUDINARY_UPLOAD_IMAGE_URL= CLOUDINARY_PRESET= OPEN_SOURCE=true --app [your-app-name]-web
       ```

    2. Add `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_REGION`, `AWS_S3_BUCKET`, `CLOUDFRONT`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in Gihub. This is used during docker container build.

    3. For the initial `fly deploy` you can use:

       ```sh
         ~/bespoke$: yarn deploy:web
       ```

5.  Dealing with Bespoke Server

    1.  Add to your fly app secrets, to do this you can run the following commands:

        ```sh
        fly secrets set HOST= FRONTEND_HOST= FRONTEND_HOST_PROTOCOL= SESSION_SECRET=$(openssl rand -hex 32) AWS_ACCESS_KEY_ID= AWS_SECRET_ACCESS_KEY= SES_REGION= SES_SENDING_RATE= REDIS_URL= UNLAYER_SECRET= OPEN_SOURCE=true EMAIL_DOMAIN= SUPPORT_EMAIL= SENTRY_DSN= POSTHOG_KEY= --app [your-app-name]-server
        ```

    2.  Create a Fly [Postgres Cluster](https://fly.io/docs/postgres/getting-started/create-pg-cluster/)

    3.  [Attach](https://fly.io/docs/postgres/managing/attach-detach/) Postgres Cluster to Bespoke Server

    4.  Create a [Redis instance](https://fly.io/docs/reference/redis/). Add `REDIS_URL` to fly secrets
    5.  For the initial `fly deploy` you can use:

        ```sh
         ~/bespoke$: yarn deploy:server
        ```

Now that everything is set up you can commit and push your changes to your repo. Every commit to your main branch will trigger a deployment to your production environment.

<br>

## Contributing

1. Create a new branch
   - `git checkout -b my-new-branch`
2. Commit your changes
   - `git commit -a -m 'Description of the changes'`
     - There are many ways of doing this and this is just a suggestion
3. Push your branch to GitHub
   - `git push origin my-new-branch`
4. Go to the repository page in GitHub and click on "Compare & pull request"

<br>

## Support

If you have any questions about Bespoke, would like to discuss a bug report, or have questions about new integrations, feel free to join us at [our Discord server](https://discord.gg/sXAkfWBM).

Bespoke engineers are checking this regularly.

<br>

### License

Bespoke is [MIT licensed](https://github.com/bespoke-surf/bespoke/LICENSE.md) for env variabe `OPEN_SOURCE=true`

Bespoke Cloud is [Business Source Licenced](https://github.com/bespoke-surf/bespoke/BUSINESS_LICENSE.md) for env variable `OPEN_SOURCE=false`

⚠️ You will be violating our [Business Source Licence](https://github.com/bespoke-surf/bespoke/BUSINESS_LICENSE.md) if you have the environment variable `OPEN_SOURCE=false`
