<template>
    <Head title="Short URLs" />

    <AuthenticatedLayout>
        <Block>
            <div class="flex flex-row-reverse space-x-2 space-x-reverse">
                <PrimaryButton
                    :disabled="! hasDomains"
                    class="btn-sm"
                    @click="router.visit(route('short-url.create'))"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    <span>Add <span class="hidden md:inline">Short URL</span></span>
                </PrimaryButton>

                <FieldSelect
                    v-model="form.filters.domain_id"
                    anyLabel="Any Domain"
                    size="sm"
                    :allowAny="true"
                    :options="domains"
                    @change="refreshData"
                />
            </div>

            <template v-if="hasDomains">
                <div class="overflow-x-auto">
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th class="hidden md:table-cell">
                                    <span
                                        class="cursor-pointer text-primary"
                                        @click="toggleSort('clicks')"
                                    >
                                        Clicks
                                    </span>

                                    <IconChevronDown
                                        class="w-3 h-3 inline-block align-middle ml-1 opacity-0"
                                        :class="{
                                            'rotate-180': form.sort.order === 'asc',
                                            'opacity-100': form.sort.field === 'clicks'
                                        }"
                                    />
                                </th>
                                <th class="hidden md:table-cell">
                                    <span
                                        class="cursor-pointer text-primary"
                                        @click="toggleSort('created_at')"
                                    >
                                        Created
                                    </span>

                                    <IconChevronDown
                                        class="w-3 h-3 inline-block align-middle ml-1 opacity-0"
                                        :class="{
                                            'rotate-180': form.sort.order === 'asc',
                                            'opacity-100': form.sort.field === 'created_at'
                                        }"
                                    />
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="shortUrl in shortUrls.data"
                                :key="shortUrl.id"
                            >
                                <td>
                                    <div
                                        class="max-w-48 text-left md:max-w-full link tooltip"
                                        data-tip="Copy to clipboard"
                                        @click="copyToClipboard(shortUrl.short_url)"
                                    >
                                        {{ shortUrl.short_url }}
                                    </div>

                                    <span
                                        v-if="! shortUrl.is_active"
                                        class="badge badge-outline badge-error badge-sm float-right"
                                    >
                                        Inactive
                                    </span>

                                    <div class="text-xs text-base-content/60 max-w-40 md:max-w-96 truncate">{{ shortUrl.url }}</div>
                                    <div class="md:hidden text-xs text-base-content/60">Clicks: {{ shortUrl.clicks }}</div>
                                </td>
                                <td class="hidden md:table-cell">{{ shortUrl.clicks }}</td>
                                <td class="hidden md:table-cell">{{ shortUrl.created_at }}</td>
                                <td class="flex flex-col space-y-2 md:flex-row-reverse md:space-y-0 md:space-x-2 md:space-x-reverse">
                                    <Link
                                        class="btn btn-square btn-neutral btn-sm"
                                        :href="route('short-url.edit', shortUrl.id)"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </Link>

                                    <Link
                                        class="btn btn-square btn-neutral btn-sm"
                                        :href="route('short-url.show', shortUrl.id)"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                        </svg>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Pagination :links="shortUrls.meta.links" />
            </template>

            <template v-else>
                <div
                    role="alert"
                    class="alert alert-info alert-outline"
                >
                    <IconInfo class="h-6 w-6 shrink-0" />

                    <span>You must set up a <Link class="link link-primary" :href="route('domain.index')">Domain</Link> before adding a Short URL.</span>
                </div>
            </template>
        </Block>
    </AuthenticatedLayout>
</template>

<script setup>
    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
    import { Head, Link, router, useForm } from '@inertiajs/vue3';
    import Block from "@/Components/Layout/Block.vue";
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";
    import Pagination from "@/Components/Table/Pagination.vue";
    import FieldSelect from "@/Components/Fields/FieldSelect.vue";
    import copy from 'copy-to-clipboard';
    import IconChevronDown from "@/Components/Icons/IconChevronDown.vue";
    import IconInfo from "@/Components/Icons/IconInfo.vue";
    import { computed } from "vue";

    const props = defineProps([
        'shortUrls',
        'domains',
        'filters',
        'sort',
    ]);

    const form = useForm({
        filters: {
            domain_id: props.filters?.domain_id || '',
        },
        sort: {
            field: props.sort?.field || 'created_at',
            order: props.sort?.order || 'desc',
        }
    });

    const hasDomains = computed(() => !! Object.values(props.domains).length);

    const refreshData = () => {
        form.get(route('short-url.index'));
    };

    const copyToClipboard = (value) => {
        copy(value);
    }

    const toggleSort = (field) => {
        if (form.sort.field === field) {
            form.sort.order = form.sort.order === 'desc' ? 'asc' : 'desc';
        } else {
            form.sort.order = 'desc';
        }

        form.sort.field = field;
        refreshData();
    }
</script>

