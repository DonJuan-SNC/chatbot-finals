<template>
  <div class="d-flex justify-center align-center" style="min-height: 100vh; background-color: #0C1618;">
    <v-card
      class="pa-8"
      elevation="10"
      max-width="500"
      width="100%"
      rounded="xl"
    >
      <div class="text-center mb-6">
        <h2 class="font-weight-bold mb-1">Welcome to Beyond the Grave</h2>
        <p class="text-subtitle-1 text--secondary">Sign in to continue</p>
      </div>

      <v-form ref="form">
        <v-text-field
          v-model="email"
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          density="comfortable"
          :rules="[rules.required, rules.email]"
          class="mb-4"
        />

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          label="Password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          density="comfortable"
          :rules="[rules.required]"
          class="mb-6"
          @click:append-inner="togglePassword"
        />

        <v-btn
          color="primary"
          block
          size="large"
          elevation="2"
          class="mb-4"
          @click="login"
        >
          Sign In
        </v-btn>

        <div class="d-flex align-center my-4">
          <v-divider class="flex-grow-1"></v-divider>
          <span class="mx-3 grey--text">or</span>
          <v-divider class="flex-grow-1"></v-divider>
        </div>

        <v-btn
          color="red darken-1"
          block
          size="large"
          class="mb-3"
          @click="signInWithGoogle"
        >
          <v-icon left>mdi-google</v-icon>
          Continue with Google
        </v-btn>

        <v-btn
          color="black"
          block
          size="large"
          @click="signInWithGitHub"
        >
          <v-icon left>mdi-github</v-icon>
          Continue with GitHub
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "auth",
  middleware: "guest",
  data() {
    return {
      email: '',
      password: '',
      visible: false,
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+\..+/.test(v) || 'Enter a valid email'
      }
    }
  },
  methods: {
    togglePassword() {
      this.visible = !this.visible
    },
    login() {
      if (this.$refs.form.validate()) {
        // Add your login logic here
        // this.$auth.loginWith('local', {
        //   data: { email: this.email, password: this.password }
        // })
        console.log('Logging in with:', this.email)
      }
    },
    signInWithGoogle() {
      this.$auth.loginWith('google', {
        params: { prompt: 'select_account' }
      }).then(() => {
        const user = this.$auth.user
        if (user?.name) {
          localStorage.setItem('user', JSON.stringify({ name: user.name }))
        }
      }).catch(err => {
        console.error('Google sign-in error:', err)
      })
    },
    signInWithGitHub() {
      this.$auth.loginWith('github')
        .then(() => {
          const user = this.$auth.user
          if (user?.name) {
            localStorage.setItem('user', JSON.stringify({ name: user.name }))
          }
        }).catch(err => {
          console.error('GitHub sign-in error:', err)
        })
    }
  }
}
</script>

<style scoped>
.text--secondary {
  color: #757575;
}
</style>
