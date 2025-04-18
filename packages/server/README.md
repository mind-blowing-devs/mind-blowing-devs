# Документация Minesweeper API

## 1. Стек технологий

Для разработки API был использован следующий стек:

- **Node.js** — серверная платформа для запуска JavaScript;
- **Express** — фреймворк для разработки веб-приложений на Node.js;
- **Sequelize** — ORM для взаимодействия с базой данных (PostgreSQL);
- **Zod** — схема валидации данных для входящих запросов;
- **XSS** — библиотека для защиты от XSS атак.

## 2. Архитектура API

### Общее описание

API имеет слоистую архитектуру, которая разделяет бизнес-логику, обработку запросов и работу с базой данных.

### Слои API

1. **Controllers**

   - Отвечают за обработку HTTP-запросов;
   - Извлекают данные из запросов, передают их в сервисы и отправляют ответ обратно клиенту.

2. **Services**

   - Содержат основную бизнес-логику и обрабатывают запросы, поступающие от контроллеров;
   - Взаимодействуют с моделями и выполняют операции, такие как создание, обновление или удаление сущностей.

3. **Models**

   - Представляют собой структуру таблиц базы данных и реализуют связь между различными сущностями;
   - Отвечают за определение полей и ограничений, а также поддерживают методы для взаимодействия с базой данных.

4. **Middleware**
   - Отвечают за выполнение промежуточных операций, таких как валидация входящих данных;
   - Валидация данных происходит с использованием библиотек **Zod** и **xss**. Это гарантирует, что данные, отправляемые клиентом, соответствуют ожидаемому формату, а так же предотвращает XSS атаки.

## 3. Ручки API

Базозвый URL:

```
http://localhost:3001/api
```

### 3.1. Topic API

#### 3.1.1. Создать топик

- **URL:** `/topics`
- **Метод:** `POST`

**Тело запроса:**

```json
{
  "title": "string",
  "author": "string",
  "description": "string",
  "category": "string" // optional, default = 'General'
}
```

**Ответ:** `201 Created`

Возвращает созданный топик:

```json
{
  "id": "string", // uuid
  "title": "string",
  "author": "string",
  "description": "string",
  "category": "string",
  "createdAt": "string"
}
```

#### 3.1.2. Получить список топиков

- **URL:** `/topics`
- **Метод:** `GET`
- **Параметры (query):**
  - `page` (optional, default: 1) — номер страницы для пагинации;
  - `limit` (optional, default: 10) — количество топиков на одной странице;

**Ответ:** `200 OK`

Возвращает список топиков отсортированных по названиям и данные для постраничной пагинации:

```json
{
  "topics": [
    {
      "id": "string", // uuid
      "title": "string",
      "description": "string",
      "category": "string",
      "author": "string",
      "commentCount": "number",
      "lastCommentAt": "string | null",
      "createdAt": "string" // UTC
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
```

#### 3.1.3. Получить топик по ID

- **URL:** `/topics/{topicId}`
- **Метод:** `GET`

**Ответ:** `200 OK`

Возвращает топик и последние 10 комментариев:

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "author": "string",
  "commentCount": "number",
  "lastCommentAt": "string | null",
  "createdAt": "string",
  "comments": []
}
```

#### 3.1.4. Обновить топик

- **URL:** `/topics/{topicId}`
- **Метод:** `PUT`

**Тело запроса:**

```json
{
  "title": "string", // optional
  "author": "string", // optional
  "description": "string", // optional
  "category": "string" // optional
}
```

**Ответ:** `200 OK`

Возвращает обновленный топик:

```json
{
  "id": "string", // uuid
  "title": "string",
  "author": "string",
  "description": "string",
  "category": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### 3.1.5. Удалить топик

- **URL:** `/topics/{topicId}`
- **Метод:** `DELETE`

**Ответ:** `204 No Content`

### 3.2. Comment API

#### 3.2.1.

- **URL:** `/comments`
- **Метод:** `POST`

**Тело запроса:**

```json
{
  "topicId": "string", // uuid
  "body": "string",
  "author": "string"
}
```

**Ответ:** `201 Created`

Возвращает созданный комментарий:

```json
{
  "id": "string", // uuid
  "repliesCount": "number",
  "topicId": "string", // uuid
  "author": "string",
  "body": "string",
  "createdAt": "string"
}
```

#### 3.2.2. Получить список комментариев

- **URL:** `/comments`
- **Метод:** `GET`
- **Параметры (query):**
  - `topicId` — id темы;
  - `offset` (default = 0) — индекс для среза списка;
  - `limit` (default = 10) — размер списка.

**Ответ:** `200 OK`

Возвращает список комментариев отсортированных по времени создания:

```json
[
  {
    "id": "string",
    "topicId": "string",
    "body": "string",
    "author": "string",
    "repliesCount": "number",
    "createdAt": "2025-04-18T10:31:14.776Z"
  },
  {
    "id": "string",
    "topicId": "string",
    "body": "string",
    "author": "string",
    "repliesCount": "number",
    "createdAt": "2025-04-18T10:20:20.728Z"
  }
]
```

#### 3.2.2. Удалить комментарий

- **URL:** `/comments/{commentId}`
- **Метод:** `DELETE`

**Ответ:** `204 No Content`

### 3.3. Reply API

#### 3.3.1. Создать ответ на комментарий

- **URL:** `/replies`
- **Метод:** `POST`

**Тело запроса:**

```json
{
  "commentId": "string",
  "author": "string",
  "body": "string"
}
```

**Ответ:** `201 Created`

Возвращает созданный ответ:

```json
{
  "id": "string",
  "repliesCount": "number",
  "commentId": "string",
  "parentReplyId": null,
  "author": "string",
  "body": "string",
  "createdAt": "string"
}
```

#### 3.3.2. Создать ответ на ответ

Модель **Reply** поддерживает возможность создавать ответы на ответы. Для создания связи необходимо передать `id` родительского ответа:

```json
{
  "parentReplyId": "string",
  "author": "string",
  "body": "string"
}
```

**Ответ:** `201 Created`

Возвращает созданный ответ:

```json
{
  "id": "string",
  "repliesCount": "number",
  "commentId": null,
  "parentReplyId": "string",
  "author": "string",
  "body": "string",
  "createdAt": "string"
}
```

#### 3.2.3. Получить список ответов

- **URL:** `/replies`
- **Метод:** `GET`
- **Параметры (query):**
  - `commentId` — id комментария || `parentReplyId` — id ответа;
  - `offset` (default = 0) — индекс для среза списка ответов;
  - `limit` (default = 10) — размер списка.

**Ответ:** `200 OK`

Возвращает список ответов отсортированных по времени создания.

### 3.3.4. Удалить ответ

- **URL:** `/replies/{replyId}`
- **Метод:** `DELETE`

**Ответ:** `204 No Content`

## 4. Ошибки

Ошибки присылаются с указание причины:

```json
{
  "reason": "string"
}
```

## 5. Модели сущностей

### 5.1. Topic

- **id** (UUID): Уникальный идентификатор топика;
- **title** (string): Название топика;
- **description** (string): Описание топика;
- **author** (string): Автор топика;
- **category** (string): Категория топика;
- **createdAt** (Date): Дата создания;
- **updatedAt** (Date): Дата последнего обновления.

### 5.2. Comment

- **id** (UUID): Уникальный идентификатор комментария;
- **topicId** (UUID): ID темы, к которой относится комментарий;
- **body** (string): Текст комментария;
- **author** (string): Автор комментария;
- **createdAt** (Date): Дата создания;
- **updatedAt** (Date): Дата последнего обновления.

### 5.3. Reply

- **id** (UUID): Уникальный идентификатор ответа;
- **commentId** (UUID, nullable): ID комментария, к которому относится ответ;
- **parentReplyId** (UUID, nullable): ID родительского ответа, если это вложенный ответ;
- **body** (string): Текст ответа;
- **author** (string): Автор ответа;
- **createdAt** (Date): Дата создания ответа;
- **updatedAt** (Date): Дата последнего обновления.
