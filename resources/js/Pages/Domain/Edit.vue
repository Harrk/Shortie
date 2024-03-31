<template>
    <Head :title="`${ verb } Domain`" />

    <AuthenticatedLayout>
        <Block :title="`${ verb} Domains`">
            <form
                class="flex flex-col space-y-4"
                @submit.prevent="save"
            >
                <FieldInput
                    label="URL"
                    placeholder="https://your-domain.com"
                    :disabled="form.processing"
                    v-model="form.url"
                    :required="true"
                    :error="form.errors.url"
                />

                <div class="flex flex-row-reverse space-x-2 space-x-reverse">
                    <PrimaryButton
                        :submit="true"
                        :disabled="form.processing"
                    >
                        {{ verb }}
                    </PrimaryButton>

                    <NeutralButton
                        v-if="form.id"
                        :disabled="domain.short_urls_count || form.processing"
                        @click="form.delete(route('domain.destroy', form.id))"
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
    import { computed } from "vue";
    import NeutralButton from "@/Components/Buttons/NeutralButton.vue";

    const props = defineProps([
        'domain',
    ]);

    const form = useForm({
        id: null,
        url: '',
        ...props.domain,
    });

    const verb = computed(() => form.id ? 'Update' : 'Create');

    const save = () => {
        if (form.id) {
            form.put(route('domain.update', form.id));
        } else {
            form.post(route('domain.store'));
        }
    };
</script>
