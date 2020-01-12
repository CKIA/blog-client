<template>
  <!-- <BaseBack @click.native="$router.push('/categories')">类别列表</BaseBack>
  <BaseTitle>{{ category.name }}知识体系</BaseTitle> -->
  <article v-html="value" />
</template>
<script>
import BaseBack from '@/common/BaseBack'
import BaseTitle from '@/common/BaseTitle'
export default {
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
    methods: {
    }
}
</script>