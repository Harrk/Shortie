<template>
    <GuestLayout>
        <Head title="Register" />

        <Block>
            <form
                class="flex flex-col space-y-4"
                @submit.prevent="submit"
            >
                <FieldInput
                    id="name"
                    type="name"
                    :required="true"
                    :error="form.errors.name"
                    label="Name"
                    v-model="form.name"
                />

                <FieldInput
                    id="email"
                    type="email"
                    :required="true"
                    :error="form.errors.email"
                    label="Email"
                    v-model="form.email"
                />

                <FieldInput
                    id="password"
                    type="password"
                    :required="true"
                    :error="form.errors.password"
                    label="Password"
                    v-model="form.password"
                />

                <FieldInput
                    id="password_confirmation"
                    type="password"
                    :required="true"
                    :error="form.errors.password_confirmation"
                    label="Confirm Password"
                    v-model="form.password_confirmation"
                />

                <div class="flex items-center justify-end space-x-4 mt-4">
                    <Link
                        :href="route('login')"
                        class="link-primary text-sm"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton
                        :disabled="form.processing"
                        :submit="true"
                    >
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </Block>
    </GuestLayout>
</template>

<script setup>
    import GuestLayout from '@/Layouts/GuestLayout.vue';
    import { Head, Link, useForm } from '@inertiajs/vue3';
    import Block from "@/Components/Layout/Block.vue";
    import FieldInput from "@/Components/Fields/FieldInput.vue";
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";

    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = () => {
        form.post(route('register'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };
</script>
