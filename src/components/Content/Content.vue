<template>
  <!-- <BaseBack @click.native="$router.push('/categories')">类别列表</BaseBack>
  <BaseTitle>{{ category.name }}知识体系</BaseTitle> -->
  <article v-html="content" />
</template>
<script>
import BaseBack from '@/common/BaseBack'
import BaseTitle from '@/common/BaseTitle'
import { LOAD_CONTENT_ASYNC } from '@/components/Content/module'
export default {
  asyncData({ store, route }) {
    return store.dispatch(LOAD_CONTENT_ASYNC,route.params.contentId)
  },
  data() {
      return {//value的值是经过markdown解析后的文本，可使用`@change="changeData"`在控制台打印显示
          value: `<blockquote>
                <p>你好</p>
                </blockquote>
                <p><code>java</code></p>`,
          defaultData: "preview"
      }
  },
  components: {
    BaseBack,
    BaseTitle
  },
  computed: {
    content() {
      console.log(this.$store.getters.getContent)
      return this.$store.getters.getContent
    }
  }
}
</script>