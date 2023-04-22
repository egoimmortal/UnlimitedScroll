<template>
  <div class="unlimited-parent">
    <input v-model="currentUser" @keyup.enter="SelectRepos" />
    <div>
      <span>{{ currentUser }} repo list:</span>
    </div>
    <ReposCom v-for="(repos, index) in reposList" :key="index" :data="repos"></ReposCom>
  </div>
</template>

<script lang="ts" setup>
import ReposCom from '@/components/ReposCom.vue';
import Github from '@/api/github';
import { ref } from 'vue';

interface ReposType{
  name: string,
  description: string,
  htmlUrl: string
}

const currentPage = ref(1);
const currentUser = ref('');
const githubData = ref<Promise<unknown>[]>();
const reposList = ref<ReposType[]>([]);

function UpdateRepos(input: Promise<unknown>[] | undefined) {
  if (typeof (input) !== 'object') {
    reposList.value = [];
  } else {
    input.forEach((element: any) => {
      reposList.value.push({
        name: element.name,
        description: element.description,
        htmlUrl: element.html_url,
      });
    });
  }
}

async function SelectRepos() {
  try {
    githubData.value = await Github.GetRepos(currentUser.value, currentPage.value);
  } catch (e) {
    githubData.value = undefined;
  }

  UpdateRepos(githubData.value);
}
</script>

<style lang="scss" scoped>
.unlimited-parent{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
</style>
