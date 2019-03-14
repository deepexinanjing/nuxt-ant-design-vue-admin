<template>
  <a-layout-sider
    v-model="collapsed"
    :trigger="null"
    class="SiderMenu"
    collapsible
  >
    <div class="logo">
      <img
        src="../../static/logo.png"
        alt="logo"
      >
      <a-tooltip placement="rightTop">
        <template slot="title">
          <span>Admin</span>
        </template>
        <span
          v-if="!collapsed"
          class="testOverflow"
        >
          Admin
        </span>
      </a-tooltip>
    </div>

    <a-menu
      :default-open-keys="openKeys"
      :open-keys="openKeys"
      :selected-keys="selectedKeys"
      @openChange="onOpenChange"
      @select="jump"
      theme="dark"
      mode="inline"
    >
      <template v-for="item in menuList">
        <template v-if="!item.hidden">
          <a-menu-item
            v-if="!item.children"
            :key="item.name"
          >
            <!-- <a-icon :type="item.meta.icon" /> -->
            <!-- <span>{{ item.meta.name }}</span> -->
            <span>{{ item.name }}</span>
          </a-menu-item>
          <sub-menu
            v-else
            :key="item.name"
            :menu-info="item"
          />
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import SubMenu from './SubMenu'

export default {
  name: 'SiderMenu',
  components: { SubMenu },
  props: {
    collapsed: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      menuList: [],
      openKeys: [],
      rootSubmenuKeys: [],
      selectedKeys: [],
      subMenuCollapsed: true // 手风琴
    }
  },
  watch: {
    $route() {
      this.updateDefaultKeys(this.$route.name)
    }
  },
  created() {
    this.menuList = this.$router.options.routes
    this.rootSubmenuKeys = this.menuList.map(menu => menu.name)
  },
  mounted() {
    this.updateDefaultKeys(this.$route.name)
  },
  methods: {
    updateDefaultKeys(key) {
      const routerName = key.split('_')
      this.openKeys = [routerName[0]]

      if (routerName.length < 3) {
        this.selectedKeys = [this.$route.name]
        return
      }
      this.selectedKeys = [routerName.slice(0, routerName.length - 1).join('_')]
    },
    jump({ key }) {
      this.updateDefaultKeys(key)

      if (this.$route.name === key) return

      this.$router.push({
        name: key
      })
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      )

      if (!this.subMenuCollapsed) {
        this.openKeys = openKeys
        return
      }

      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  }
}
</script>

<style scoped>
.SiderMenu {
  height: 100vh;
}

.SiderMenu .logo {
  display: flex;
  justify-content: center;
  background-color: #002140;
  height: 64px;
  padding: 16px;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.SiderMenu .logo img {
  height: 100%;
}

.SiderMenu .logo span {
  height: 100%;
  text-indent: 10px;
  font-size: 20px;
}

.testOverflow {
  width: 10em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
