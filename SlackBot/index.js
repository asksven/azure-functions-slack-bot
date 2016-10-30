var request = require('request');

// a helper converting the notifications to Slack attachments
var noticeToAttach = function(arr) {
    var attachments = [];
    console.log("noticeToAttach was called");

    var getColor = function(noticeType) {
        if (noticeType === 'error') {
            return 'danger';
        } else if (noticeType === 'warn') {
            return 'warning';
        } else {
            return 'good';
        };
    }

    for (var i=0, len=arr.length; i < len; i++) {
        var notice = arr[i];
        attachments.push({
            "fallback": notice.text,
            "color": getColor(notice.type),
            "title": notice.title,
            "text": notice.text,
        });
    }

    return attachments;
}

// the function processing data when the function gets called
module.exports = function(context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);
    var url = process.env["SLACK_URL"];

    // retrieve the environment variable from the "App Settings" as this a kinda secret
    context.log('Slack Webhook URL: ' + url);
    context.log('Body: ' + req.body);

    // Build the slack API call
    var msg = {
        channel: req.body.channel,
        username: req.body.username,
        icon_emoji: req.body.icon_emoji,
        mrkdwn: true,
        text: req.body.text,
        fallback: req.body.fallback,
        attachments: noticeToAttach(req.body.notifications)
    };

    // and POST it
    request({
        method: 'POST',
        uri: url,
        json: true,
        body: msg
    },
    function(error, response, body) {
        if (response.statusCode == 200) {
            context.res = {
                body: 'Posted successfully'
            };
            context.log('Posted successfully');
        } else {
            context.res = {
                status: response.statusCode,
                body: 'Error: ' + body
            }
        };

        context.done();
    });


};
