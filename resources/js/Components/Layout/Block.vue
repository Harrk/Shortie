<template>
    <div class="bg-base-100 p-3 md:p-4 rounded-box">
        <h2
            v-if="title"
            class="font-semibold text-lg pb-0 mb-0"
        >
            {{ title }}
        </h2>

        <slot />
    </div>
</template>


<script setup>
    const props = defineProps({
        'title': {
            required: false,
            type: String,
        }
    })
</script>
