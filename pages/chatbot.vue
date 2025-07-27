<template>
  <div class="messenger-wrapper">
    <!-- Page Header -->
    <header class="header">
      <div class="header-content">
        <h1>Beyond the Grave Chat Support</h1>
        <p class="subtext">We’re here to help you with your memorial and funeral needs</p>
      </div>
    </header>

    <!-- Floating Chatbot -->
    <transition name="fade-slide">
      <section class="chat-container">
        <Chatbot />
      </section>
    </transition>
  </div>
</template>

<script>
import Chatbot from '~/components/Chatbot.vue'

export default {
  components: {
    Chatbot
  }
}
</script>

<style scoped>
/* Wrapper */
.messenger-wrapper {
  position: relative;
  height: 100vh;
  background-color: #f8f9fc;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.header {
  background: linear-gradient(135deg, #0078e7, #005ec4);
  color: #ffffff;
  padding: 32px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.header h1 {
  font-size: 30px;
  font-weight: 700;
  margin: 0;
}

.subtext {
  font-size: 15px;
  font-weight: 400;
  opacity: 0.9;
  margin-top: 6px;
}

/* Chat Container */
.chat-container {
  position: absolute;
  bottom: 32px;
  right: 32px;
  width: 340px;
  max-height: 540px;
  background: #ffffff;
  border-radius: 50px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 9999;
}

/* Animation */
.fade-slide-enter-active {
  animation: fadeSlideIn 0.5s ease-out forwards;
}
.fade-slide-leave-active {
  animation: fadeSlideOut 0.4s ease-in forwards;
}
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeSlideOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(40px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .chat-container {
    bottom: 20px;
    right: 16px;
    left: 16px;
    width: auto;
    border-radius: 40px;
  }

  .header h1 {
    font-size: 24px;
  }

  .subtext {
    font-size: 13px;
  }
}
</style>
