<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: { DatePicker },
    props: {
        value: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            defalut: '',
        },
        placeholder: {
            type: String,
            defalut: '',
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
};
</script>

<template>
    <div class="form-group">
        <label v-if="label">{{ label }}</label>
        <br />
        <date-picker
            v-bind:placeholder="placeholder"
            v-model="inputValue"
            valueType="format"
        ></date-picker>
    </div>
</template>
