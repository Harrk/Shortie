<template>
    <GuestLayout>
        <Head title="Forgot Password" />

        <div v-if="status" class="mb-4 font-medium text-sm text-success">
            {{ status }}
        </div>

        <Block>
            <p class="mb-4 text-sm text-base-content/50">
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset
                link that will allow you to choose a new one.
            </p>

            <form @submit.prevent="submit">
                <FieldInput
                    id="email"
                    type="email"
                    :required="true"
                    :error="form.errors.email"
                    label="Email"
                    v-model="form.email"
                />

                <div class="flex items-center justify-end mt-4">
                    <PrimaryButton
                        :disabled="form.processing"
                        :submit="true"
                    >
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </Block>
    </GuestLayout>
</template>

<script setup>
    import GuestLayout from '@/Layouts/GuestLayout.vue';
    import { Head, useForm } from '@inertiajs/vue3';
    import Block from "@/Components/Layout/Block.vue";
    import FieldInput from "@/Components/Fields/FieldInput.vue";
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";

    defineProps({
        status: {
            type: String,
        },
    });

    const form = useForm({
        email: '',
    });

    const submit = () => {
        form.post(route('password.email'));
    };
</script>
