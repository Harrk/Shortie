<template>
    <div>
        <label
            v-if="label"
            class="label"
        >
            {{ label }}
        </label>

        <select
            class="select select-bordered max-w-lg w-full"
            :class="{ 'select-sm': size === 'sm' }"
            :disabled="disabled"
            :required="required"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
            <option
                :disabled="! allowAny"
                value=""
            >
                {{ anyLabel || 'Select a value' }}
            </option>

            <option
                v-for="(value, key) in options"
                :key="key"
                :value="Array.isArray(options) ? value : key"
            >
                {{ optionLabel === 'key' ? key : value }}
            </option>
        </select>

        <p
            v-if="error"
            class="text-red-500 text-sm mt-1"
        >
            {{ error }}
        </p>

        <p
            v-if="help"
            class="mt-2 pl-1 text-xs text-base-content/80"
        >
            {{ help }}
        </p>
    </div>
</template>

<script setup>
    const props = defineProps([
        'allowAny',
        'anyLabel',
        'label',
        'options',
        'disabled',
        'error',
        'modelValue',
        'required',
        'size',
        'help',
        'optionLabel',
    ]);

    defineEmits(['update:modelValue']);
</script>
