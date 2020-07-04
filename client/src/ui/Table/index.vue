<template>
    <table>
        <thead>
        <th 
            v-for="(header, index) in headers"
            v-bind:key="index"
        >
            {{header}}
        </th>
        </thead>
    
        <tbody>
            <tr
                v-for="(row, index) in rows"
                v-bind:key="index"
            >
                <td
                    v-for="(element, index) in row"
                    v-bind:key="index"
                >
                    {{ element }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Table',
    props: {
        headers: Array,
        rows: Array,
    }
}
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>