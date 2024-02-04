<template>
    <GuestLayout>
        <Head title="Reset Password" />

        <form @submit.prevent="submit">
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

            <div class="flex items-center justify-end mt-4">
                <PrimaryButton
                    :disabled="form.processing"
                    :submit="true"
                >
                    Reset Password
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>

<script setup>
    import GuestLayout from '@/Layouts/GuestLayout.vue';
    import { Head, useForm } from '@inertiajs/vue3';
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";
    import FieldInput from "@/Components/Fields/FieldInput.vue";

    const props = defineProps({
        email: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    });

    const form = useForm({
        token: props.token,
        email: props.email,
        password: '',
        password_confirmation: '',
    });

    const submit = () => {
        form.post(route('password.store'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };
</script>

