<template>
  <div :class="$style.wrap">
    <nav>
      <div v-for="item in categoryRootDatas" :key="item.id">
      <router-link v-if="item.subLevels.length == 0" :class="$style.item" :to="{path:item.url}" :key="item.id">{{item.title}}</router-link>
      <div v-else :class="$style.item">
        <details>
          <summary>{{item.title}}</summary>
          <nav>
            <router-link :class="$style.dItems"  v-for="subLevel in item.subLevels" :to="{path:subLevel.url}" :key="subLevel.id">{{subLevel.title}}</router-link>
          </nav>
        </details>
      </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  computed: {
    categoryRootDatas() {
      return this.$store.getters.getCateGories
    }
  }
}
</script>
<style module lang="postcss">
.wrap {
  box-sizing: border-box;
  min-height: 100%;
  padding: 10px;
}

.item {
  display: block;
  width: 80%;
  max-width: 800px;
  margin: 16px auto;
  border-radius: 6px;
  font-size: 1.1em;
  line-height: 50px;
  text-align: center;
  color: rgba(0, 0, 0, .8);
  background: rgba(255, 255, 255, .4);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
}

.dItems {
  display: block;
  line-height: 40px;

  &:nth-child(odd) {
    background: #eee;
  }
}

@media all and (min-width: 900px) {
  .item {
    margin: 20px auto;
    line-height: 70px;
  }

  .dItems {
    line-height: 60px;
  }
}
</style>
