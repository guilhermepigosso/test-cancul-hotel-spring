<template>
  <div id="app">
    <div class="login-page">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div class="card login">
              <h1>Welcome to the Hotel Cancun!</h1>
              <form class="form-group">
                <input v-model="username" type="text" class="form-control" placeholder="Username" required>

                <input type="button" class="btn btn-primary" @click="doLogin" value="Login">

                <div>
                  <span style="color: red; font-style: italic;">For the test purpose! Available logins are: sophia_jackson / emma_black / asmith</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        props: {},
        data() {
            return {
                urlApi: null,
                username: null
            }
        },
        methods: {
            doLogin() {
                this.$loading(true);
                this.axios.get(`${this.urlApi}/user/${this.username}`).then(response => {
                    this.$store.state.message = {
                        type: null,
                        message: null
                    };

                    this.$store.state.user = response.data;

                    this.$router.push({path: '/mybookings'});
                }).catch((error) => {
                    this.$store.state.message = {
                        type: 'error',
                        message: error.response.data
                    }
                }).finally(() => {
                    this.$loading(false);
                });
            }
        },
        mounted() {
            this.$store.state.message = {
                type: null,
                message: null
            };

            this.urlApi = process.env.VUE_APP_ROOT_API;
            this.$store.state.user = null;
        }
    }
</script>

<style lang="scss">

  .login-page {
    display: flex;
    height: 100vh;
    align-items: center;

    h1 {
      margin-bottom: 1.5rem;
    }

    .wallpaper-login {
      background: url('~@/assets/cancun.jpg') no-repeat center center;
      background-size: cover;
      height: 100%;
      width: 100%;
      position: absolute;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  }

  p {
    line-height: 1rem;
  }

  .form-group {
    input {
      margin-bottom: 20px;
    }
  }

  .card {
    padding: 20px;
  }

  .error {
    animation-name: errorShake;
    animation-duration: 0.3s;
  }

  @keyframes errorShake {
    0% {
      transform: translateX(-25px);
    }
    25% {
      transform: translateX(25px);
    }
    50% {
      transform: translateX(-25px);
    }
    75% {
      transform: translateX(25px);
    }
    100% {
      transform: translateX(0);
    }
  }

</style>
