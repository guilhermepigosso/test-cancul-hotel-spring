<template>
  <div id="app">
    <div class="content-page">
      <div class="container">
        <div class="row">
          <div class="col-md-10 col-sm-12 mx-auto">
            <div class="card login">
              <h1>My Bookings</h1>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Creation Date</th>
                    <th scope="col">Modification Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="booking in bookings">
                      <th scope="row">{{booking.id}}</th>
                      <td>{{formatDate(booking.startDate)}}</td>
                      <td>{{formatDate(booking.endDate)}}</td>
                      <td>{{formatFullDate(booking.creationDate)}}</td>
                      <td>{{formatFullDate(booking.modificationDate)}}</td>
                      <td>{{booking.active ? 'Active' : 'Inactive'}}</td>
                      <td>
                        <font-awesome-icon icon="calendar-alt" style="font-size: 20px; margin-right: 10px;" v-if="booking.active" @click="modify(booking)" />
                        <font-awesome-icon icon="calendar-times" style="font-size: 20px;" v-if="booking.active" @click="cancelBooking(booking.id)" />
                      </td>
                  </tr>
                  <tr v-if="bookings.length == 0">
                      <td scope="row" colspan="7" style="text-align: center">There is no booking available!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: 'MyBookings',
        props: {},
        data() {
            return {
                urlApi: null,
                bookings: []
            }
        },
        methods: {
            findAllBookings() {
                this.$loading(true);

                this.axios.get(`${this.urlApi}/book/${this.$store.state.user.id}/listAll`).then(response => {
                    this.bookings = response.data;
                }).catch((error) => {
                    this.$store.state.message = {
                        type: 'error',
                        message: error.response.data
                    }
                }).finally(() => {
                    this.$loading(false);
                });
            },
            cancelBooking(id) {
                this.$confirm(
                    {
                        message: "Are you sure you want to cancel the booking number " + id + "?",
                        button: {
                            no: 'No',
                            yes: 'Yes'
                        },
                        /**
                         * Callback Function
                         * @param {Boolean} confirm
                         */
                        callback: confirm => {
                            if (confirm) {
                                this.$loading(true);
                                this.axios.get(`${this.urlApi}/cancelbook/${id}`).then(response => {
                                    this.$store.state.message = {
                                        type: 'success',
                                        message: "Booking cancelled with success!"
                                    };

                                    this.findAllBookings();
                                }).catch((error) => {
                                    this.$store.state.message = {
                                        type: 'error',
                                        message: error.response.data
                                    }
                                }).finally(() => {
                                    this.$loading(false);
                                });
                            }
                        }
                    }
                )
            },
            formatDate(dateString) {
                if (dateString) {
                    return moment(String(dateString)).format('MM/DD/YYYY');
                }
            },
            formatFullDate(dateString) {
                if (dateString) {
                    return moment(String(dateString)).format('MM/DD/YYYY hh:mm');
                }
            },
            modify(bookModify) {
                this.$store.state.book = bookModify;
                this.$router.push({path: '/book'});
            }
        },
        mounted() {
            if(this.$store.state.user == null) {
                this.$loading(false);
                this.$router.push({path: '/'});
                return;
            }

            this.urlApi = process.env.VUE_APP_ROOT_API;
            this.findAllBookings();

            if(this.$store.state.message.type != null) {
                setTimeout(function () {
                    this.$store.state.message = {
                        type: null,
                        message: null
                    };
                }.bind(this), 5000)
            }
        }
    }
</script>

<style lang="scss">

  .content-page {
    display: flex;
    padding-top: 20px;

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
