<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active' : !register }">
          <a @click.prevent="register = false">
            Login
          </a>
        </li>
        <li :class="{ 'is-active' : register }">
          <a  @click.prevent="register = true">
            Register
          </a>
        </li>
      </ul>
    </div>

    <form
      @submit.prevent="onSubmit"
    >
      <div class="card auth-form">
        <div class="card-content">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
              v-model="credentials.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
                required
              >
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input"
                type="password"
                placeholder="Enter a password"
                minlength="6"
                required
                >
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button
                class="button is-primary"
                type="submit"
                >
                {{ formTitle }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>

/* 
  imports
*/

  import { ref, computed, reactive } from 'vue'
  import { useStoreAuth } from '@/stores/storeAuth'

/* 
  stores
*/

  const storeAuth = useStoreAuth()

/* 
  login / register
*/

  const register = ref(false)

/* 
  form title
*/

  const formTitle = computed(() => {
    return register.value ? 'Register' : 'Login'
  })

/* 
  credentials
*/

  const credentials = reactive({
    email: '',
    password: ''
  })

/* 
  submit
*/

  const onSubmit = () => {
    if(register.value) {
      storeAuth.registerUser(credentials)
    }
    else {
      storeAuth.loginUser(credentials)
    }
  }

</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>