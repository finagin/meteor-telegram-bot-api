/**
 * TelegramBotApi
 *
 * @name TelegramBotApi
 * @this TelegramBotApi
 */
TelegramBotApi = (function TelegramBotApi() {
    if (this === root) {
        return new TelegramBotApi();
    }

    /**
     * Authorization token
     *
     * @name TOKEN
     * @type string
     * @private
     * @readonly
     *
     * @see https://core.telegram.org/bots#botfather BotFather
     * @see https://core.telegram.org/bots/api#authorizing-your-bot Authorizing your bot
     * @see https://core.telegram.org/bots/api#making-requests Making requests
     */
    var TOKEN = ServiceConfiguration.configurations.findOne({service: 'telegram'}).token;

    this.__defineGetter__('url', function () {
        /**
         * Request URL
         *
         * @name TelegramBotApi.url
         * @type string
         * @this TelegramBotApi
         * @public
         * @readonly
         *
         * @see https://core.telegram.org/bots/api#making-requests Making requests
         */
        var url = 'https://api.telegram.org/bot' + TOKEN + '1/';

        return url;
    });

    this.__defineGetter__('method', function () {
        /**
         * One of Telegram API methods
         * <a href="https://core.telegram.org/bots/api#available-methods">Available methods</a>:
         * • <a href="https://core.telegram.org/bots/api#getme">getMe</a>
         * • sendMessage
         * • forwardMessage
         * • sendPhoto
         * • sendAudio
         * • sendDocument
         * • sendSticker
         * • sendVideo
         * • sendVoice
         * • sendLocation
         * • sendChatAction
         * • getUserProfilePhotos
         * • getUpdates
         * • setWebhook
         * • getFile
         *
         * @name TelegramBotApi.method
         * @type function
         * @this TelegramBotApi
         * @public
         *
         * @param {string} methodName - Telegram API method
         * @param {object} [parmas]
         * @param {callbackFunction} [callback=function(){console.log(arguments);}] - callback function
         *
         * @throws ReferenceError
         *
         * @see https://core.telegram.org/bots/api#making-requests
         */
        function method(methodName, parmas, callback) {
            if (!methodName || typeof methodName != 'string') {
                throw ReferenceError('methodName is not define');
            }

            var _params = (parmas && typeof params == 'object' ? params : {}),
                _callback;

            if (callback && typeof callback == 'function') {
                _callback = callback;
            } else if (parmas && typeof params == 'function') {
                _callback = params;
            } else {
                _callback = function (x) {
                    console.log(arguments);
                    console.log(JSON.stringify(x));
                };
            }

            HTTP.call(
                'POST'
                , this.url + methodName
                , {
                    params: _params
                }
                , _callback
            );
        }

        return method;
    });



    this.__defineGetter__('getMe', function () {
        /**
         * A simple method for testing your bot's auth token. Requires no parameters. Returns basic information about the bot in form of a {@link User} object.
         *
         * Uses: {@link TelegramBotApi.method}
         *
         * @name TelegramBotApi.getMe
         * @type function
         *
         * @param {callbackFunction} [callback]
         *
         * @see https://core.telegram.org/bots/api#getme
         */
        function getMe(callback) {
            this.method('getMe', callback);
        }

        return getMe;
    });


    /**
     * Callback function
     *
     * @name callbackFunction
     * @type function
     *
     * @param {object} error
     * @param {object} error.response
     * @param {boolean} error.response.data.ok
     * @param {number} error.response.data.error_code
     * @param {object} error.response.data.description
     * @param {object} response
     * @param {object} response.data
     * @param {boolean} response.data.ok
     * @param {object} response.data.result
     */
    function callbackFunction(error, response){}

    /**
     * User
     *
     * @name User
     * @description This object represents a Telegram user or bot.
     * @type object
     *
     * @property {number} id - Unique identifier for this user or bot
     * @property {string} first_name - User‘s or bot’s first name
     * @property {string} last_name - Optional. User‘s or bot’s last name
     * @property {string} username - Optional. User‘s or bot’s username
     *
     * @see https://core.telegram.org/bots/api#user
     */
})();