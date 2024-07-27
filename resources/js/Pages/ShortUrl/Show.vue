<template>
    <Head :title="`Analytics`" />

    <AuthenticatedLayout>
        <div class="flex flex-row space-x-2">
            <div class="flex-1">
                <h1 class="font-semibold text-xl">Analytics: {{ shortUrl.short_url }}</h1>
                <p class="text-sm text-base-content/60">{{ shortUrl.url }}</p>
            </div>
        </div>

        <div class="flex space-x-2">
            <FieldSelect
                size="sm"
                :options="periods"
                @change="updateData"
                v-model="form.period"
                optionLabel="key"
            />

            <NeutralButton
                class="btn-sm"
                @click="router.visit(route('short-url.edit', shortUrl.id))"
            >
                Edit Short URL
            </NeutralButton>
        </div>

        <div class="stats stats-vertical md:stats-horizontal">
            <div class="stat">
                <div class="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12l3 0" /><path d="M12 3l0 3" /><path d="M7.8 7.8l-2.2 -2.2" /><path d="M16.2 7.8l2.2 -2.2" /><path d="M7.8 16.2l-2.2 2.2" /><path d="M12 12l9 3l-4 2l-2 4l-3 -9" /></svg>
                </div>
                <div class="stat-title">Total Clicks</div>
                <div class="stat-value text-primary">{{ clicks }}</div>
                <div class="stat-desc">Humans and bots.</div>
            </div>
            <div class="stat">
                <div class="stat-figure text-info">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
                </div>
                <div class="stat-title">Human Clicks</div>
                <div class="stat-value text-info">{{ humanClicks }}</div>
                <div class="stat-desc">Only humans.</div>
            </div>
            <div class="stat">
                <div class="stat-figure text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M12 2v2" /><path d="M9 12v9" /><path d="M15 12v9" /><path d="M5 16l4 -2" /><path d="M15 14l4 2" /><path d="M9 18h6" /><path d="M10 8v.01" /><path d="M14 8v.01" /></svg>
                </div>
                <div class="stat-title">Bot Clicks</div>
                <div class="stat-value text-accent">{{ botClicks }}</div>
                <div class="stat-desc">Only bots.</div>
            </div>
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h.5" /><path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" /></svg>
                </div>
                <div class="stat-title">Unique Clicks</div>
                <div class="stat-value text-secondary">{{ uniqueClicks }}</div>
                <div class="stat-desc">Unique humans.</div>
            </div>
        </div>

        <Block
            class="hidden md:block"
            title="Clicks Over Time"
        >
            <ClicksOverTime
                :darkMode="true"
                :data="clicksOverTime"
                :intervals="days"
            />
        </Block>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Block title="Top Devices">
                <div class="flex flex-col space-y-1 mt-1">
                    <template v-if="Object.values(topDevices).length">
                        <div
                            v-for="(count, device) in topDevices"
                            :key="device"
                            class="text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"
                        >
                            <span class="flex-1">{{ device }}</span>
                            <span>{{ count }}</span>
                        </div>
                    </template>

                    <p v-else>There is no data for this period.</p>
                </div>
            </Block>

            <Block title="Top Device Types">
                <div class="flex flex-col space-y-1 mt-1">
                    <template v-if="Object.values(topDeviceTypes).length">
                        <div
                            v-for="(count, deviceType) in topDeviceTypes"
                            :key="deviceType"
                            class="text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"
                        >
                            <span class="flex-1">{{ deviceType }}</span>
                            <span>{{ count }}</span>
                        </div>
                    </template>

                    <p v-else>There is no data for this period.</p>
                </div>
            </Block>

            <Block title="Top Operating Systems">
                <div class="flex flex-col space-y-1 mt-1">
                    <template v-if="Object.values(topOperatingSystems).length">
                        <div
                            v-for="(count, topOperatingSystem) in topOperatingSystems"
                            :key="topOperatingSystem"
                            class="text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"
                        >
                            <span class="flex-1">{{ topOperatingSystem }}</span>
                            <span>{{ count }}</span>
                        </div>
                    </template>

                    <p v-else>There is no data for this period.</p>
                </div>
            </Block>

            <Block title="Top Browsers">
                <div class="flex flex-col space-y-1 mt-1">
                    <template v-if="Object.values(topBrowsers).length">
                        <div
                            v-for="(count, topBrowser) in topBrowsers"
                            :key="topBrowser"
                            class="text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"
                        >
                            <span class="flex-1">{{ topBrowser }}</span>
                            <span>{{ count }}</span>
                        </div>
                    </template>

                    <p v-else>There is no data for this period.</p>
                </div>
            </Block>

            <template v-if="enableGeolocation">
                <Block title="Top Countries">
                    <div class="flex flex-col space-y-1 mt-1">
                        <template v-if="Object.values(topCountries).length">
                            <div
                                v-for="(count, topCountry) in topCountries"
                                :key="topCountry"
                                class="text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"
                            >
                                <span class="flex-1">{{ topCountry }}</span>
                                <span>{{ count }}</span>
                            </div>
                        </template>

                        <p v-else>There is no data for this period.</p>
                    </div>
                </Block>

                <Block title="Top Cities">
                    <div class="flex flex-col space-y-1 mt-1">
                        <template v-if="Object.values(topCities).length">
                            <div
                                v-for="(count, topCity) in topCities"
                                :key="topCity"
                                class="text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"
                            >
                                <span class="flex-1">{{ topCity }}</span>
                                <span>{{ count }}</span>
                            </div>
                        </template>

                        <p v-else>There is no data for this period.</p>
                    </div>
                </Block>
            </template>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
    import { Head, router, useForm } from "@inertiajs/vue3";
    import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
    import Block from "@/Components/Layout/Block.vue";
    import ClicksOverTime from "@/Pages/ShortUrl/Sub/ClicksOverTime.vue";
    import NeutralButton from "@/Components/Buttons/NeutralButton.vue";
    import FieldSelect from "@/Components/Fields/FieldSelect.vue";

    const props = defineProps([
        'shortUrl',
        'periods',
        'selectedPeriod',
        'clicks',
        'humanClicks',
        'botClicks',
        'uniqueClicks',
        'clicksOverTime',
        'days',
        'topDevices',
        'topDeviceTypes',
        'topBrowsers',
        'topOperatingSystems',
        'topCountries',
        'topCities',
        'enableGeolocation',
    ]);

    const form = useForm({
        period: props.selectedPeriod,
    });

    const updateData = () => {
        form.get(route('short-url.show', props.shortUrl.id));
    };
</script>
