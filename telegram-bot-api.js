TelegramBot = new function TelegramBot() {

    var TelegramBotConsts = {
            API_URL: 'https://api.telegram.org/bot',
            API_TOKEN: '',
            API_CHAIN_SYNTAX: true,
            API_CALL_METHOD: 'POST',
            API_REQUEST_URL: [Random.id(20), Random.id(20), 'webhook'].join('/')
        },
        TelegramBotHandlers = {},
        protoTelegramBotApi = {
            get getMe() {
                function getMe(asyncCallback) {

                    var argArray = [
                            TelegramBotConsts.API_CALL_METHOD,
                            TelegramBotConsts.API_URL + TelegramBotConsts.API_TOKEN
                        ],
                        response;

                    if (asyncCallback) {
                        check(asyncCallback, Function);

                        argArray.push(asyncCallback);
                    }

                    response = HTTP.call.apply(this, argArray);


                    if (TelegramBotConsts.API_CHAIN_SYNTAX) {
                        return this;
                    } else {
                        return response;
                    }
                }

                return getMe;
            },
            get sendMessage() {
                function sendMessage(chat_id, text, params) {
                    check(chat_id, Match.OneOf(Match.Integer, String));
                    check(text, String);
                    check(
                        params,
                        Match.Optional({
                            parse_mode: Match.Optional(
                                Match.OneOf(
                                    'HTML',
                                    'Markdown'
                                )
                            ),
                            disable_web_page_preview: Match.Optional(Boolean),
                            reply_to_message_id: Match.Optional(Match.Integer),
                            reply_markup: Match.Optional(
                                Match.OneOf({
                                    keyboard: [[String]],
                                    resize_keyboard: Match.Optional(Boolean),
                                    one_time_keyboard: Match.Optional(Boolean),
                                    selective: Match.Optional(Boolean)
                                })
                            )
                        })
                    );

                    var argArray = [
                            TelegramBotConsts.API_CALL_METHOD,
                            TelegramBotConsts.API_URL + TelegramBotConsts.API_TOKEN + '/sendMessage',
                            {
                                data: {
                                    chat_id: chat_id,
                                    text: text
                                }
                            }
                        ],
                        response;

                    response = HTTP.call.apply(this, argArray);

                    if (TelegramBotConsts.API_CHAIN_SYNTAX) {
                        return this;
                    } else {
                        return response;
                    }
                }

                return sendMessage;
            },
            get setWebhook() {
                function setWebhook(localUrl) {
                    var reLocalUrl,
                        argArray,
                        response,
                        hostName;

                    if (localUrl) {
                        hostName = Meteor.absoluteUrl().replace(/(https*:\/\/|\/)/ig, '');
                        reLocalUrl = new RegExp('(https*://)*' + hostName + '/', 'gi');
                        localUrl = localUrl.replace(reLocalUrl, '');
                        TelegramBotConsts.API_REQUEST_URL = localUrl;
                    }


                    argArray = [
                        TelegramBotConsts.API_CALL_METHOD,
                        TelegramBotConsts.API_URL + TelegramBotConsts.API_TOKEN + '/setWebhook',
                        {
                            data: {
                                url: Meteor.absoluteUrl(TelegramBotConsts.API_REQUEST_URL, {
                                    secure: true,
                                    replaceLocalhost: true
                                })
                            }
                        }
                    ];

                    Router.route('webhook', {
                        path: '/' + TelegramBotConsts.API_REQUEST_URL,
                        where: 'server',
                        action: function routerWebhookAction() {
                            var request, message, text;

                            request = this.request;
                            message = request.body.message;
                            text = message.text;
                            console.log(text);

                            TelegramBot.match(text, message);

                            this.response.writeHead(200, {'Content-Type': 'application/json'});
                            this.response.end(JSON.stringify(this.request.query));
                        }
                    });

                    response = HTTP.call.apply(this, argArray);

                    if (TelegramBotConsts.API_CHAIN_SYNTAX) {
                        return this;
                    } else {
                        return response;
                    }
                }

                return setWebhook;
            }
        },
        TelegramBotApiDefaultHandler = function TelegramBotApiDefaultHandler() {
            console.warn(
                'TelegramBot:',
                '\n    This is default handler',
                '\n    To change default handler call TelegramBot.setDefaultHandler(Function)\n',
                '\n    this.subject: "' + this.subject + '"',
                '\n    this.pattern: "' + this.pattern + '"',
                '\n    this.matches: "' + this.matches + '"',
                '\n    this:', this,
                '\n    arguments', arguments
            );
        };

    this.__defineGetter__('init', function init() {
        function init(API_TOKEN) {
            var value,
                service = ServiceConfiguration.configurations.findOne({service: 'telegram'});


            if (API_TOKEN) {
                value = API_TOKEN;
            } else if (service && service.token) {
                value = service.token;
            } else {
                value = this.getConst('API_TOKEN');
            }

            this.setConst('API_TOKEN', value);

            if (!/^(http:\/\/)*(localhost|127\.0\.0\.1)/.test(Meteor.absoluteUrl())) {
                this.api.setWebhook(Meteor.absoluteUrl(this.getConst('API_REQUEST_URL'), {secure: true}));
            }

            return !!value;
        }

        return init;
    });


    this.__defineGetter__('setDefaultHandler', function () {
        function setDefaultHandler(newDefaultHandler) {
            //check(newDefaultHandler, Function);

            TelegramBotApiDefaultHandler = newDefaultHandler;
        }

        return setDefaultHandler;
    });


    this.__defineGetter__('setConst', function () {
        function setConst(name, value) {
            check(name, String);
            check(name, Match.OneOf(String, Number, Boolean));

            return TelegramBotConsts[name] = value;
        }

        return setConst;
    });

    this.__defineGetter__('getConst', function () {
        function getConst(name) {
            check(name, String);

            return TelegramBotConsts[name];
        }

        return getConst;
    });


    this.__defineGetter__('api', function () {
        function TelegramBotApi() {
        }

        TelegramBotApi.prototype = protoTelegramBotApi;

        return new TelegramBotApi();
    });


    this.__defineGetter__('handlers', function () {
        function handlers(handlers) {
            var pattern;

            for (pattern in handlers) {
                if (typeof handlers[pattern] != 'function') {
                    throw new Error('Handler \'' + pattern + '\' must be a function');
                }
                TelegramBotHandlers[pattern] = handlers[pattern];
            }
        }

        return handlers;
    });

    this.__defineGetter__('match', function () {
        function match(subject) {
            var pattern, matchPattern, matches, re, i, l,
                argsArray = [],
                isRegExp = new RegExp('^\/(.*)\/([gmixXsuUAJ]*)$'),
                thisArg = {
                    subject: subject,
                    api: this.api
                };

            for (i = 1, l = arguments.length; i < l; i++) {
                argsArray.push(arguments[i]);
            }

            for (pattern in TelegramBotHandlers) {
                if (isRegExp.test(pattern)) {
                    matchPattern = pattern.match(isRegExp);

                    re = new RegExp(matchPattern[1], matchPattern[2]);
                } else {
                    re = new RegExp(pattern);
                }

                matches = subject.match(re);
                if (matches) {
                    thisArg.pattern = pattern;
                    thisArg.matches = matches;
                    return TelegramBotHandlers[pattern].apply(thisArg, argsArray);
                }
            }

            return TelegramBotApiDefaultHandler.apply(thisArg, argsArray);
        }

        return match;
    });
};


Router.route('webhook', {
    path: '/' + TelegramBot.getConst('API_REQUEST_URL'),
    where: 'server',
    action: function () {
        var request, message, text;

        request = this.request;
        message = request.body.message;
        text = message.text;
        console.log(text);

        TelegramBot.match(text, message);

        this.response.writeHead(200, {'Content-Type': 'application/json'});
        this.response.end(JSON.stringify(this.request.query));
    }
});