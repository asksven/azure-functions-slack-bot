# azure-functions-slack-bot
A nodejs Azure Function to post to Slack

# 1 Pre-requisites

- You will need an Azure subscription. You can get one for free [here](https://azure.microsoft.com/en-us/free/)
- your brain

# 2 TLDR;

1. Fork this project
2. Create an `Azure function App` from the portal (as at this time Azure Functions are still in preview you may want to go [here](https://portal.azure.com/#create/Microsoft.FunctionApp)
3. Set the forked repo as your deployment source (gear icon)
4. Create a function called `Slackbot` (or whatever name you have changed the function into in your fork)
5. wait for the repo to sync
6. Tricky part: for whatever reason Azure Functions do not run `npm install`. Therefore you need to go to `Function app Settings - Kudu` and open the console, go to `site/wwwroot/Slackbot` and run `npm install` from the console command-line
6. go to the `Function app settings`
7. Create a [Slack Webhook](https://my.slack.com/services/new/incoming-webhook/)
8. Add an `App Setting` named `SLACK_URL` to your Azure Function, pointing to the Slack Webhook
9. Test the function by adding a payload (HTTP POST) to the functions's `Run` body
```
{
    "channel": "<webhook-channel>",

    "username": "<bot-name>",
    "text": "This is your last notice",
    "icon_url": "",
    "icon_emoji": ":lightning_cloud:",
    "fallback": "Upgrade your client",
    "notifications": [
    {
        "type": "error",
        "title": "Error title",
        "text": "This is an error notification"
    },
    {
        "type": "warn",
        "title": "Warn title",
        "text": "This is a warning notification"
    },
    {
        "type": "info",
        "title": "Info title",
        "text": "This is an info notification"
    }]
}
```
