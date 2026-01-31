// DOM Elements
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Predefined responses for demo
const botResponses = [
    "नमस्ते! मैं आपकी क्या मदद कर सकता हूँ?",
    "यह एक demo AI chatbot है जो HTML, CSS और JavaScript से बना है।",
    "आप GitHub पर इस project का code देख सकते हैं।",
    "यह chatbot responsive design के साथ बनाया गया है जो mobile devices पर भी अच्छे से काम करता है।",
    "आप मुझसे कोई भी सवाल पूछ सकते हैं। हालांकि, अभी यह एक demo version है।",
    "Future में इसमें real AI API integrate की जाएगी।",
    "क्या आपको यह interface पसंद आया?",
    "HTML, CSS और JavaScript web development की foundation हैं।",
    "इस project को GitHub पर upload किया जा सकता है और दूसरे developers के साथ share किया जा सकता है।"
];

// Conversation history
let conversation = [
    {
        sender: 'bot',
        message: 'नमस्ते! मैं आपका AI Assistant हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?',
        time: 'अभी'
    }
];

// Initialize chat
function initializeChat() {
    conversation.forEach(msg => {
        addMessageToChat(msg.sender, msg.message, msg.time);
    });
}

// Add message to chat
function addMessageToChat(sender, message, time = 'अभी') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarIcon = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
    
    messageDiv.innerHTML = `
        <div class="avatar">
            <i class="${avatarIcon}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
            <span class="time">${time}</span>
        </div>
    `;
    
    chatBox.appendChild(messageDiv);
    scrollToBottom();
    
    // Add to conversation history
    conversation.push({
        sender: sender,
        message: message,
        time: time
    });
}

// Get bot response
function getBotResponse(userMessage) {
    // Simple response logic for demo
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('नमस्ते') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return 'नमस्ते! आपका दिन कैसा चल रहा है?';
    } else if (lowerMessage.includes('धन्यवाद') || lowerMessage.includes('thank you')) {
        return 'आपका स्वागत है! क्या मैं आपकी और मदद कर सकता हूँ?';
    } else if (lowerMessage.includes('github') || lowerMessage.includes('कोड')) {
        return 'इस project का code GitHub पर available है। आप repository clone कर सकते हैं।';
    } else if (lowerMessage.includes('html') || lowerMessage.includes('css') || lowerMessage.includes('javascript')) {
        return 'HTML structure के लिए, CSS styling के लिए, और JavaScript interactivity के लिए use होता है।';
    } else {
        // Return random response from predefined array
        const randomIndex = Math.floor(Math.random() * botResponses.length);
        return botResponses[randomIndex];
    }
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes} ${ampm}`;
}

// Handle send message
function handleSendMessage() {
    const message = userInput.value.trim();
    
    if (message === '') {
        alert('कृपया कोई संदेश लिखें!');
        return;
    }
    
    // Add user message
    addMessageToChat('user', message, getCurrentTime());
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot thinking
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getBotResponse(message);
        addMessageToChat('bot', botResponse, getCurrentTime());
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatBox.appendChild(typingDiv);
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Event Listeners
sendBtn.addEventListener('click', handleSendMessage);

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// Add typing animation CSS
const style = document.createElement('style');
style.textContent = `
    .typing {
        display: flex;
        align-items: center;
        height: 20px;
    }
    
    .typing span {
        width: 8px;
        height: 8px;
        background: #666;
        border-radius: 50%;
        margin: 0 2px;
        opacity: 0.6;
    }
    
    .typing span:nth-child(1) {
        animation: typing 1.4s infinite;
    }
    
    .typing span:nth-child(2) {
        animation: typing 1.4s infinite 0.2s;
    }
    
    .typing span:nth-child(3) {
        animation: typing 1.4s infinite 0.4s;
    }
    
    @keyframes typing {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(style);

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', initializeChat);

// Demo: Auto-add a welcome message after 2 seconds
setTimeout(() => {
    if (conversation.length === 1) {
        addMessageToChat('bot', 'यह एक demo AI chatbot है जो पूरी तरह से HTML, CSS और JavaScript से बना है।', getCurrentTime());
    }
}, 2000);
