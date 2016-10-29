# azure-functions-slack-bot
A nodejs Azure Function to post to Slack

# 1 Pre-requisites

- You will need an Azure subscription. You can get one for free [here](https://azure.microsoft.com/en-us/free/)
- your brain

# 2 TLDR;

1. Fork this project
2. Create an Azure function of type `HttpTrigger-NodeJS` and `Configure continous integration`
3. Set the forked repo as your deployment source (gear icon)
4. go to the `Function app settings`
5. Create a Slack Webhook
6. Add an `App Setting` named `SLACK_URL` to your Azure Function, pointing to the Slack Webhook
7. Test the function by adding a payload (HTTP POST) to the functions's `Run` body
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
8.
