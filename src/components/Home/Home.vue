<template>
  <div>
    <HomeBanner />
    <!-- <HomeMenu /> -->
    <HomeCategory />
    <HomePost />
  </div>
</template>
<script>
import HomeBanner from './HomeBanner'
import HomeMenu from './HomeMenu'
import HomePost from './HomePost'
import HomeCategory from './HomeCategory'

export default {
  components: {
    HomeBanner,
    HomeMenu,
    HomePost,
    HomeCategory
  }
}
</script>
