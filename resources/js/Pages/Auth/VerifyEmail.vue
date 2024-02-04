<template>
    <GuestLayout>
        <Head title="Email Verification" />

        <div
            v-if="verificationLinkSent"
            class="mb-4 font-medium text-sm text-success"
        >
            A new verification link has been sent to the email address you provided during registration.
        </div>

        <Block>
            <p class="mb-4 text-sm text-base-content/50">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
                we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </p>

            <form @submit.prevent="submit">
                <div class="mt-4 flex space-x-4 items-center justify-between">
                    <PrimaryButton
                        :disabled="form.processing"
                        :submit="true"
                    >
                        Resend Verification Email
                    </PrimaryButton>

                    <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="link-primary text-sm"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </Block>
    </GuestLayout>
</template>

<script setup>
    import { computed } from 'vue';
    import GuestLayout from '@/Layouts/GuestLayout.vue';
    import { Head, Link, useForm } from '@inertiajs/vue3';
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";
    import Block from "@/Components/Layout/Block.vue";

    const props = defineProps({
        status: {
            type: String,
        },
    });

    const form = useForm({});

    const submit = () => {
        form.post(route('verification.send'));
    };

    const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

