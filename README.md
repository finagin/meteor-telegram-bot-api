meteor-telegram-bot-api
=======================
API service for Telegram's bots (https://core.telegram.org/bots)

Usage
-----

1. Add the package to your project using meteorite:
```bash
$ meteor add finagin:telegram-bot-api
```
2. Manual setting
```js
if (Meteor.isServer) {
    ServiceConfiguration.configurations.remove({
        service: 'telegram'
    });

    ServiceConfiguration.configurations.insert({
        service: 'telegram',
        token:   '1234567:h238f03f8h038fh0wh'   // access token
    });
}
```