<template>
    <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
            <div
                v-if="title"
                class="card-title"
            >
                {{ title }}
            </div>

            <slot />
        </div>
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
