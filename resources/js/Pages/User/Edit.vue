<template>
    <Head :title="`${ verb } User`" />

    <AuthenticatedLayout>
        <Block :title="`${ verb } User`">
            <form
                class="flex flex-col space-y-4"
                @submit.prevent="save"
            >
                <FieldInput
                    label="Name"
                    :disabled="form.processing"
                    v-model="form.name"
                    :required="true"
                    :error="form.errors.name"
                />

                <FieldInput
                    label="Email"
                    :disabled="form.processing"
                    v-model="form.email"
                    :required="true"
                    :error="form.errors.email"
                />

                <FieldInput
                    label="Password"
                    :disabled="form.processing"
                    type="password"
                    v-model="form.password"
                    :error="form.errors.password"
                />

                <FieldSelect
                    v-if="Object.values(roles).length && $page.props.auth.user.role === 'Admin'"
                    v-model="form.role"
                    label="Role"
                    :allowAny="false"
                    :disabled="form.processing"
                    :error="form.errors.role"
                    :options="roles"
                />

                <div class="flex flex-row-reverse space-x-2 space-x-reverse">
                    <PrimaryButton
                        :submit="true"
                        :disabled="form.processing"
                    >
                        {{ verb }}
                    </PrimaryButton>

                    <NeutralButton
                        v-if="form.id && form.id !== $page.props.auth.user.id"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        Delete
                    </NeutralButton>
                </div>
            </form>
        </Block>
    </AuthenticatedLayout>
</template>

<script setup>
    import { Head, useForm } from "@inertiajs/vue3";
    import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
    import Block from "@/Components/Layout/Block.vue";
    import FieldInput from "@/Components/Fields/FieldInput.vue";
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";
    import {computed, onActivated, onMounted, watch} from "vue";
    import NeutralButton from "@/Components/Buttons/NeutralButton.vue";
    import FieldSelect from "@/Components/Fields/FieldSelect.vue";

    const props = defineProps([
        'user',
        'roles',
    ]);

    const form = useForm({
        id: null,
        name: '',
        email: '',
        role: 'User',
        password: '',
        ...props.user,
    });

    const verb = computed(() => form.id ? 'Update' : 'Create');

    const save = () => {
        if (form.id) {
            form.put(route('user.update', form.id), {
                onSuccess: () => form.reset('password'),
            });
        } else {
            form.post(route('user.store'), {
                onSuccess: () => {
                    form.defaults({...props.user});
                    form.reset();
                },
            });
        }
    };

    const deleteUser = () => {
        if (window.confirm('Are you sure?')) {
            form.delete(route('user.destroy', form.id));
        }
    }
</script>
