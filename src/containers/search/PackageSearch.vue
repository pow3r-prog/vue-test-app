<template>
  <div class="input-group mb-3 input">
    <input
      type="text"
      class="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-default"
      placeholder="Name"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  modelValue: String,
})
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.input {
  width: 50%;
  margin-top: 50px;

  @media (max-width: $size-small) {
    width: 100%;
  }
}
</style>
