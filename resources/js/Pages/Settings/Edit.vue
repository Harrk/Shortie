<template>
    <Head title="Settings" />

    <AuthenticatedLayout>
        <Block title="Settings">
            <form
                class="flex flex-col space-y-4"
                @submit.prevent="save"
            >
                <FieldToggle
                    class="mt-2"
                    label="Allow User Registration"
                    help="Guests will be able to register and manage their own Short URls."
                    v-model="form.allowUserRegistration"
                />

                <FieldSelect
                    v-if="Object.values(roles).length"
                    v-model="form.defaultUserRole"
                    label="Default User Role"
                    help="Default role new users will inherit when they register."
                    :allowAny="false"
                    :disabled="form.processing"
                    :error="form.errors.role"
                    :options="roles"
                />

                <FieldToggle
                    label="Enable Geolocation"
                    help="Guests will be able to register and manage their own Short URls."
                    v-model="form.enableGeolocation"
                >
                    <template #help>
                        Enabling Geolocation will retrieve a visitor's country/city by their IP address.
                        Requires additional <a target="_blank" class="link link-primary" href="https://github.com/Harrk/Shortie?tab=readme-ov-file#enabling-geolocation">configuration</a> before enabling.
                    </template>
                </FieldToggle>

                <div class="flex flex-row-reverse space-x-2 space-x-reverse">
                    <PrimaryButton
                        :submit="true"
                        :disabled="form.processing"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </Block>
    </AuthenticatedLayout>
</template>

<script setup>
    import { Head, useForm } from "@inertiajs/vue3";
    import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
    import Block from "@/Components/Layout/Block.vue";
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";
    import FieldSelect from "@/Components/Fields/FieldSelect.vue";
    import FieldToggle from "@/Components/Fields/FieldToggle.vue";

    const props = defineProps([
        'settings',
        'roles',
    ]);

    const form = useForm({
        ...props.settings,
    });

    const save = () => {
        form.post(route('settings.update'));
    };
</script>
