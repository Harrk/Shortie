<?php

namespace App\Http\Requests\Domain;

use App\Rules\Domain;
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
            ],
            'domain' => [
                new Domain,
                Rule::unique('domains')
                    ->ignore($this->input('id'))
                    ->where('domain', $this->input('domain')),
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

            $this->merge([
                'url' => $scheme.'://'.$host,
                'domain' => $host,
            ]);
        }
    }
}
