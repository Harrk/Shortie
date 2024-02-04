<?php

namespace App\Http\Requests\ShortUrl;

class ShortUrlUpdateRequest extends ShortUrlStoreRequest
{
    protected function prepareForValidation()
    {
        // Don't allow defaults on update.
    }
}
