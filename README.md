meteor-telegram-bot-api
=======================
API service for Telegram's bots (https://core.telegram.org/bots)

* [English](#english)
    * [Installing](#installing)
    * [Setting](#setting)
* [Русский](#Русский)
    * [Установка](#Установка)
    * [Настройка](#Настройка)
    * [Использование](#Использование)

# English

1. [Installing](#installing)
2. [Setting](#setting)

#### Installing
Add the package to your project using meteorite:
```bash
$ meteor add finagin:telegram-bot-api
```

#### Setting
Setup Telegram Bot access token
```js
if (Meteor.isServer) {
    Meteor.startup(function () {
        ServiceConfiguration.configurations.upsert(
            {service: TelegramBotApi.SEVRICE_NAME},
            {$set: {token: 'Your access token'}}
        );
    });
}
```
If service ```telegram``` already exists you can use custom service name:
```js
if (Meteor.isServer) {
    Meteor.startup(function () {

        // Setup custom service name
        TelegramBotApi.SEVRICE_NAME = 'customServiceName';

        ServiceConfiguration.configurations.upsert(
            {service: TelegramBotApi.SEVRICE_NAME},
            {$set: {token: 'Your access token'}}
        );
    });
}
```

# Русский

1. [Установка](#Установка)
2. [Настройка](#Настройка)
3. [Использование](#Использование)

#### Установка
Добавьте пакет а проект используя команду meteorite:
```bash
$ meteor add finagin:telegram-bot-api
```

#### Настройка
Укажите access token бота на серверной стороне
```js
if (Meteor.isServer) {
    Meteor.startup(function () {
        ServiceConfiguration.configurations.upsert(
            {service: TelegramBotApi.SEVRICE_NAME},
            {$set: {token: 'Your access token'}}
        );
    });
}
```
Если у Вас уже есть сервис с именем ```telegram``` и он Вам нужен, можете задать другое перед сохранением token'а
```js
if (Meteor.isServer) {
    Meteor.startup(function () {

        // замена стандартного имени сервиса
        TelegramBotApi.SEVRICE_NAME = 'customServiceName';


        ServiceConfiguration.configurations.upsert(
            {service: TelegramBotApi.SEVRICE_NAME},
            {$set: {token: 'Your access token'}}
        );
    });
}
```

#### Использование