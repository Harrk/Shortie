<template>
    <p class="max-w-2xl">
        Add rules to redirect users to a different URL if they match its condition.
    </p>

    <div class="flex flex-col space-y-4 mt-4">
        <div
            v-for="(rule, index) in form.rules"
            class="p-4 bg-base-200 rounded-sm flex flex-col space-y-2"
        >
            <div class="flex flex-row space-x-4">
                <FieldSelect
                    :options="availableRules"
                    class="w-1/4"
                    :disabled="form.processing"
                    label="Condition"
                    :required="true"
                    :error="form.errors[`rules.${ index }.key`]"
                    v-model="rule.key"
                    @change="rule.value = null"
                />

                <FieldSelect
                    :options="{
                        '=': 'Equals',
                        '!=': 'Not Equals',
                    }"
                    class="w-32"
                    :disabled="form.processing"
                    value="Country"
                    label="&nbsp;"
                    :required="true"
                    :error="form.errors[`rules.${ index }.operator`]"
                    v-model="rule.operator"
                />

                <!-- Device Select -->
                <FieldSelect
                    v-if="rule.key === 'platform'"
                    class="flex-1"
                    :disabled="form.processing"
                    label="&nbsp;"
                    :allow-any="false"
                    any-label="Select a platform"
                    :options="platforms"
                    :required="true"
                    :error="form.errors[`rules.${ index }.value`]"
                    v-model="rule.value"
                />

                <!-- Country Select -->
                <FieldSelect
                    v-if="rule.key === 'country'"
                    class="flex-1"
                    :disabled="form.processing"
                    label="&nbsp;"
                    :allow-any="false"
                    any-label="Select a country"
                    :options="countries"
                    :required="true"
                    :error="form.errors[`rules.${ index }.value`]"
                    v-model="rule.value"
                />

                <NeutralButton
                    class="btn btn-square btn-neutral btn-sm"
                    @click="removeRule(index)"
                >
                    <IconClose />
                </NeutralButton>
            </div>

            <div>
                <FieldInput
                    label="Redirect URL"
                    placeholder="https://yourreallylongurl.com..."
                    :disabled="form.processing"
                    :error="form.errors[`rules.${ index }.url`]"
                    :required="true"
                    v-model="rule.url"
                />
            </div>
        </div>
    </div>

    <NeutralButton
        class="mt-4"
        @click="addRule"
    >
        Add Rule
    </NeutralButton>
</template>

<script setup lang="ts">
    import FieldInput from "@/Components/Fields/FieldInput.vue";
    import FieldSelect from "@/Components/Fields/FieldSelect.vue";
    import IconClose from "@/Components/Icons/IconClose.vue";
    import NeutralButton from "@/Components/Buttons/NeutralButton.vue";
    import { computed } from "vue";

    const props = defineProps([
        'form',
        'countries',
        'geoLocationEnabled',
    ]);

    const availableRules = computed(() => {
        let rules = {
            'platform': 'Platform',
        };

        if (props.geoLocationEnabled) {
            rules['country'] = 'Country';
        }

        return rules;
    });

    const platforms = computed(() => [
        'AndroidOS',
        'iOS',
        'OS X',
        'Ubuntu',
        'Windows',
        'Unknown',
    ]);

    const addRule = () => {
        props.form.rules.push({
            key: 'country',
            operator: '=',
            value: '',
        });
    }

    const removeRule = (index) => {
        props.form.rules.splice(index, 1);
    }
</script>
