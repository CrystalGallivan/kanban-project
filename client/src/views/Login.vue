<template>
  <div class="login container-fluid">
    <header id="title">Fidget</header>
    <div class="row d-flex justify-content-center">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <form v-if="loginForm" @submit.prevent="loginUser">
              <input type="email" v-model="creds.email" placeholder="email">
              <input type="password" v-model="creds.password" placeholder="password">
              <button class="btn btn-dark btn-sm" type="submit">Login</button>
            </form>
            <form v-else @submit.prevent="register">
              <input type="text" v-model="newUser.name" placeholder="name">
              <input type="email" v-model="newUser.email" placeholder="email">
              <input type="password" v-model="newUser.password" placeholder="password">
              <button type="submit">Create Account</button>
            </form>
            <div class="action" @click="loginForm = !loginForm">
              <p v-if="loginForm">No account? Click here to Register</p>
              <p v-else>Already have an account? Click here to Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style scoped>
.action {
  cursor: pointer;
}

.card {
  background-color: #3f443041;
  margin-top: 200px;
  color: white;
  display: flex;
  justify-content: center;
}

#title {
  font-family: "Pacifico", cursive;
  font-size: 4rem;
  color: #3f4430;
}

.login {
  background-image: url(https://images.unsplash.com/photo-1482192505345-5655af888cc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80);
  min-height: 100vh;
  background-attachment: fixed;
  background-size: contain;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>