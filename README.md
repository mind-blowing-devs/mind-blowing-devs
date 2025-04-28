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

**Перед выпуском в production обязательно заполните файл данными для продакшена, как минимум замените секреты и ключи для базы данных!**

<details>
  <summary>Запуск в IDE (для разработки и тестов)</summary>

1. Убедитесь что у вас установлены `node`, `docker` и `docker` запущен
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev` чтобы запустить весь проект
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

При запуске режима разработки (`yarn dev`) или отдельно сервера (`yarn dev --scope=server`) также запустятся база
данных `postgres` и `pgadmin` в Docker контейнерах

Данные для входа в pgadmin вы указывали в `.env` файле, в поле Host name/address нужно будет указать `postgres`
</details>

<details>
  <summary>Запуск в Docker (production сборка)</summary>

1. Убедитесь что у вас установлен и запущен `Docker`
2. Выполните команду `yarn build:docker` чтобы собрать образы
3. Выполните команду `yarn preview:docker` чтобы запустить все контейнеры

**Запустятся 4 сервиса:**

- SSR-сервер
- Backend-сервер
- postgres
- pgadmin

Данные для входа в pgadmin вы указывали в `.env` файле, в поле Host name/address нужно будет указать `postgres`
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
