<script lang="ts">

declare interface Tab {
    slotName: string,
    contentLabel: string,
    icon: string,
    active?: boolean
}
import { PropType, getCurrentInstance } from 'vue';

export default {
    name: "TabGroup",
    emits: ['update:tabs'],
    props: {
        tabs: {
            type: Array as PropType<Array<Tab>>,
            default: () => []
        }
    },
    methods: {
        setActive(tab: Tab) {
            this.tabs.forEach(t => t.active = false)
            tab.active = true;
            (getCurrentInstance()?.proxy as any).$emit("update:tabs", this.tabs);
        }
    }
}
</script>
<template>
    <div v-for="tab in tabs" :key="tab.contentLabel">
        <div @click="setActive(tab)"><font-awesome-icon :icon="tab.icon" /> {{ $t(tab.contentLabel) }}</div>
        <slot v-if="tab.active" :name="tab.slotName"></slot>
    </div>
</template>
<style lang="scss" scoped>

</style>
