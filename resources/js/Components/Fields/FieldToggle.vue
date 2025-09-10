<template>
    <div class="flex flex-col space-y-1">
        <div class="flex space-x-2">
            <input
                :id="inputId"
                type="checkbox"
                class="toggle toggle-primary"
                :checked="modelValue"
                @input="emit('update:modelValue', $event.target.checked)"
            />

            <label
                v-if="label"
                class="label cursor-pointer"
                :for="inputId"
            >
                {{ label }}
            </label>
        </div>

        <p
            v-if="error"
            class="text-red-500 text-sm"
        >
            {{ error }}
        </p>

        <p class="text-sm max-w-sm">
            <slot name="help">
                {{ help }}
            </slot>
        </p>
    </div>
</template>

<script setup>
    import { useId } from "vue";

    const props = defineProps([
        'label',
        'placeholder',
        'disabled',
        'error',
        'modelValue',
        'type',
        'required',
        'form',
        'help',
    ]);

    const inputId = useId();

    const emit = defineEmits(['update:modelValue']);
</script>
