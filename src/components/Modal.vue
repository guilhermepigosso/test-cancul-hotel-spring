<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()"/>

      <div class="modal__dialog card-body" style="padding: unset !important;">
        <div class="modal__header">
          <slot name="header"/>
          <font-awesome-icon icon="window-close" style="font-size: 20px; margin-right: 10px; cursor: pointer;" @click="closeModal()"/>
        </div>

        <div class="modal__body">
          <slot name="body"/>
        </div>

        <div class="modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "Modal",
        data() {
            return {
                show: false
            };
        },
        methods: {
            closeModal() {
                this.show = false;
                document.querySelector("body").classList.remove("overflow-hidden");
            },
            openModal() {
                this.show = true;
                document.querySelector("body").classList.add("overflow-hidden");
            }
        }
    };
</script>


<style lang="scss" scoped>
  .modal {
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 109;

    &__backdrop {
      background-color: rgba(0, 0, 0, 0.3);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 101;
    }

    &__dialog {
      background-color: #ffffff;
      position: relative;
      width: 600px;
      margin: 50px auto;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      z-index: 102;
      @media screen and (max-width: 992px) {
        width: 90%;
      }
    }

    &__close {
      width: 30px;
      height: 30px;
    }

    &__header {
      padding: 1.25rem;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &__body {
      overflow: auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      border-top: 0.5px solid #ccc;
      padding: 1.25rem;
      border-bottom: 0.5px solid #ccc;
    }

    &__footer {
      padding: 1.25rem;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
