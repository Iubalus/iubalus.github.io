<script lang="ts">
export default {
    name: "Tab",
    props: {
        headerKey: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<template>
    <div :class="['tab', active ? 'active' : '']">
        <span><font-awesome-icon :icon="icon"/>{{ $t(headerKey) }}</span>
        <div v-show="active" class="tab-content">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
$primary: #83868e;
$highlight: #78f178;
$theme: $primary;
$inactive: #cdcdcd;
$border: darken($inactive, 25%);
$tab-color: darken($theme, 40%);
$body: $theme;
$bubble-color: lighten($theme, 25%);
$social: $highlight;

.tab {
    border-top: solid 1px $border;
    border-right: solid 1px $border;
    font-family: monospace;
    min-width: 150px;
    color: $tab-color;
    background: $inactive;
    padding: 8px 10px;
    border-left: none;

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
        color: darken($tab-color, 15%);
    }

    i {
        padding-right: 10px;
    }
}

.tab-content {
    background: white;
    padding: 30px 10px;
    border-left: 1px solid white;
    border-top: 1px solid white;

    .tab-content {
        overflow-x: hidden;
        overflow-y: auto;
        padding: 10px;
        display: none;
        min-height: 600px;
        background: white;

        &.active {
            display: block;
        }
    }
}
</style>
