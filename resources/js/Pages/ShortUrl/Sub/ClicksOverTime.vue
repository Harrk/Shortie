<template>
    <apexchart type="bar" height="300" :options="chartOptions" :series="data" />
</template>

<script setup>
    import { computed } from "vue";

    const props = defineProps([
        'darkMode',
        'data',
        'intervals',
    ]);

    const chartOptions = computed(() => ({
        theme: {
            mode: props.darkMode ? 'dark' : 'light',
            palette: 'palette1',
        },
        chart: {
            height: 300,
            background: 'transparent',
            type: 'chart',
            stacked: true,
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '12px',
                            fontWeight: 600,
                            color: props.darkMode ? 'white' : 'black',
                        }
                    }
                }
            },
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: props.darkMode ? '#444444' : '#AAAAAA',
            strokeDashArray: 2,
            yaxis: {
                lines: {
                    // show: false
                }
            },
        },
        xaxis: {
            tickAmount: 15,
            categories: props.intervals,
        },
        yaxis: {
        }
    }));
</script>
