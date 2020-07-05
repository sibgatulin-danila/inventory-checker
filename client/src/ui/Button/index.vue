<template>
    <button v-bind:class="classes">
        {{ text }}
    </button>
</template>

<script>
import cn from 'classnames';

export default {
    name: 'Button',
    props: {
        text: String,
    },
    data: function () {
        return {
            classes: cn('btn'),
        }
    },
}

</script>