<template>
    <button
        class="btn btn-secondary"
        :type="submit ? 'submit' : 'button'"
    >
        <slot />
    </button>
</template>

<script setup>
    const props = defineProps([
        'submit',
    ]);
</script>
