<template>
    <Head :title="`${ verb } Short URL`" />

    <AuthenticatedLayout>
        <Block>
            <h2 class="font-semibold text-lg">{{ verb }} Short URL</h2>

            <form @submit.prevent="save">
                <div class="md:flex md:flex-row md:space-x-4">
                    <div class="flex flex-col space-y-4 flex-1">
                        <FieldInput
                            label="URL"
                            placeholder="https://yourreallylongurl.com..."
                            :disabled="form.processing"
                            v-model="form.url"
                            :error="form.errors.url"
                        />

                        <!-- Todo: Turn into component -->
                        <div v-if="Object.values(domains).length > 1">
                            <label class="label">
                                Domain
                            </label>

                            <select
                                class="select select-bordered max-w-lg w-full"
                                v-model="form.domain_id"
                                required
                            >
                                <option
                                    v-for="(domain, id) in domains"
                                    :key="id"
                                    :value="id"
                                >
                                    {{ domain }}
                                </option>
                            </select>

                            <p
                                v-if="form.errors.domain_id"
                                class="text-red-500 text-sm mt-1"
                            >
                                {{ form.errors.domain_id }}
                            </p>
                        </div>

                        <FieldInput
                            label="Slug"
                            placeholder=""
                            :disabled="form.processing"
                            v-model="form.slug"
                            :error="form.errors.slug"
                        />
                    </div>

                    <div class="md:w-1/4 pt-10">
                        <QRCode
                            class="max-w-32 mx-auto lg:max-w-48"
                            :data="fullShortUrl"
                        />
                    </div>
                </div>

                <div class="flex flex-row-reverse space-x-2 space-x-reverse mt-4">
                    <PrimaryButton
                        :disabled="form.processing"
                        :submit="true"
                    >
                        {{ verb }}
                    </PrimaryButton>

                    <NeutralButton
                        v-if="form.id"
                        :disabled="form.processing"
                        @click="deleteShortUrl()"
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
    import { computed, watch } from "vue";
    import NeutralButton from "@/Components/Buttons/NeutralButton.vue";
    import QRCode from "@/Components/QRCode.vue";
    import { toast } from 'vue3-toastify';
    import copy from "copy-to-clipboard";

    const props = defineProps([
        'shortUrl',
        'domains',
        'copy',
    ]);

    const form = useForm({
        id: null,
        domain_id: null,
        slug: '',
        url: '',
        short_url: '',
        ...props.shortUrl,
    });

    const verb = computed(() => form.id ? 'Update' : 'Create');
    const selectedDomain = computed(() => props.domains[form.domain_id]);
    const fullShortUrl = computed(() => `${ selectedDomain.value }/${ form.slug }`);

    const save = () => {
        if (form.id) {
            form.put(route('short-url.update', form.id));
        } else {
            form.post(route('short-url.store'), {
                onSuccess: () => {
                    form.defaults({...props.shortUrl});
                    form.reset();
                },
            });
        }
    };

    const copyUrlToClipboard = () => {
        if (copy(fullShortUrl.value)) {
            toast.dark('Short URL copied to clipboard', {
                type: 'success',
            });
        }
    }

    const deleteShortUrl = () => {
        if (window.confirm('Are you sure?')) {
            form.delete(route('short-url.destroy', form.id));
        }
    }

    watch(() => props.copy, (value) => {
        if (value) {
            copyUrlToClipboard();
        }
    }, {
        immediate: true,
    })
</script>
