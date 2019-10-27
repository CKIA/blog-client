<template>
  <ul :class="$style['menu']">
    <li
      v-for="item in getCateGories"
      :key="item.title"
      :class="$style['item']"
      @click="$router.push(item.url)"
    >
      <div :class="$style['title']">{{ item.name }}</div>
      <p :class="$style['des']">{{ item.title }}</p>
    </li>
  </ul>
</template>
<script>
export default {
  computed: {
    getCateGories() {
      return this.$store.getters.getCateGories
    }
  }
}
</script>

<style module lang="postcss">
.menu {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  font-size: 1.1em;
  text-align: center;
}

.item {
  width: 25%;
  cursor: pointer;
}

.title {
  display: inline-block;
  width: 40px;
  margin: 6px 0;
  border-radius: 50%;
  line-height: 40px;
  color: white;
}

@media all and (min-width: 900px) {
  .title {
    width: 50px;
    margin: 10px 0;
    line-height: 50px;
  }
}

.item:nth-child(1) .title {
  background-color: #7fdbff;
}

.item:nth-child(2) .title {
  background-color: #ff4136;
}

.item:nth-child(3) .title {
  background-color: #f012be;
}

.item:nth-child(4) .title {
  background-color: #3d9970;
}

.item:nth-child(5) .title {
  background-color: #0074d9;
}

.item:nth-child(6) .title {
  background-color: #ff851b;
}

.item:nth-child(7) .title {
  background-color: #85144b;
}

.item:nth-child(8) .title {
  background-color: #aaa;
}
</style>
