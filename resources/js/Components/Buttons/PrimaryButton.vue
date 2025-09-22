<template>
    <button
        class="btn btn-primary"
        :type="submit ? 'submit' : 'button'"
        :form="form"
        :disabled="disabled"
    >
        <slot />
    </button>
</template>

<script setup>
    const props = defineProps([
        'submit',
        'form',
        'disabled',
    ]);
</script>
