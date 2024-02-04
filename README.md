# Shortie.
![img.webp](img.webp)

Shortie is a project I created for managing short URLs and tracking.
Created with Laravel, Vue, and Inertia.

## Features
* Manage your Short URLs, either company-wide or per user.
* Short URL Analytics
* User management with configuration around allowing new users / default roles.
* Domain management for self-managed domains.

## Requirements
* PHP 8.2
* MySQL (Postgre may be OK)
* Node v18 (for building assets)

## Installation
First download the project to where you intend to host it from.

via HTTPS:
```bash
$ git clone https://github.com/Harrk/Shortie.git
```

or via SSH:
```
$ git clone git@github.com:Harrk/Shortie.git
```

Install dependencies.
```bash
$ composer install --no-dev
```

Configure your `.env` file with your database credentials.
```bash
$ php artisan migrate
```

Build assets
```bash
$ yarn && yarn build
```

Create yourself an admin user.
```bash
$ php artisan app:create-admin
```

Navigate to the location you're hosting the project from to verify it's all set up.

## Setting Up
Before creating a short URL, you must set up a domain. You will need to do
this even if you only intend to use a single domain.

![img-setup.png](img-setup.png)

## Contributing
Please review the CONTRIBUTING.md document before making any contributions
to the project.
