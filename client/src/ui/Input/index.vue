<template>
    <div class="form-group">
        <label for="exampleInputEmail1" v-if="label">{{ label }}</label>
        <input v-bind:type="type" class="form-control" v-bind:placeholder="placeholder" v-model="inputValue" />
    </div>
</template>

<script>
export default {
    name: 'Input',
    props: {
        type: {
            type: String,
            defalut: 'text',
        },
        name: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        onChange: {
            type: Function,
            default: () => {},
        },
    },
    data: function () {
        return {
            inputValue: this.value,
        };
    },
    watch: {
        inputValue: function (newVal) {
            this.onChange({ value: newVal, name: this.name });
        },
    },
    // methods: {
    //     handleChange: function () {
    //         console.log(this.inputValue);
    //     }
    // }
};
</script>
