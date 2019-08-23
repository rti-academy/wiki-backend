# Wiki backend

## Необходимое ПО

- node 10.x
- npm 6.x
- pm2 3.x
- postgres >= 10.3
- psql >= 10.3

## Настройка

### Создание DB

```
psql -d postgres -c "CREATE ROLE wiki WITH LOGIN ENCRYPTED PASSWORD '123qwe';"
psql -c "create database wiki owner wiki encoding 'UTF8' lc_collate 'ru_RU.UTF-8'LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```

### Установка зависимостей

```
npm install
```

### Накатывание миграций

```
npm run typeorm:cli -- migration:run
```

## Разработка

### Запуск сервера в режиме разработки

```
npm run serve
```

## Деплой

- Установить зависимости
- Накатить миграции
- Собрать проект
- Удалить лишние зависимости (опционально)
- Запустить проект
- Настроить скрипт автозапуска

### Сборка

```
npm run build
```

### Удаление лишних зависимостей

```
npm prune --production
```

### Запуск

```
pm2 start environment/pm2/qa.config.js
```

### Автозапуск

Для того, чтобы pm2 автоматически запускал приложение при перезапуске сервера нужно сначала зафиксировать список приложений коммандой `pm2 save`, а затем запустить комманду `pm2 startup` и следовать ее инструкциям

### Конфигурация pm2

Образец конфига pm2 лежит в директории `environment/pm2/`. Подробнее можно узнать [здесь](http://pm2.keymetrics.io/docs/usage/application-declaration/)

## Документация API

Документация собирается командой `npm run apidoc`. Результат появляется в директории `public/`
