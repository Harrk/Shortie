<template>
    <div>
        <label
            v-if="label"
            class="label"
        >
            {{ label }}
        </label>

        <input
            :placeholder="placeholder"
            :disabled="disabled"
            class="input input-bordered w-full max-w-lg"
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
    ]);

    defineEmits(['update:modelValue']);
</script>
