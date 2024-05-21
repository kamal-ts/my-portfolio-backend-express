# Plot Setup 

  Here are the dependencies I use
  - npm i zod
  - npm i nest-winston
  - npm install bcrypt
  - npm install --save-dev @types/bcrypt
  - npm install uuid
  - npm install --save-dev @types/uuid
  - npm install @nestjs/config

## Prisma

### Install Prisma

```bash
$ npm install prisma --save-dev
```
### Setup Prisma

Ater database was made, we have to initialize prisma :
```bash
$ npx prisma init
```

### Migration

```bash
$ npx prisma migrate dev
```

### Generate Prisma Client

```bash
$ npx prisma generate
```

