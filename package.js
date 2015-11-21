Package.describe({
    name: 'finagin:telegram-bot-api',
    version: '0.0.1',
    summary: 'API service for Telegram\'s bots (https://core.telegram.org/bots)',
    git: 'https://github.com/finagin/meteor-telegram-bot-api.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use(
        [
            'ecmascript',
            'http',
            'service-configuration'
        ],
        ['server']
    );
    api.imply(
        [
            'service-configuration'
        ],
        ['server']
    );

    api.export('TelegramBotApi');

    api.addFiles(['telegram-bot-api.js'], ['server']);

});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('finagin:telegram-bot-api');
    api.addFiles('telegram-bot-api-tests.js');
});
