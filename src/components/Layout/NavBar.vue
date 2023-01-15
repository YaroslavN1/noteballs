<template>
  <nav
      class="navbar is-success"
      role="navigation"
      aria-label="main navigation">
      <div class="container is-max-desktop px-2">
        <div class="navbar-brand">
          <div class="navbar-item is-size-4 is-family-monospace">
            _noteballs
          </div>

          <a
            @click.prevent="showMobileNav = !showMobileNav"
            role="button"
            class="navbar-burger"
            :class="{ 'is-active' : showMobileNav }"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            ref="navBarBurgerRef"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
    
        <div
          id="navbarBasicExample"
          class="navbar-menu"
          :class="{ 'is-active' : showMobileNav }"
          ref="navBarMenuRef"
          >
          <div class="navbar-start">
              <p class="control">
                <button
                  v-if="storeAuth.user.id"
                  @click="logout"
                  class="button is-light is-small m-3"
                  type="submit"
                  >
                    Logout
                </button>
              </p>
              <span
                 v-if="storeAuth.user.id"
                class="user-email"
              >
                  {{ storeAuth.user.email }}
                </span>
          </div>

          <div class="navbar-end">
            <RouterLink
              @click="showMobileNav = false"
              to="/"
              class="navbar-item"
              active-class="is-active"
              >
                Notes
            </RouterLink>
    
            <RouterLink
              @click="showMobileNav = false"
              to="/stats"
              class="navbar-item"
              active-class="is-active"
              >
                Stats
            </RouterLink>
          </div>
        </div>
      </div>
  </nav>
</template>


<script setup>
/* 
  imports
*/

  import { ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useStoreAuth } from '@/stores/storeAuth'

/* 
  stores
*/

  const storeAuth = useStoreAuth()

/*
  mobile navbar
*/

  const showMobileNav = ref(false)

/* 
  close on click outside
*/

  const navBarMenuRef = ref(null)
  const navBarBurgerRef = ref(null)

  onClickOutside(navBarMenuRef, () => {
    showMobileNav.value = false
  }, {
    ignore: [navBarBurgerRef]
  })

/* 
  logout
*/

  const logout = () => {
    storeAuth.logoutUser()
  }

</script>


<style>

.user-email {
  margin: auto 0;
}

@media (max-width: 1023px){
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  
  }
}

</style>