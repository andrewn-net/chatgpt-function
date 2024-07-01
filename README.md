## ChatGPT Function

This app provides a single function (no workflow) to send a prompt to OpenAI ChatGPT and return a respopnse. The function can be used as a step in Slack's next-generation platform Workflow Builder.

<img width="1136" alt="Screenshot 2024-07-01 at 12 53 42 PM" src="https://github.com/andrewn-net/chatgpt-function/assets/27248499/dd86c643-80ef-4f72-87f0-de2078247cd8">

## Setup

### Open AI ChatGPT API

Sign up to https://platform.openai.com/ to access the OpenAI ChatGPT API.


### Clone the Template

Start by cloning this repository:

```zsh
# Clone this project onto your machine
$ slack create chatgpt-function -t andrewn-net/chatgpt-function

# Change into the project directory
$ cd chatgpt-function
```

## Running Your Project Locally

While building your app, you can see your changes appear in your workspace in
real-time with `slack run`. You'll know an app is the development version if the
name has the string `(local)` appended.

```zsh
# Run app locally
$ slack run

Connected, awaiting events
```

To stop running locally, press `<CTRL> + C` to end the process.

## Deploying Your App

Once development is complete, deploy the app to Slack infrastructure using
`slack deploy`:

```zsh
$ slack deploy
```

## Viewing Activity Logs

Activity logs of your application can be viewed live and as they occur with the
following command:

```zsh
$ slack activity --tail
```

## Project Structure

### `.slack/`

Contains `apps.dev.json` and `apps.json`, which include installation details for
development and deployed apps.

### `functions/`

[Functions](https://api.slack.com/automation/functions) are reusable building
blocks of automation that accept inputs, perform calculations, and provide
outputs. Functions can be used independently or as steps in workflows.

### `manifest.ts`

The [app manifest](https://api.slack.com/automation/manifest) contains the app's
configuration. This file defines attributes like app name and description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

## Resources

To learn more about developing automations on Slack, visit the following:

- [Automation Overview](https://api.slack.com/automation)
- [CLI Quick Reference](https://api.slack.com/automation/cli/quick-reference)
- [Samples and Templates](https://api.slack.com/automation/samples)
