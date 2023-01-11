<template>
  <div class="author">
    <a
      class="author--github"
      target="_blank"
      href="https://github.com/pow3r-prog"
      >GitHub</a
    >
    <div class="author--name">Volodymyr</div>
    <img
      class="author--photo"
      src="../assets/photoVolodymyr.jpg"
      alt="photoVolodymyr"
    />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.author {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 5px 15px;

  &--github {
    font-size: 18px;
  }

  &--name {
    font-size: 22px;
    color: $color-aqua;
    margin: 0 25px;
  }

  &--photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
