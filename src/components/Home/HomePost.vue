<template>
  <section :class="$style['article']">
    <header :class="$style['header']">
      <h4>推荐文章</h4>
      <router-link :class="$style['header-link']" to="/posts" >更多文章</router-link>
    </header>
    <ul :class="$style.main">
      <li
        v-lazy:background-image="item.headPortrait"
        v-for="item in categoryRecommend"
        :class="$style['main-item']"
        :key="item.id"
        @click="$router.push(`/posts/${item.id}`)"
      >
        <!-- <a v-html="item.headPortrait"/> -->
        <p :class="$style['main-item-txt']">{{ item.contentDescribe }}</p>
        <span :class="$style['main-item-category']">{{ $moment(item.createTime).format('YYYY-MM-DD HH:MM') }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    categoryRecommend() {
      return this.$store.getters.getPostsWithTitleData
    }
  }
}
</script>

<style module lang="postcss">
.article {
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
  height: 430px;
}

.main-item {
  position: relative;
  margin: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: white;
  height: 15%;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}

.main-item-txt {
  position: relative;
  padding: 0 10px;
  width: 85%;
  text-align:left;
  border-radius: 4px;
  overflow: hidden;
  font-size: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.main-item-category {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 180px;
  height: 20px;
  display: inline-block;
  border-radius: 6px;
  text-align:right;
  font-size: 1em;
  line-height: 1.5;
}
.main-item-category-author {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20%;
  height: 20px;
  display: inline-block;
  text-align:left;
  border-radius: 6px;
  font-size: 1em;
  line-height: 1.5;
}
@media all and (min-width: 900px) {
  .main {
    height: 670px;
  }

  .main-item-txt {
    line-height: 100px;
  }
}
</style>
