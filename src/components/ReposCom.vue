<template>
  <div class="repos-parent">
    <span>{{ data.name }}</span>
    <span>{{ data.description }}</span>
    <a :href="data.htmlUrl" target="_blank">{{ data.htmlUrl }}</a>
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
  justify-content: center;
  width: 80%;
  height: 130px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #FFFFFF;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
</style>
