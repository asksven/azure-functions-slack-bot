var request = require('request');

// a helper to validate a JSON object
var validator = function(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}
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

    // validate the BODY as being a valid JSON object
    context.log("Is {}}?: " + validator("{}")); // true
    context.log("Is req.body valid?: " + validator(req.body)); // true

    // in some cases req.body comes as a valid object, sometimes as a string
    var payload;
    if (validator(req.body)) {
      payload = JSON.parse(req.body);
    } else {
      payload = req.body;
    }

    context.log('Body: ' + payload);
    context.log('channel: ' + payload.channel);

    // Build the slack API call
    var msg = {
        channel: payload.channel,
        username: payload.username,
        icon_emoji: payload.icon_emoji,
        mrkdwn: true,
        text: payload.text,
        fallback: payload.fallback,
        attachments: noticeToAttach(payload.notifications)
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
