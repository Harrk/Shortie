<template>
    <Head title="Users" />

    <AuthenticatedLayout>
        <Block>
            <div class="flex flex-row-reverse space-x-2 space-x-reverse">
                <PrimaryButton
                    class="btn-sm"
                    @click="router.visit(route('user.create'))"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    <span>Add <span class="hidden md:inline">User</span></span>
                </PrimaryButton>

                <FieldSelect
                    v-model="form.filters.role"
                    allLabel="Any Role"
                    size="sm"
                    :allowAny="true"
                    :options="roles"
                    @change="refreshData"
                />
            </div>

            <div class="overflow-x-auto">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th class="hidden md:table-cell">Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="user in users.data"
                            :key="user.id"
                        >
                            <td>
                                {{ user.name }}
                                <div class="text-sm text-base-content/60">{{ user.email }}</div>
                            </td>
                            <td>{{ user.role }}</td>
                            <td class="hidden md:table-cell">{{ user.created_at }}</td>
                            <td class="flex flex-col space-y-2 md:flex-row-reverse md:space-y-0 md:space-x-2 md:space-x-reverse">
                                <Link
                                    class="btn btn-square btn-neutral btn-sm"
                                    :href="route('user.edit', user.id)"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Pagination :links="users.meta.links" />
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

    const props = defineProps([
        'users',
        'roles',
        'filters',
    ]);

    const form = useForm({
        filters: {
            role: props.filters?.role || '',
        }
    });

    const refreshData = () => {
        form.get(route('user.index'));
    };
</script>

