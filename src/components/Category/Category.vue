<template>
  <article v-if="category" :class="$style.box">
    <BaseBack @click.native="$router.push('/categories')">类别列表</BaseBack>
    <BaseButton
      :class="$style.basebutton"
      @click.native="$router.push('/content/add')"
    >添加文章</BaseButton>
    <BaseTitle>{{ category.name }}知识体系</BaseTitle>
    
    <section :class="$style.main">
      <p :class="$style.description">{{ category.description }}</p>
      <p :class="$style['bread-crumb']">{{category.name}}</p>
      <dl v-for="(item, index) in category.contentDtoList" :key="index">
        <dd :key="item.id"
          :class="$style.item"
          @click="$router.push({
            name:'content',
            params:{ contentId: item.id, parentPath: $route.path }
          })"
        >{{ item.contentDescribe }}</dd>
      </dl>
    </section>
  </article>
</template>
<script>
import BaseBack from '@/common/BaseBack'
import BaseTitle from '@/common/BaseTitle'
import { LOAD_CATEGORIE_ONE_ASYNC } from '@/components/Category/module'
import BaseButton from '@/common/BaseButton'

export default {
  asyncData({ store, route }) {
    return store.dispatch(LOAD_CATEGORIE_ONE_ASYNC,route.params.number)
  },
  components: {
    BaseBack,
    BaseTitle,
    BaseButton
  },
  methods: {
  },
  computed: {
    paramsNumber() {
      return this.$route.params.number
    },
    category() {
      return this.$store.getters.getCategoryOne
    },
    childCategories() {
      return this.$store.getters.getPosterityCategories(Number(this.paramsNumber))
    }
  }
}
</script>
<style  module lang="postcss">
.box {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  font-size: 1.1em;
  line-height: 2.2;
}

.main {
  flex: 1;
  width: 100%;
  margin-top: 10px;
  overflow-y: auto;
}

.description {
  margin-bottom: 10px;
  white-space: pre-wrap;
}

.bread-crumb {
  border-radius: 4px;
  line-height: 50px;
  color: rgba(0, 0, 0, .6);
  background: #eee;
  cursor: default;
}

.item {
  overflow: hidden;
  line-height: 50px;
  text-overflow: ellipsis;
  text-indent: 2em;
  white-space: nowrap;
  color: rgba(0, 0, 0, .8);
  cursor: pointer;

  &:nth-of-type(odd) {
    background-color: #fff;
  }
}
button.basebutton {
  margin: 0 4px;
  font-size: 1em;
  color: rgba(0, 0, 0, .8);
  background: #f5f5f5;
  width: 100px;
}
</style>
