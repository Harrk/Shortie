<template>
    <div class="flex flex-col space-y-1">
        <label
            v-if="label"
            class="label"
            :for="inputId"
        >
            {{ label }}
        </label>

        <select
            class="select"
            :class="{ 'select-sm': size === 'sm' }"
            :disabled="disabled"
            :required="required"
            :value="modelValue"
            :id="inputId"
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
            class="text-red-500 text-sm"
        >
            {{ error }}
        </p>

        <p
            v-if="help"
            class="text-sm"
        >
            {{ help }}
        </p>
    </div>
</template>

<script setup>
    import { useId } from "vue";

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

    const inputId = useId();

    defineEmits(['update:modelValue']);
</script>
