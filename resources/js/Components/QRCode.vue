<template>
    <div
        id="qr-code-wrapper"
        class="p-2 lg:p-3 bg-base-300 rounded-lg"
    >
        <canvas
            id="qr-code"
            class="inline-block"
        />
    </div>
</template>

<script setup>
    import QRCode from "qrcode";
    import { onMounted, watch } from "vue";

    const props = defineProps({
        'data': {
            type: String,
            required: true,
        }
    });

    const generateQrCode = () => {
        let canvas = document.getElementById('qr-code');

        let options = {
            margin: 1,
            scale: 12,
        };

        QRCode.toCanvas(canvas, props.data, options, function (error) {
            if (error) console.error(error);
        })
    }

    onMounted(() => generateQrCode());
    watch(props, () => generateQrCode());
</script>

<style lang="postcss" scoped>
    canvas {
        @apply h-full w-full !important;
    }
</style>
