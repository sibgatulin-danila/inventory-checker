<template>
    <div class="container">
        <Header />
        <Equipment />
    </div>    
</template>

<script>
import { Equipment } from 'components';
import { Header } from 'ui';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

export default {
    name: 'App',
    components: {
        Equipment,
        Header
    }
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
