<template>
  <div id="app">
    <div class="content-page">
      <div class="container">
        <div class="row">
          <div class="col-md-10 col-sm-12 mx-auto">
            <div class="card login">
              <h1>Booking!</h1>

              <functional-calendar ref="Calendar" :is-multiple='true'
                                   :calendars-count='2'
                                   :is-date-range='true'
                                   :maxSelDays="3"
                                   :enabledDates="availableDates"
                                   v-model="dataInput"
                                  :dateFormat="'yyyy-mm-dd'">
              </functional-calendar>

              <input type="button" class="btn btn-primary" @click="book" value="Book" style="margin-top: 20px; cursor: pointer;">
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal ref="modalEmail">
      <template v-slot:header>
        <h5 class="card-title">Email confirmation</h5>
      </template>

      <template v-slot:body>
        <p class="card-text" style="text-align: justify">Do you want to receive an email from the booking?</p>
        <form class="form-group">
          <input v-model="email" type="email" class="form-control" placeholder="Email" required>
        </form>
      </template>

      <template v-slot:footer>
        <div style="float: right">
          <button type="button" class="btn btn-success" style="margin-right: 20px;" @click="finalizeBooking(false)">Book with email</button>
          <button type="button" class="btn btn-light" @click="finalizeBooking(true)">Book without email</button>
        </div>
      </template>
    </modal>

  </div>
</template>

<script>
    import moment from 'moment'
    import Modal from "../../components/Modal";

    export default {
        name: 'Book',
        components: {
            Modal
        },
        props: {},
        data() {
            return {
                urlApi: null,
                dataInput: {
                },
                email: null,
                availableDates: []
            }
        },
        methods: {
            findAvailableDates() {
                this.axios.get(`${this.urlApi}/availability/1`).then(response => {
                    response.data.forEach(el => {
                        let dataTemp = parseInt(el.substring(0,4)) + '-' + parseInt(el.substring(6, 8)) + '-' + parseInt(el.substring(8, 10));
                        this.availableDates.push(dataTemp);
                    });
                }).catch((error) => {
                    this.$store.state.message = {
                        type: 'error',
                        message: error.response.data
                    }
                });
            },
            book() {
                this.$store.state.message = {
                    type: null,
                    message: null
                };

                if(this.dataInput != null && this.dataInput.dateRange != null && this.dataInput.dateRange.start != null) {
                    let from = this.dataInput.dateRange.start.split("-")[1] + "/" + this.dataInput.dateRange.start.split("-")[2] + "/" + this.dataInput.dateRange.start.split("-")[0];

                    let message;
                    if(this.dataInput.dateRange.end != null && this.dataInput.dateRange.end != "") {
                        let to = this.dataInput.dateRange.end.split("-")[1] + "/" + this.dataInput.dateRange.end.split("-")[2] + "/" + this.dataInput.dateRange.end.split("-")[0];
                        message = "Are you sure you want to book from " + from + " to " + to + "?";
                    } else {
                        message = "Are you sure you want to book to " + from + "?";
                    }

                    this.$confirm(
                        {
                            message: message,
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
                                    this.$refs.modalEmail.openModal();
                                }
                            }
                        }
                    )
                } else {
                    this.$store.state.message = {
                        type: 'error',
                        message: 'Select at least one day to proceed!'
                    }
                }
            },
            finalizeBooking(sendEmail) {
                let newBook = {
                    endDate: this.formatDateBook(this.dataInput.dateRange.end != null && this.dataInput.dateRange.end != "" ? this.dataInput.dateRange.end : this.dataInput.dateRange.start),
                    roomId: 1,
                    startDate: this.formatDateBook(this.dataInput.dateRange.end != null && this.dataInput.dateRange.end != "" ? this.dataInput.dateRange.end : this.dataInput.dateRange.start),
                    userId: this.$store.state.user.id
                };

                // this.$refs.modalEmail.closeModal();

                const requestOptions = {
                    mode: "no-cors",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBook)
                };
                //
                // var myHeaders = new Headers();
                // myHeaders.append("Content-Type", "application/json");
                //
                // var myInit = { method: 'POST',
                //     headers: myHeaders,
                //     mode: 'no-cors',
                //     cache: 'default',
                //     body: JSON.stringify(newBook) };
                //
                // fetch(`${this.urlApi}/book/`, myInit)
                //     .then(response => response.json())
                //     .then(data => (this.postId = data.id));

                this.axios.post(`http://localhost:8300/book/`, newBook, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    this.$store.state.message = {
                        type: 'success',
                        message: "Booking scheduled with success!"
                    };

                    this.$router.push({path: '/mybookings'});
                }).catch((error) => {
                    this.$store.state.message = {
                        type: 'error',
                        message: error.response.data
                    }
                });
            },
            formatDateBook(dateInput) {
                let dateText = dateInput.split("-")[0] + "-";
                if(parseInt(dateInput.split("-")[1]) < 10) {
                    dateText += "0";
                }
                dateText += dateInput.split("-")[1] + "-";
                if(parseInt(dateInput.split("-")[2]) < 10) {
                    dateText += "0";
                }
                dateText += dateInput.split("-")[2];

                return dateText;
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
            }
        },
        mounted() {
            this.$store.state.message = {
                type: null,
                message: null
            };

            this.urlApi = process.env.VUE_APP_ROOT_API;
            this.findAvailableDates();
        }
    }
</script>

<style lang="scss">
  .overflow-hidden {
    overflow: hidden;
  }

  .overflow-hidden .modal {
    display: block !important;
  }

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
