<template>
    <Link
        v-if="navLink.route"
        :href="navLink.route"
        :class="{
            'menu-active' : navLink.routePattern ? route().current(navLink.routePattern) : false,
            'text-base': mobile,
        }"
        :method="navLink.method ? navLink.method : 'get'"
    >
        <component
            v-if="navLink.icon"
            :is="navLink.icon"
            class="size-5"
            strokeWidth="1"
        />

        {{ navLink.name }}
    </Link>

    <details
        v-if="navLink.hasOwnProperty('children')"
        :open="navLink.children.map((child) => route().current(child.routePattern)).filter((r) => r).length"
    >
        <summary
            :class="{
                'text-base': mobile,
            }"
        >
            <component
                v-if="navLink.icon"
                :is="navLink.icon"
                class="size-5"
                strokeWidth="1"
            />

            {{ navLink.name }}
        </summary>

        <ul>
            <li
                v-for="(childLink, childIndex) in navLink.children"
                :key="childIndex"
            >
                <ApplicationMenuLink
                    :navLink="childLink"
                    :mobile="mobile"
                />
            </li>
        </ul>
    </details>
</template>

<script setup>
    import { Link } from "@inertiajs/vue3";

    const props = defineProps([
        'navLink',
        'mobile',
    ]);
</script>
