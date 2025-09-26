<template>
    <div>
        <div class="min-h-screen bg-base-200">
            <div class="mx-auto max-w-7xl px-4 pt-6">
                <div class="navbar bg-base-100 rounded-box">
                    <div class="navbar-start">
                        <div class="dropdown lg:hidden">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </div>

                            <ul tabindex="0" class="menu menu-sm space-y-1 dropdown-content mt-3 z-1 p-2 shadow-lg border border-base-200 bg-base-100 rounded-box w-52">
                                <li
                                    v-for="(navLink, index) in mainLinks"
                                    :key="index"
                                >
                                    <ApplicationMenuLink
                                        :navLink="navLink"
                                        :mobile="true"
                                    />
                                </li>

                                <li
                                    v-for="(navLink, index) in secondaryLinks"
                                    :key="index"
                                >
                                    <ApplicationMenuLink
                                        :navLink="navLink"
                                        :mobile="true"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="navbar-center">
                        <Link class="text-2xl pb-2" href="/">Shortie<span class="text-accent text-4xl">.</span></Link>
                    </div>

                    <div class="navbar-end"></div>
                </div>

                <div class="pt-6">
                    <div class="flex flex-row lg:space-x-6">
                        <div class="hidden lg:block bg-base-100 min-w-48 w-56 rounded-box sticky h-fit top-4">
                            <ul class="menu w-full space-y-1">
                                <li
                                    v-for="(navLink, index) in mainLinks"
                                    :key="index"
                                >
                                    <ApplicationMenuLink :navLink="navLink" />
                                </li>
                            </ul>

                            <div class="divider opacity-50 mx-4 my-0"></div>

                            <ul class="menu w-full space-y-1">
                                <li
                                    v-for="(navLink, index) in secondaryLinks"
                                    :key="index"
                                >
                                    <ApplicationMenuLink :navLink="navLink" />
                                </li>

                                <li>
                                    <Link
                                        class="link link-secondary"
                                        :href="route('short-url.create')"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                        Add Short URL
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <!-- Page Content -->
                        <main class="flex-1 flex flex-col space-y-4 pb-10">
                            <slot />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Link, usePage } from "@inertiajs/vue3";
    import { computed } from "vue";
    import {
        IconHome,
        IconLink,
        IconSettings as IconCog,
        IconUser,
        IconLogout,
    } from "@tabler/icons-vue";
    import ApplicationMenuLink from "@/Components/ApplicationMenuLink.vue";

    const mainLinks = computed(() => {
        return [
            {
                icon: IconHome,
                name: 'Dashboard',
                route: route('dashboard'),
                routePattern: 'dashboard',
            },

            {
                icon: IconLink,
                name: 'Short URLs',
                route: route('short-url.index'),
                routePattern: 'short-url.*',
            },
        ];
    });

    const secondaryLinks = computed(() => {
        const links = [
            {
                icon: IconCog,
                name: 'Admin',
                children: [
                    {
                        name: 'Settings',
                        route: route('settings.edit'),
                        routePattern: 'settings.*',
                        visible: usePage().props.can['view-settings'],
                    },
                    {
                        name: 'Users',
                        route: route('user.index'),
                        routePattern: 'user.*',
                        visible: usePage().props.can['view-users'],
                    },
                    {
                        name: 'Domains',
                        route: route('domain.index'),
                        routePattern: 'domain.*',
                        visible: usePage().props.can['view-domains'],
                    }
                ],
            },
            {
                icon: IconUser,
                name: 'Profile',
                route: route('user.edit', usePage().props.auth.user.id),
            },
            {
                icon: IconLogout,
                name: 'Logout',
                route: route('logout'),
                method: 'post',
            },
        ];

        return links.filter((row) => {
            if (row.hasOwnProperty('visible')) {
                return row.visible;
            }

            if (row.hasOwnProperty('children')) {
                row.children = row.children.filter((child) => {
                    if (child.hasOwnProperty('visible')) {
                        return child.visible;
                    }

                    return true;
                });

                if (! row.children.length) {
                    return false;
                }
            }

            return true;
        });
    });
</script>
