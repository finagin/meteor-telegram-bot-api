Package.describe({
    name: 'finagin:telegram-bot-api',
    version: '0.0.2_2',
    summary: 'API service for Telegram\'s bots (https://core.telegram.org/bots)',
    git: 'https://github.com/finagin/meteor-telegram-bot-api.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use(
        [
            'http@1.1.1',                   //  Make HTTP calls to remote servers
            'check@1.1.0',                  //  Check whether a value matches a pattern
            'random@1.0.5',                 //  Random number generator and utilities
            'ecmascript@0.1.6',             //  Compiler plugin that supports ES2015+ in all .js files
            'iron:router@0.9.1',            //  Routing specifically designed for Meteor
            'service-configuration@1.0.5'   //  Manage the configuration for third-party services
        ],
        ['server']
    );
    api.imply(
        [
            'service-configuration'
        ],
        ['server']
    );

    api.export('TelegramBot', 'server');

    api.addFiles([
        'telegram-bot-api.js'
    ], 'server');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('finagin:telegram-bot-api');
    api.addFiles('telegram-bot-api-tests.js');
});
