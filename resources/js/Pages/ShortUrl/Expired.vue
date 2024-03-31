<template>
    <GuestLayout>
        <Block title="URL Has Expired">
            <p>
                The URL you have accessed has been deactivated according to the policy set by its creator.
            </p>

            <div
                v-if="canGoBack"
                class="text-center mt-5"
            >
                <PrimaryButton @click="back()">
                    Go Back
                </PrimaryButton>
            </div>
        </Block>
    </GuestLayout>
</template>

<script setup>
    import GuestLayout from "@/Layouts/GuestLayout.vue";
    import Block from "@/Components/Layout/Block.vue";
    import PrimaryButton from "@/Components/Buttons/PrimaryButton.vue";
    import { computed } from "vue";

    const canGoBack = computed(() => {
        return window.history && window.history.length > 1;
    })

    const back = () => {
        window.history.back();
    }
</script>
