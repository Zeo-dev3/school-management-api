<center>

![WhatsApp_Image_2024-05-11_at_3 46 05_PM-removebg-preview (1)](https://github.com/Zeo-dev3/school-management-api/assets/152672843/d3b3867c-fcd1-493d-8da1-b8a331e17a8f)

</center>

# NestJS School Management API

This repository contains the source code for a NestJS-based API application designed to facilitate school management. The current functionality includes a REST API for managing the school canteen. Future development plans include adding features such as subject management, exams, and more to meet the comprehensive needs of a school application.

## Features

- REST API For managing the school canteen
- REST API Subject management
- REST API Authentication & authorization
- [Future] Exams management
- [Future] Additional features for comprehensive school management

## Installation

1. Clone the repository:

```bash
$ git clone https://github.com/Zeo-dev3/school-management-api.git
```

2. Install dependencies:

```bash
$ cd nestjs-school-management-api
$ npm install
```

3. Start database:

```bash
$ docker-compose up
```

4. Setup .env files

   Create a .env file for the database and add your database URL and secret key for jwt token.

```
DATABASE_URL="your postgres url"
JWT_SECRET_TOKEN="your secret key"
REDIS_HOST="your redis host"
REDIS_PORT=your redis port
```

If you're using docker-compose, create a .env file in the root directory of your project and add the following configuration:

```
DATABASE_URL="postgresql://sekolah:jahat@localhost:5435/mydb"
JWT_SECRET_TOKEN="your secret key"
REDIS_HOST="0.0.0.0"
REDIS_PORT=6379
```

Deployment env

```
DATABASE_URL="postgres://postgres.ubrzvwduvdoqtbikjmij:ogiwara sayu@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
JWT_SECRET_TOKEN="your secret key"
```

5. Migrate the database

```bash
$ npx prisma migrate dev
```

6. Start the server:

```bash
$ npm run start
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/yourfeature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/yourfeature`)
6. Create a new Pull Request
