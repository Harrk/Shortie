<template>
    <div class="flex flex-col space-y-1">
        <label
            v-if="label"
            class="label"
            :for="inputId"
        >
            <span>
                {{ label }}

                <span
                    v-if="required"
                    class=" text-red-500 text-sm"
                >
                    *
                </span>
            </span>
        </label>

        <input
            :id="inputId"
            :placeholder="placeholder"
            :disabled="disabled"
            class="input"
            :form="form"
            :value="modelValue"
            :required="required"
            :type="type ? type : 'text'"
            @input="$emit('update:modelValue', $event.target.value)"
        />

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
        'label',
        'placeholder',
        'disabled',
        'error',
        'modelValue',
        'type',
        'required',
        'help',
        'form',
    ]);

    const inputId = useId();

    defineEmits(['update:modelValue']);
</script>
