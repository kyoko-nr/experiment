<template>
  <ul>
    <li v-for="item in list">
      <Checkbox :label="item.label" :value="item.value" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import Checkbox from "./Checkbox.vue";
defineProps<{
  list: {
    label: string,
    value: string
  }[]
}>()

</script>

<style scoped>
ul {
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.5);
  display: inline-block;
  min-width: 240px;
}
li {
  list-style: none;
  color: #fff;
}
</style>./Checkbox.vue