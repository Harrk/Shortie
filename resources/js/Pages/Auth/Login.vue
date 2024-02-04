<template>
    <GuestLayout>
        <Head title="Log in" />

        <div v-if="status" class="mb-4 font-medium text-sm text-success">
            {{ status }}
        </div>

        <Block>
            <form
                class="flex flex-col space-y-4"
                @submit.prevent="submit"
            >
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

                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Remember me</span>
                        <input type="checkbox" checked="checked" class="checkbox" v-model="form.remember" />
                    </label>
                </div>

                <div class="flex items-center justify-end space-x-4 mt-4">
                    <Link
                        v-if="canResetPassword"
                        :href="route('password.request')"
                        class="link-primary text-sm"
                    >
                        Forgot your password?
                    </Link>

                    <PrimaryButton
                        :disabled="form.processing"
                        :submit="true"
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </Block>
    </GuestLayout>
</template>

<script setup>
    import GuestLayout from '@/Layouts/GuestLayout.vue';
    import { Head, Link, useForm } from '@inertiajs/vue3';
    import FieldInput from "@/Components/Fields/FieldInput.vue";
    import Block from "@/Components/Layout/Block.vue";
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";

    defineProps({
        canResetPassword: {
            type: Boolean,
        },
        status: {
            type: String,
        },
    });

    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = () => {
        form.post(route('login'), {
            onFinish: () => form.reset('password'),
        });
    };
</script>

