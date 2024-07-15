<template>
    <div class="max-w-lg">
        <label
            v-if="label"
            class="label"
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
            :placeholder="placeholder"
            :disabled="disabled"
            class="input input-bordered w-full placeholder-base-content/50"
            :form="form"
            :value="modelValue"
            :required="required"
            :type="type ? type : 'text'"
            @input="$emit('update:modelValue', $event.target.value)"
        />

        <p
            v-if="error"
            class="text-red-500 text-sm mt-1"
        >
            {{ error }}
        </p>

        <p
            v-if="help"
            class="text-base-content text-sm mt-1"
        >
            {{ help }}
        </p>
    </div>
</template>

<script setup>
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

    defineEmits(['update:modelValue']);
</script>
