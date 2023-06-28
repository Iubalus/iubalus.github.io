<script lang="ts">

declare interface Tab {
    slotName: string,
    contentLabel: string,
    icon: string,
    active?: boolean,
    action?: Function
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
            if (!tab.action || (tab.action && tab.action())) {
                this.tabs.forEach(t => t.active = false)
                tab.active = true;
            }
            (getCurrentInstance()?.proxy as any).$emit("update:tabs", this.tabs);
        }
    }
}
</script>
<template>
    <div>
        <div class="headers">
            <div v-for="tab in tabs" :key="tab.contentLabel" @click="setActive(tab)"
                :class="['tab-header', tab.active ? 'active' : '']">
                <font-awesome-icon :icon="tab.icon" />
                <span>{{ $t(tab.contentLabel) }}</span>
            </div>
        </div>
        <div v-for="tab in tabs" :key="tab.contentLabel">
            <div v-show="tab.active" class="tab-content">
                <slot :name="tab.slotName"></slot>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "colors";

.headers {
    width: 100%;
    display: flex;
}

.tab-header {
    font-size: 1.1em;
    display: inline-flex;
    border-top: solid 1px $border;
    border-right: solid 1px $border;
    font-family: monospace;
    min-width: 150px;
    color: black;
    background: $inactive;
    padding: 8px 10px;
    border-left: none;
    flex: 1;

    ::-moz-selection {
        background: transparent;
    }

    ::selection {
        background: transparent;
    }

    &:hover {
        cursor: pointer;
        background: lighten($inactive, 5%);
    }

    &.active {
        background: white;
        border-bottom: solid 1px white;
        color: black;
    }

    &:first-of-type {
        border-left: solid 1px $border;
    }

    >span {
        padding-left: 10px;
        width: 100%;
    }
}

.tab-content {
    background: white;
    padding: 30px 10px;
    border-left: 1px solid white;
    border-top: 1px solid white;
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 600px;
    background: white;
}
</style>
