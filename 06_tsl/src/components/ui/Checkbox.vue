<template>
  <label class="label">
    <input type="checkbox" :name="value" :id="value" :value="value" @click="onClick">
    {{ label }}
  </label>
</template>

<script setup lang="ts">
  defineProps<{
    label: string,
    value: string
  }>()

  const onClick = (e: Event) => {
    const target = e.target as HTMLInputElement
    console.log("on click", target.value, target.checked)
  }
</script>

<style scoped>
.label {
  cursor: pointer;
}
</style>