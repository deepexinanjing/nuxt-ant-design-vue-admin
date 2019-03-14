<template>
  <a-layout id="layout-trigger">
    <sider-menu :collapsed="collapsed" />

    <a-layout :class="collapsed ? 'layout-container left80':'layout-container'">
      <PageHeader
        :collapsed="collapsed"
        @trigger="(val) => {collapsed = val}"
      />
      <a-layout-content class="outer-container">
        <div class="inner-container">
          <nuxt />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import PageHeader from './Header/index'
import SiderMenu from './SiderMenu'

export default {
  components: {
    PageHeader,
    SiderMenu
  },
  data() {
    return {
      collapsed: false
    }
  }
}
</script>

<style scoped>
#layout-trigger {
  width: 100%;
  height: 100%;
}

#layout-trigger .outer-container {
  position: relative;
  margin: 0 16px;
  min-height: 300px;
  padding-top: 16px;
  overflow: hidden;
}

#layout-trigger .inner-container {
  position: absolute;
  left: 0;
  top: 16px;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

.layout-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 200px;
  right: 0;
  transition: 0.3s;
}

.left80 {
  left: 80px;
}
</style>
