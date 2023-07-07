<p align="center">
  <a href="https://bespoke.surf">
    <img src="https://github.com/bespoke-surf/bespoke/assets/3761062/59936991-c64d-4e97-abd0-3f801f8b9a52" width="318px" alt="Bespoke logo" />
  </a>

  <!-- <h1 align="center"><a href="https://bespoke.surf">Bespoke</a></h1> -->
</p>

<strong>
<h3 align="center">Open Source Personalized Marketing Platform.</h3></strong>
<p align="center">Combining best parts of Mailchimp, Kalviyo's automation, Substack's newsletter and Typeform for surveys.</p>
<p align="center"><a href="https://bespoke.surf">Bespoke Cloud</a> · <a href="https://bespoke-api.readme.io/reference">API Reference</a></p>

<p align="center">
<a href="https://discord.gg/h8gekTtq">
    <img src="https://img.shields.io/discord/957706478670712893?label=Discord" alt="Bespoke on Discord" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=bespoke_surf">
    <img alt="Follow us on Twitter" src="https://img.shields.io/twitter/follow/bespoke_surf?style=social"/>
  </a>
</p>

<br />

<p align="center">
  <a href="https://bespoke.surf">
    <img src="https://github.com/bespoke-surf/bespoke/assets/3761062/8dae2e53-b492-4693-acad-d123c1b4feec" alt="Administration panel" />
  </a>
</p>
<div align="center">
</div>
   <p>
   Bespoke's mission is to gather information about the customer and do personalized targetting.

We gather customer data through various means, including API's, behavioral intent, surveys and integrations with platforms for data ingestion. Recommendations are delivered via Automations and Campaigns.</p>

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

## Documentation & Links

- [API Reference](https://bespoke-api.readme.io/reference/introduction-to-bespoke) for Bespoke REST API
- Details about Bespoke's [Suppression](https://bespoke-api.readme.io/reference/supression-hit-tier) process
- Join
  [Discord](https://discord.gg/h8gekTtq)
  to talk to devs
- Suggest
  [Feature and Integration Requests](https://feedback.bespoke.surf).
- Open a [GitHub issue](https://github.com/bespoke-surf/bespoke/issues) to
  report a bug.

## OpenAPI and Postman

Experience seamless integration with Bespoke's OpenAPI and Postman. Explore our latest OpenAPI specification.

For quick and convenient interaction with our APIs, import the [OpenAPI spec](https://github.com/bespoke-surf/openapi/tree/main) into your preferred API tool, such as Postman. This will enable you to immediately begin working with our new APIs.

To further simplify your workflow, we have created a dedicated [Postman Workspace](https://www.postman.com/bespoke-surf/workspace/bespoke-developers). By visiting our Postman Workspace, you will have access to our latest collection of requests, along with the comprehensive API definitions.

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
       fly secrets set FRONTEND_HOST= BACKEND_HOST= FLY_BACKEND_HOST= SENTRY_DSN= POSTHOG_TOKEN= POSTHOG_ORGANISATION= POSTHOG_PROJECT_ID= CLOUDINARY_UPLOAD_IMAGE_URL= CLOUDINARY_PRESET= UNLAYER_PROJECT_ID= OPEN_SOURCE=true --app [your-app-name]-web
       ```

    2. Add `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_REGION`, `AWS_S3_BUCKET`, `CLOUDFRONT`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in Gihub. This is used during docker container build.

    3. For the initial `fly deploy` you can use:

       ```sh
         ~/bespoke$: yarn deploy:web
       ```

5.  Dealing with Bespoke Server

    1.  Add to your fly app secrets, to do this you can run the following commands:

        ```sh
        fly secrets set HOST= FRONTEND_HOST= FRONTEND_HOST_PROTOCOL= SESSION_SECRET=$(openssl rand -hex 32) AWS_ACCESS_KEY_ID= AWS_SECRET_ACCESS_KEY= SES_REGION= SES_SENDING_RATE= REDIS_PORT= REDIS_HOST= REDIS_PASSWORD= UNLAYER_SECRET= OPEN_SOURCE=true EMAIL_DOMAIN= SUPPORT_EMAIL= SENTRY_DSN= POSTHOG_KEY= --app [your-app-name]-server
        ```

    2.  Create a Fly [Postgres Cluster](https://fly.io/docs/postgres/getting-started/create-pg-cluster/)

    3.  [Attach](https://fly.io/docs/postgres/managing/attach-detach/) Postgres Cluster to Bespoke Server

    4.  We recommend `not using` Redis by Upstash in Fly.

    5.  Before deploying please read AWS SES & SNS setup

    6.  For the initial `fly deploy` you can use:

        ```sh
         ~/bespoke$: yarn deploy:server
        ```

### Setting up Email Provider

To receive Hard bounce, Open, Delivery events etc, let's setup AWS SES with AWS SNS

#### AWS SNS Setup

We need to create a new subscription and confirm the https endpoint.

1. Create a new Subscription

2. Add Topic name and select `HTTPS` protocol

3. Add your endpoint i.e `[server-hostname]/user/sns-webhook`

4. `console.log()` the data in your `sns-webhook` under user controller

5. Before deploying add and confirm a localhost endpoint

6. Deploy the server and confirm your production endpoint

#### AWS SES Setup

We need to create a new configuration set and add the SNS subscription as the destination for events.

1. Create a new configuration set with default values

2. Add a new Event Destination

3. Select all event types except `Redering failures` & also select open and click tracking

4. Under destination option, select `Amazon SNS` and select the SNS topic you created

### SES Sending Rate

For the `SES_SENDING_RATE` env variable, you can get the value from the SES dashboard.

### OPEN_SOURCE=true

To get unlimited contacts and to send emails with no restriction and to create unlimited signup-forms, please set `OPEN_SOURCE=true`

### Unlayer Project Id & Unlayer Secret

Let's setup [Unlayer](https://unlayer.com/embed) for Signup-Forms and Email templates to work

1. Login or Signup to [Unlayer embed](https://unlayer.com/embed)

2. Create a project and get the project id from the url

3. Use project id for `UNLAYER_PROJECT_ID` env variabe for bespoke web

4. Go to the `Security` tab and enforce identity verification.

5. Copy secret and add to `UNLAYER_SECRET` env varaible for bespoke server

Now that everything is set up you can commit and push your changes to your repo. Every commit to your main branch will trigger a deployment to your production environment.

## Contributing

1. Create a new branch
   - `git checkout -b my-new-branch`
2. Commit your changes
   - `git commit -a -m 'Description of the changes'`
     - There are many ways of doing this and this is just a suggestion
3. Push your branch to GitHub
   - `git push origin my-new-branch`
4. Go to the repository page in GitHub and click on "Compare & pull request"

## Support

If you have any questions about Bespoke, would like to discuss a bug report, or have questions about new integrations, feel free to join us at [our Discord server](https://discord.gg/h8gekTtq).

Bespoke engineers are checking this regularly.

## License

Bespoke is [AGPL-3.0 license](https://github.com/bespoke-surf/bespoke/blob/main/LICENSE.md)
