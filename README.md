## Дизайн

[![Figma Design](https://badgen.net/badge/Figma/Design/FF7262)](<https://www.figma.com/design/ukplBDMNzVFXsVMjYUpKUq/Minesweeper-%E2%80%94-Interactive-Components-Demo-(Community)-(Copy)?node-id=1-63&t=L45VPRQdQyeT9xZk-1>)

Дизайн проекта разработан в
Figma: [открыть проект](<https://www.figma.com/design/ukplBDMNzVFXsVMjYUpKUq/Minesweeper-%E2%80%94-Interactive-Components-Demo-(Community)-(Copy)?node-id=1-63&t=L45VPRQdQyeT9xZk-1>)

<details>
  <summary>Страницы проекта</summary>

- **Авторизация**  
  Вход в систему через логин и пароль

- **Регистрация**  
  Создание нового аккаунта

- **Главная страница**  
  Основная навигация и информация о проекте

- **Профиль пользователя**  
  Личная информация и настройки аккаунта

- **Лидерборд**  
  Рейтинг игроков и их достижения

- **Страница с ошибкой**  
  Уведомления об ошибках и проблемах

- **Страница игры**  
  Основной игровой интерфейс

- **Форум**  
  Обсуждения и темы сообщества

- **Создание топика на форуме**  
  Форма для создания новых обсуждений

- **Страница с топиком**  
  Страница с топиком и комментариями к нему
</details>

## Проект

### Видео с демонстрацией работоспособности проекта

- [Демо задач 5-6 спринтов](https://disk.yandex.ru/i/gpekWPn5ttRukQ)
- [Демо задач 7-8 спринтов](https://disk.yandex.ru/i/Bmk4SXcfxSDy4w)

### Как запускать?

Перед запуском: Создайте `.env` файл в корне проекта из сампла `.env.sample` (команда `cp .env.sample .env`).

Сервисы будут подниматься на портах, указанных в `.env` файле.
При выкладке проекта на VPS для Nginx важно чтобы `client` был на **5000** порту, и `server` на **5001**.

**Перед выпуском в production обязательно заполните файл данными для продакшена, как минимум замените секреты и ключи для базы данных!**

<details>
  <summary>Запуск в IDE (для разработки и тестов)</summary>

1. Убедитесь что у вас установлены `node`, `docker` и `docker` запущен
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev` чтобы запустить весь проект
4. Выполните команду `yarn dev:client` чтобы запустить только клиент
5. Выполните команду `yarn dev:server` чтобы запустить только server

При запуске режима разработки (`yarn dev`) или отдельно сервера (`yarn dev:server`) также запустятся база
данных `postgres` и `pgadmin` в Docker контейнерах

Данные для входа в pgadmin вы указывали в `.env` файле, в поле Host name/address нужно будет указать `postgres`
</details>

<details>
  <summary>Запуск в Docker (production сборка)</summary>

### Развертывание на VPS

1. Убедитесь что у вас установлен и запущен `Docker`
2. Выполните команду `yarn build:docker` чтобы собрать образы
3. Получите сертификаты с помощью [Certbot](https://certbot.eff.org/instructions). Они должны находиться в `/etc/letsencrypt/live`.
4. Выполните команду `docker compose up -d` чтобы запустить все контейнеры

**Запустятся 4 сервиса:**

- SSR-сервер
- Backend-сервер
- Nginx
- postgres
- pgadmin

Данные для входа в pgadmin вы указывали в `.env` файле, в поле Host name/address нужно будет указать `postgres`

### Запуск без Nginx

Вы также можете запустить проект без Nginx с помощью команды `yarn preview:docker`.
В этом случае вам не понадобятся сертификаты, и сервисы будут крутиться на портах, указанных в `.env` файле.

</details>

Если вам понадобится запустить только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up client`

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот
