<template>
  <div class="" v-if="show">
    <div class="col-12">
      <ul class="nav">
        <li class="nav-item">
            <a href="#" class="nav-link">Главная</a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link">Список оборудования</a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link">О приложении</a>
        </li>
        <li class="nav-item ml-auto">
            <a href="#" class="nav-link">Вход</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        show: {
          type: Boolean,
          default: true,
        },
    },
}
</script>
