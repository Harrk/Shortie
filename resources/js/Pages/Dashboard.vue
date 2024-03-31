<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <Block>
            Hi, {{ $page.props.auth.user.name }}.
        </Block>

        <Block
            class="md:w-1/2"
            title="Quick Create Short URL"
        >
            <form
                @submit.prevent="form.post(route('short-url.store'))"
                class="flex flex-col space-y-4 flex-1"
            >
                <FieldInput
                    class="mt-2"
                    placeholder="https://yourreallylongurl.com..."
                    :disabled="form.processing"
                    v-model="form.url"
                    :error="form.errors.url"
                />

                <div>
                    <PrimaryButton
                        :disabled="form.processing"
                        :submit="true"
                    >
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </Block>
    </AuthenticatedLayout>
</template>

<script setup>
    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
    import { Head, useForm } from '@inertiajs/vue3';
    import Block from "@/Components/Layout/Block.vue";
    import FieldInput from "@/Components/Fields/FieldInput.vue";
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";

    const form = useForm({
        url: '',
    });
</script>

