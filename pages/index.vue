<template>
  <div class="chat-wrapper">
    <div class="chat-window">
      <!-- Header -->
      <div class="chat-header">
        <span class="header-title">💬 BTG Chatbot</span>
        <button class="close-btn">✕</button>
      </div>

      <!-- Messages -->
      <div class="chat-box" ref="chatBox">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="['message', msg.sender]"
        >
          <div class="bubble">
            <span>{{ msg.text }}</span>
          </div>
        </div>
        <div v-if="loading" class="message bot typing">Bot is typing...</div>
      </div>

      <!-- Suggestions -->
      <div class="suggestions">
        <button
          v-for="(s, i) in suggestions"
          :key="i"
          class="suggestion"
          @click="useSuggestion(s)"
        >
          {{ s }}
        </button>
      </div>

      <!-- Input -->
      <div class="chat-input">
        <input
          v-model="input"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
        />
        <button @click="sendMessage" class="send-btn">➤</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      messages: [
        { sender: 'bot', text: 'Welcome to Beyond the Grave. How can I assist you with your funeral or cemetery needs?' }
      ],
      loading: false,
      suggestions: [
        'How do I reserve a plot?',
        'What are the funeral packages?',
        'What services do you offer?',
        'Can you tell me more about you services?',
        'Do you have flower or candle services?',
        'How do I cancel a booking?',
        'Can I see upcoming schedules?'
      ]
    }
  },
  methods: {
    async sendMessage() {
      if (!this.input.trim()) return

      const userMsg = this.input.trim()
      this.messages.push({ sender: 'user', text: userMsg })
      this.input = ''
      this.loading = true

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg })
        })

        const data = await res.json()
        this.messages.push({ sender: 'bot', text: data.reply })
      } catch (err) {
        this.messages.push({
          sender: 'bot',
          text: 'Server error. Try again later.'
        })
      } finally {
        this.loading = false
        this.$nextTick(() => {
          const box = this.$refs.chatBox
          box.scrollTop = box.scrollHeight
        })
      }
    },
    useSuggestion(text) {
      this.input = text
      this.sendMessage()
    }
  }
}
</script>

<style scoped>
.chat-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.chat-window {
  width: 600px; /* ← WIDER */
  background: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
}

.chat-header {
  background: #0078ff;
  color: white;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-weight: bold;
  font-size: 18px;
}

.close-btn {
  background: transparent;
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* Existing styles above ... */

.chat-box {
  background: #2c2c2c;
  height: 450px;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: smooth;
}

/* 🎨 Custom Scrollbar Styles */
.chat-box::-webkit-scrollbar {
  width: 8px;
}

.chat-box::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.chat-box::-webkit-scrollbar-thumb {
  background-color: #0078ff;
  border-radius: 4px;
  border: 2px solid #1e1e1e;
}

/* Firefox scrollbar styling */
.chat-box {
  scrollbar-width: thin;
  scrollbar-color: #0078ff #1e1e1e;
}

.message {
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.bot {
  justify-content: flex-start;
}

.bubble {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 20px;
  font-size: 15px;
  color: white;
  background: #0078ff;
}

.message.bot .bubble {
  background: #444;
  color: white;
}

.typing {
  font-style: italic;
  color: gray;
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px;
  background: #1e1e1e;
  border-top: 1px solid #333;
  justify-content: center;
}

.suggestion {
  background: #0078ff;
  color: white;
  padding: 10px 10px;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s ease;
  min-width: 260px;
  text-align: center;
}

.suggestion:hover {
  background: #005fcc;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #1e1e1e;
  border-top: 1px solid #333;
  gap: 12px;
}

.chat-input input {
  flex: 1;
  padding: 14px 18px;
  border-radius: 25px;
  border: 1px solid #555;
  background: #2e2e2e;
  color: white;
  font-size: 16px;
  height: 50px;
  outline: none;
}

.send-btn {
  background: #0078ff;
  border: none;
  color: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
