module.exports = function (context, data) {
    context.log('Function was triggered with data:' + JSON.stringify(data, null, 2));

    var request = require('request');

    var status = 'unknown'; # will be "Activated" or "Resolved"
    var resourceName = 'unknown';

    if(data) {
        var slackUrl = process.env["SLACK_URL"];
        context.log('Slack webhook: ' + slackUrl);

      // we expect a message of the form described here: https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/insights-webhooks-alerts

        if (data.status && data.context) {
          status = data.status;

          if (data.context.resourceName) {
            resourceName = data.context.resourceName;
          }

        } else {
          context.log('data is supposed to contain a "status" and a "context"');
        }

        var text = {
            "text": "Alert " + data.context.name + ': 'status + "\n" + data.context.description + "\n<" + data.context.portalLink + "|Link>"
        };

        var requestData = {
            url: slackUrl,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: text
        };

        request(requestData);
        context.res = {
            status: 200
        };
    }
    else {
        context.res = {
            status: 400,
            body: { error: 'Please pass first/last properties in the input object'}
        };
    }

    context.done();
}
