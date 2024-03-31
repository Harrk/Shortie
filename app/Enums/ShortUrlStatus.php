<?php

namespace App\Enums;

enum ShortUrlStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}
