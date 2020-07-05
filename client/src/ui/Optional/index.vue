<template>
    <div v-if="condition">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Optional',
    props: {
        condition: {
            type: Boolean,
            default: true,
        }
    }
}
</script>