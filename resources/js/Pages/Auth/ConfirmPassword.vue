<template>
    <GuestLayout>
        <Head title="Confirm Password" />

        <Block>
            <p class="mb-4 text-sm text-base-content/50">
                This is a secure area of the application. Please confirm your password before continuing.
            </p>

            <form @submit.prevent="submit">
                <FieldInput
                    id="password"
                    type="password"
                    :required="true"
                    :error="form.errors.password"
                    label="Password"
                    v-model="form.password"
                />

                <div class="flex justify-end mt-4">
                    <PrimaryButton
                        :disabled="form.processing"
                        :submit="true"
                    >
                        Confirm
                    </PrimaryButton>
                </div>
            </form>
        </Block>
    </GuestLayout>
</template>

<script setup>
    import GuestLayout from '@/Layouts/GuestLayout.vue';
    import { Head, useForm } from '@inertiajs/vue3';
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";
    import Block from "@/Components/Layout/Block.vue";
    import FieldInput from "@/Components/Fields/FieldInput.vue";

    const form = useForm({
        password: '',
    });

    const submit = () => {
        form.post(route('password.confirm'), {
            onFinish: () => form.reset(),
        });
    };
</script>
