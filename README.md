# Task modsen project

## Deploy

The project is available at: [Click me]https://modsen-task-production.up.railway.app/

# Useful scripts

## Deploy

```sh
npm run build
```

```sh
npm run start
```

## Development

```sh
npm run server:watch
```

```sh
npm run dev
```

# Project structure

Use nest structure

```
src
├── authentication
├── common
│ ├── constants
│ ├── decorators
│ │ ├── metadata
│ │ └── requests
│ ├── exceptions
│ ├── guards
│ ├── helpers
│ │ ├── exceptions
│ │ └── responses
│ ├── interfaces
│ ├── middlewares
│ │ └── models
│ ├── pipes
│ ├── serializers
│ │ ├── exceptions
│ │ └── responses
│ └── validations
├── config
│ ├── api
│ ├── app
│ ├── cache
│ ├── database
│ │ └── postgres
│ ├── queue
│ ├── session
│ └── storage
├── database
│ ├── factories
│ │ ├── addresses
│ │ └── users
│ ├── migrations
│ └── seeders
│ ├── addresses
│ └── users
├── jobs
│ ├── consumers
│ │ └── verification-mail
│ └── producers
│ └── verification-mail
├── mails
│ └── verification
├── modules
│ ├── addresses
│ │ ├── constants
│ │ ├── entities
│ │ ├── interfaces
│ │ └── serializers
│ └── users
│ ├── constants
│ ├── entities
│ ├── interfaces
│ └── serializers
├── infra
| ├── cache
│ │ └── redis
│ ├── database
│ │ └── postgres
│ └── queue
│ └── redis
├── app.ts
└── server.ts
```
