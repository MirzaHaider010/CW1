<template>
  <div>
    <LessonList />
  </div>
</template>

<script>
// @ is an alias to /src
import LessonList from "@/components/LessonList.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    LessonList,
  },
};
</script>
