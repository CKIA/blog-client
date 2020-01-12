<template>
  <section :class="$style['category']">
    <header :class="$style['header']">
      <h4>类别推荐</h4>
      <router-link :class="$style['header-link']" to="/categories" >更多类别</router-link>
    </header>
    <ul
      v-lazy:background-image="require('@/assets/imgs/match-bg.jpg')"
      :class="$style['main']"
    >
      <li
        v-for="item in categoryDatas"
        :class="$style['main-item']"
        :key="item.id"
        @click="$router.push(item.url)"
      >
        <p>{{ item.title }}</p>
        <p>{{ item.total }}篇文章</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    getFilterPosts() {
      return this.$store.getters.getPostsFilterByCategoryNumber
    },
    categoryDatas() {
      return this.$store.getters.getCateGories
    }
  }
}

</script>

<style module lang="postcss">
.category {
  box-sizing: border-box;
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  line-height: 20px;
  cursor: default;
}

.header-link {
  font-size: 1em;

  &::after {
    margin-left: 2px;
    content: '>';
  }
}

.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 6px;
  background-position: 50% 50%;
  background-size: cover;
}

.main-item {
  display: inline-block;
  box-sizing: border-box;
  width: calc(100% / 3);
  height: 100px;
  padding: 20px 10px;
  border: 1px solid white;
  font-size: 1.1em;
  line-height: 30px;
  text-align: center;
  color: white;
  cursor: pointer;
}

@media all and (min-width: 900px) {
  .main-item {
    height: 120px;
    line-height: 40px;
  }
}

.main-item:nth-child(1),
.main-item:nth-child(5),
.main-item:nth-child(8) {
  background-color: rgba(220, 129, 55, .8);
}

.main-item:nth-child(2),
.main-item:nth-child(4),
.main-item:nth-child(6) {
  background-color: rgba(38, 191, 142, .8);
}

.main-item:nth-child(3),
.main-item:nth-child(7) {
  background-color: rgba(72, 137, 199, .8);
}

.main-item:nth-child(7) {
  flex: 1;
}
</style>
