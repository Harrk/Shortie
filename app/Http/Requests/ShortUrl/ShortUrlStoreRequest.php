<?php

namespace App\Http\Requests\ShortUrl;

use App\Models\Domain;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ShortUrlStoreRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        $this->merge([
            'slug' => $this->has('slug') ? $this->input('slug') : Str::random(6),
            // Todo: Set a default domain rather than grabbing the first one?
            'domain_id' => $this->has('domain_id') ? $this->input('domain_id') : Domain::oldest()->value('id'),
        ]);
    }

    public function rules(): array
    {
        return [
            'domain_id' => [
                'required',
                'exists:domains,id',
            ],
            'slug' => [
                'required',
                'string',
                'alpha_num:ascii',
                Rule::unique('short_urls')
                    ->ignore($this->input('id'))
                    ->where('domain_id', $this->input('domain_id'))
                    ->where('slug', $this->input('slug')),
            ],
            'url' => 'required|url',
            'max_visits' => 'nullable|int|min:0',
            'rules' => 'nullable|array',
            'rules.*.key' => 'required|in:country',
            'rules.*.operator' => 'required|in:=',
            'rules.*.value' => 'required|string',
            'rules.*.url' => 'required|url',
        ];
    }

    public function messages()
    {
        return [
            'slug.unique' => 'This slug is already in use by another Short URL.',
            'rules.*.key.required' => 'A condition key is required.',
            'rules.*.operator.required' => 'An operator is required.',
            'rules.*.value.required' => 'A value is required.',
            'rules.*.url.required' => 'A url is required.',
            'rules.*.url.url' => 'A valid url is required.',
        ];
    }
}
