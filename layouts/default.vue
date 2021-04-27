<template>
  <div class="app">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'LayoutStandard',
  components: { Header },
}
</script>
