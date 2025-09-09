<template>
    <Head :title="`${ verb } Short URL`" />

    <AuthenticatedLayout>
        <Block :title="`${ verb } Short URL`">
            <form
                id="short-url-form"
                @submit.prevent="save"
            >
                <div class="md:flex md:flex-row md:space-x-4">
                    <div class="flex flex-col space-y-4 flex-1">
                        <FieldInput
                            label="Redirect URL"
                            placeholder="https://yourreallylongurl.com..."
                            :disabled="form.processing"
                            v-model="form.url"
                            :error="form.errors.url"
                            :required="true"
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
                            :required="true"
                        />
                    </div>

                    <div class="pt-8 md:pt-0">
                        <QRCode
                            class="max-w-48 mx-auto"
                            :data="fullShortUrl"
                        />
                    </div>
                </div>
            </form>
        </Block>

        <Block title="Behaviour">
            <FieldInput
                label="Max visits"
                placeholder="No limit"
                :disabled="form.processing"
                v-model="form.max_visits"
                :error="form.errors.max_visits"
                type="number"
                help="The Short URL will deactivate once it reaches the maximum number of visits specified. Leave blank for no limit."
                form="short-url-form"
            />
        </Block>

        <Block
            v-if="canManageRules"
            title="Rules"
        >
            <RuleEditor
                :form="form"
                :countries="countries"
            />
        </Block>

        <div class="flex flex-row-reverse space-x-2 space-x-reverse mt-4">
            <PrimaryButton
                :disabled="form.processing"
                :submit="true"
                form="short-url-form"
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
    </AuthenticatedLayout>
</template>

<script setup lang="ts">
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
    import RuleEditor from "@/Pages/ShortUrl/Sub/RuleEditor.vue";

    const props = defineProps([
        'shortUrl',
        'domains',
        'copy',
        'countries',
        'canManageRules',
    ]);

    const form = useForm({
        id: null,
        domain_id: null,
        slug: '',
        url: '',
        short_url: '',
        rules: [],
        ...props.shortUrl,
    });

    const verb = computed(() => form.id ? 'Update' : 'Create');
    const selectedDomain = computed(() => props.domains[form.domain_id]);
    const fullShortUrl = computed(() => `${ selectedDomain.value }/${ form.slug }`);

    const save = () => {
        if (form.id) {
            form.put(route('short-url.update', form.id), {
                onSuccess: () => {
                    toast.dark('Short URL has been saved');
                },
                preserveScroll: true,
            });
        } else {
            form.post(route('short-url.store'), {
                onSuccess: () => {
                    form.defaults({...props.shortUrl});
                    form.reset();
                    toast.dark('Short URL has been saved');
                },
                preserveScroll: true,
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
