# Contributing
If you wish to contribute to the project, please read the following document.

## Testing
Unit tests can be run via either command:
```bash
$ php artisan test
$ composer test
```

Shortie's unit tests are written using [Pest](https://pestphp.com/).
This should mostly be familiar if you have used PHPUnit before.

Every new feature will expect unit tests to pass in addition to having additional
tests alongside.

## Formatting
Laravel Pint is used to keep the code formatting consistent.
To run:
```
$ ./vendor/bin/pint
```
