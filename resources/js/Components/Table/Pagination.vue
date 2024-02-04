<template>
    <div
        v-if="links"
        class="mt-5 flex flex-row-reverse"
    >
        <div class="join">
            <template
                v-for="(link, index) in links"
                :key="index"
            >
                <Link
                    v-if="link.url"
                    :href="link.url"
                    class="btn"
                    :class="{ 'btn-active': link.active, 'join-item': links.length > 3 }"
                >
                    <span v-html="link.label"></span>
                </Link>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { Link } from "@inertiajs/vue3";

    const props = defineProps([
        'links',
    ]);
</script>
