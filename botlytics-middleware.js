
var request = require('request')
module.exports = function (credentials, botId) {
    if (!credentials || !credentials.token) {
        throw new Error('No token specified');
    }
    BotlyticsMiddleware = {};

    BotlyticsMiddleware.receive = function (session, next) {
        sendToBotlytics(session, false, next);
    }

    BotlyticsMiddleware.send = function (session, next) {
        sendToBotlytics(session, true, next);
    }

    function sendToBotlytics(session, is_sender_bot, next) {
        var options = {
            method: 'POST',
            url: 'http://botlytics.co/api/v1/messages',
            qs: {
                token: credentials.token
            },
            headers: {
                'content-type': 'application/json'
            },
            body: {
                message: {
                    text: session.text,
                    kind: (is_sender_bot) ? "incoming" : "outgoing",
                    conversation_identifier: session.address.conversation.id,
                    sender_identifier: (is_sender_bot) ? botId || session.address.bot.id : session.address.user.id,
                    platform: session.address.channelId,
                    payload: {
                        type: session.type || '',
                        timestamp: session.timestamp || '',
                        textLocale: session.textLocale || '',
                        user_name: session.address.user.name || ''
                    }
                }
            },
            json: true
        };


        request(options, function (error, response, body) {
            if (error) {
                next(error);
            } else if (response.statusCode != 200 || response.statusCode != 201) {
                next(new Error("Unexpected Status Code from Botlytics API"));
            } else {
                next();
            }
        });
    }
    return BotlyticsMiddleware;
};