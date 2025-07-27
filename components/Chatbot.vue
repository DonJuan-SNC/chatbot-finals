<template>
  <div>
    <!-- Messenger-style Chat Button -->
    <transition name="fade">
      <v-btn
        v-if="!showChat"
        fab
        dark
        color="#0084FF"
        class="messenger-btn"
        @click="showChat = true"
      >
        <v-icon large>mdi-robot-confused</v-icon>
      </v-btn>
    </transition>

    <!-- Chat Dialog -->
    <v-dialog v-model="showChat" persistent max-width="800px">
      <v-card>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-robot-love-outline</v-icon>
            BTG Chatbot
          </v-toolbar-title>

          <v-spacer />

          <v-btn icon @click="showChat = false" aria-label="Close Chat">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="chat-window">
          <!-- Chat Messages -->
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="d-flex flex-column"
            :class="msg.from === 'user' ? 'align-end' : 'align-start'"
          >
            <!-- Bot Icon (above bubble) -->
            <template v-if="msg.from === 'bot'">
              <v-icon medium class="mb-1">mdi-robot-angry</v-icon>
            </template>

            <!-- Chat Bubble -->
            <div class="message" :class="[msg.from, msg.loading ? 'loading' : '']">
              {{ msg.text }}
            </div>
          </div>

          <v-divider class="my-4" />

          <!-- Recommendation Chips -->
          <div class="d-flex flex-wrap justify-center">
            <v-chip
              v-for="(recommend, index) in recommendations"
              :key="'rec-' + index"
              @click="sendMessage(recommend)"
              class="ma-2 recommend-chip"
              color="primary"
              text-color="white"
              large
            >
              {{ recommend }}
            </v-chip>
          </div>
        </v-card-text>

        <v-card-actions class="px-4 pb-4">
          <v-text-field
            v-model="input"
            label="Type your message..."
            @keyup.enter="sendMessage(input)"
            dense
            hide-details
            solo
            class="flex-grow-1 mr-2"
          />
          <v-btn icon color="primary" @click="sendMessage(input)">
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showChat: false,
      input: '',
      messages: [],
      recommendations: [],
    };
  },
  methods: {
    sendMessage(text) {
      if (!text.trim()) return;

      this.messages.push({ text, from: 'user' });

      const loadingMsg = { text: 'BTG Bot is typing...', from: 'bot', loading: true };
      this.messages.push(loadingMsg);

      setTimeout(() => {
        const index = this.messages.indexOf(loadingMsg);
        if (index !== -1) this.messages.splice(index, 1);

        const reply = this.$chatbot.generateReply(text);
        this.messages.push({ text: reply, from: 'bot' });

        this.recommendations = this.$chatbot.recommendReplies(text);
      }, 1200);

      this.input = '';
    },
  },
};
</script>

<style scoped>
/* Chat Window Styling */
.chat-window {
  max-height: 650px;
  min-height: 450px;
  overflow-y: auto;
  padding: 24px;
  background-color: #191919;
}

/* Scrollbar */
.chat-window::-webkit-scrollbar {
  width: 6px;
}
.chat-window::-webkit-scrollbar-track {
  background: #191919;
}
.chat-window::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 10px;
}
.chat-window::-webkit-scrollbar-thumb:hover {
  background-color: #666;
}

/* Messages */
.d-flex {
  margin: 14px 0;
}
.message {
  padding: 14px 18px;
  border-radius: 14px;
  max-width: 80%;
  word-break: break-word;
  color: #fff;
  font-size: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.user {
  background-color: #068fff;
  margin-left: auto;
  text-align: right;
}
.bot {
  background-color: #646464;
  margin-right: auto;
  text-align: left;
}
.loading {
  font-style: italic;
  opacity: 0.7;
}

/* Recommendation Chips */
.recommend-chip {
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 24px;
  font-weight: 500;
}

/* Messenger Button */
.messenger-btn {
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Fade Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
