<?php

namespace App\Http\Requests\Domain;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;

class DomainStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'url' => [
                'required',
                'url:http,https',
                Rule::unique('domains')
                    ->ignore($this->input('id'))
                    ->where('url', $this->input('url')),
            ],
        ];
    }

    protected function prepareForValidation()
    {
        // Clean up the domain URL before validation and saving.
        if ($this->input('url')) {
            $parsedUrl = parse_url($this->input('url'));
            $scheme = Arr::get($parsedUrl, 'scheme');
            $host = Arr::get($parsedUrl, 'host');
            $port = Arr::get($parsedUrl, 'port') ? ':'.Arr::get($parsedUrl, 'port') : null;

            $this->merge([
                'url' => $scheme.'://'.$host.$port,
            ]);
        }
    }
}
