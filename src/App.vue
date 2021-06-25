<template>
  <transition name="fade">
    <div id="app" class="wallpaper-login">
      <vue-confirm-dialog></vue-confirm-dialog>

      <div class="container" style="padding-top: 20px; margin-bottom: -35px;" v-if="this.$store.state.message.type != null">
        <div class="alert alert-danger" v-if="this.$store.state.message.type == 'error'">
          <p class="mb-0 small">{{this.$store.state.message.message}}</p>
        </div>
        <div class="alert alert-success" v-if="this.$store.state.message.type == 'success'">
          <p class="mb-0 small">{{this.$store.state.message.message}}</p>
        </div>
      </div>

      <div id="nav" v-if="this.$store.state.user != null">
        <router-link to="/mybookings">My bookings</router-link>
        |
        <router-link to="/book">Book</router-link>
        |
        <router-link to="/">Logout</router-link>
      </div>

      <router-view/>
    </div>
  </transition>
</template>

<script>
    export default {
        name: 'App',
        props: {}
    }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #F60402;
      }
    }
  }

  .wallpaper-login {
    background: url('~@/assets/cancun.jpg') no-repeat center center;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: absolute;
  }

</style>
