<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data"
        :key="item.name"
        @click="$emit('openPopup', openPopupByName(item.name))"
        data-bs-toggle="modal"
        data-bs-target="#itemModal"
      >
        <td>{{ item.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps(['name', 'data', 'openPopupByName'])
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.table {
  th,
  td {
    color: $color-aqua;
  }

  td {
    cursor: pointer;
    &:hover {
      background: $color-grey;
    }
  }
}
</style>
