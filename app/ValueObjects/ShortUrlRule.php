<?php

namespace App\ValueObjects;

class ShortUrlRule
{
    public string $condition;
    public string $operator;
    public string $value;
}
