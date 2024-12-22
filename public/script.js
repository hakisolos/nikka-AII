const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');

if (!chatForm || !chatInput || !chatWindow) {
    console.error("Required DOM elements not found.");
}

chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    console.log("User message:", userMessage);

    appendMessage('user', userMessage); // Display user message
    chatInput.value = '';

    // Show typing animation
    appendMessage('ai', 'NIKKA-AI is typing...');

    try {
        // Make the API request using Axios
        const response = await axios.get(`https://nikka-api.us.kg/ai/moshai?apiKey=nikka&q=${encodeURIComponent(userMessage)}`);
        console.log("API Response:", response);

        // Remove typing message
        removeTyping();

        if (response.data && response.data.data) {
            appendMessage('ai', response.data.data); // Display AI response
        } else {
            appendMessage('ai', 'Sorry, I couldn’t process your request.');
        }
    } catch (error) {
        console.error('Error:', error);
        removeTyping();
        appendMessage('ai', 'Connection failed. Please try again later.');
    }
});

// Function to append messages to the chat window
function appendMessage(sender, message) {
    if (!message) return; // Avoid appending empty messages
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the latest message
}

// Function to remove typing message
function removeTyping() {
    const typingMessage = document.querySelector('.message.ai:last-child');
    if (typingMessage && typingMessage.textContent === 'NIKKA-AI is typing...') {
        typingMessage.remove();
    }
}
