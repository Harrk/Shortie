<template>
    <button
        class="btn btn-primary"
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
