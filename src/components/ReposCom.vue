<template>
  <div class="repos-parent">
    <span>{{ data.name }}</span>
    <span>{{ data.description }}</span>
    <span>{{ data.htmlUrl }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  data:{
    name: string,
    description: string,
    htmlUrl: string
  }
}>();
</script>

<style lang="scss" scoped>
.repos-parent{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
}
</style>
