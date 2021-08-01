## Set up new project
1. Make sure you have [Node.js](https://nodejs.org/) (^14.15.0) and [Yarn](https://yarnpkg.com/) (^1.16.0) installed.
2. Install the dependencies. Run:
    ```shell
    yarn
    ```
3. Set up your new project using CLI. Run and follow the instructions:
    ```shell
    yarn plop
    ```

## Develop
1. Install the dependencies. Run:
    ```shell
    yarn
    ```
2. Set up environment variables. See list of pre-configured environment 
variables bellow. Run:
    ```shell
    yarn configure
    ```
3. Start the development server ([see](https://nextjs.org/docs/api-reference/cli#development) additional info about this feature). Run:
    ```shell
    yarn dev
    ```
4. Open `http://localhost:3000` in your browser.

## Publish
1. Install the dependencies. Run:
    ```shell
    yarn
    ```
2. Make the production build. Run:
    ```shell
    yarn build
    ```
3. Start server ([see](https://nextjs.org/docs/api-reference/cli#production) additional info about this feature). Run:
    ```shell
    yarn start
    ```

## Pre-configured environment variables
1. `NEXT_STATIC_API_BASE_URL` — useful for configuring base URL for any
API calls.
2. `NEXT_STATIC_ASSETS_VERSION` — version of public assets. Can be used
to reset browser cache of any assets.
3. `NEXT_STATIC_SLACK_API_TOKEN` and `NEXT_STATIC_SLACK_API_CHANNEL` —
used to log errors to any Slack channel using [Slack APIs](https://api.slack.com/apis).
