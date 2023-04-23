<template>
  <div ref="unlimited" class="unlimited-parent">
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
import { onMounted, onUnmounted, ref } from 'vue';

interface ReposType{
  name: string,
  description: string,
  htmlUrl: string
}

const currentPage = ref(1);
const currentUser = ref('');
const githubData = ref<Promise<unknown>[]>();
const reposList = ref<ReposType[]>([]);
const unlimited = ref();

function UpdateRepos(input: Promise<unknown>[] | undefined) {
  console.log('input = ', input);

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
  reposList.value = [];

  try {
    githubData.value = await Github.GetRepos(currentUser.value, currentPage.value);
  } catch (e) {
    githubData.value = undefined;
  }

  UpdateRepos(githubData.value);
}

async function AddRepos() {
  try {
    githubData.value = await Github.GetRepos(currentUser.value, currentPage.value);
  } catch (e) {
    githubData.value = undefined;
  }

  UpdateRepos(githubData.value);
}

function Scroll() {
  // console.log(window);
  if (currentUser.value === '') return;
  console.log(window.innerHeight);
  console.log(window.scrollY);
  console.log(unlimited.value.clientHeight);
  if (window.innerHeight + window.scrollY >= unlimited.value.clientHeight) {
    currentPage.value += 1;
    AddRepos();
    console.log('currentPage.value = ', currentPage.value);
  }
}

onMounted(() => {
  Scroll();

  window.addEventListener('scroll', Scroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', Scroll);
});
</script>

<style lang="scss" scoped>
.unlimited-parent{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #E0E0E0;
}
</style>
