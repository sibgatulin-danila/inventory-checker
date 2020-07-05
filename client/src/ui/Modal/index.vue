<template>
    <div class="modal-container" v-if="isShow">
        <div class="modal-content">
            <div class="modal-header">
                <h3>{{ header }}</h3>
                <span class="close ml-auto mr-2" @click="close">&times;</span>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        show: {
            type: Boolean,
            default: true,
        },
        header: {
            type: String,
            default: '',
        }
    },
    data: function () {
        return {
            isShow: this.show,
        };
    },
    methods: {
        close: function () {
            this.isShow = false;
        },
    },
};
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
