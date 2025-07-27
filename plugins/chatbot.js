export default (context, inject) => {
  const chatbot = {
    generateReply(message) {
      const msg = message.toLowerCase();

      if (msg.includes('price') || msg.includes('cost')) {
        return 'Prices vary depending on services and location. Would you like to view available plots?';
      }

      if (msg.includes('schedule') || msg.includes('event')) {
        return 'You can check the schedule on the Funeral Calendar page.';
      }

      if (msg.includes('book') || msg.includes('reserve')) {
        return 'You can book a service directly from the Reservation page.';
      }

      if (msg.includes('location') || msg.includes('where')) {
        return 'Good Shepherd Memorial Park is located in San Fernando, Pampanga.';
      }

      return 'Thanks for your message. How can I assist you with your funeral or cemetery needs?';
    },

    recommendReplies(message) {
      return [
        'How do I reserve a plot?',
        'What are the funeral packages?',
        'Can I view the memorial map?',
        'Where is the location of Good Shepherd Memorial Park?',
        'Do you have flower or candle services?',
        'How do I cancel a booking?',
        'Can I see upcoming schedules?'
      ];
    }
  };

  inject('chatbot', chatbot);
};
