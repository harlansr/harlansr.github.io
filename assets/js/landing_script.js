document.addEventListener('DOMContentLoaded', (event) => {
    const userInput = document.getElementById('user-input');
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

let config = {};
function detectConfig() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        config.device = "mobile"
    } else {
        config.device = "pc"
    }

    const userLanguage = navigator.language || navigator.userLanguage;
    if (userLanguage.startsWith('id')) {
        config.language = "id"
    } else {
        config.language = "en"
    }
}
window.onload = detectConfig;


function setQuestion(question) {
    const userInput = document.getElementById('user-input');
    userInput.value = question; // Set the question in the input field
    sendMessage(); // Call sendMessage to send the question
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message === '') return;

    const sendButton = document.getElementById('send-button');
    const responseOutput = document.getElementById('response-output');
    const suggestionsContainer = document.getElementById('suggestions-container'); // Access suggestions container

    // Show loading state on the button and clear previous response
    sendButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    sendButton.disabled = true;
    responseOutput.innerHTML = '';  // Clear previous response

    // Hide suggestions container as soon as message is sent
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }

    let fullResponse = '';  // Variable to accumulate the actual response

    try {
        // const response = await fetch('https://mazis-resume-chatbot.azurewebsites.net/predict', {
        // console.log("INPUT: ",message);
        const response = await fetch('https://portfolio.paraweh.com/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-SIGNATURE': 'PRIVATE',
                'X-TIMESTAMP': Math.floor(Date.now() / 1000),
                'X-PARTNER-ID': '3e2a2b86235d4396b3d9940d6b09dee1',
            },
            body: JSON.stringify({ input: message }),
        });

        const data = await response.json();
        const answer = data.answer;
        // console.log("RESPONSE: ",answer);

        // if (!response.body) throw new Error('ReadableStream not supported in this browser.');
        // const reader = response.body.getReader();
        // const decoder = new TextDecoder();

        // while (true) {
        //     const { done, value } = await reader.read();
        //     if (done) break;
        //     const chunk = decoder.decode(value, { stream: true });
        //     if (chunk.includes("INFO: getting information...")) {
        //         continue;
        //     }
        //     fullResponse += chunk;
        //     responseOutput.textContent = fullResponse;
        // }

        // console.log(fullResponse);
        if(data.accuracy>0.8){
            responseOutput.innerHTML = marked.parse(answer);
        }else{
            responseOutput.innerHTML = `
            I'm sorry, I can only answer questions about <b>Harlan</b>. If you have any questions about <b>Harlan</b>, feel free to ask! 😊
            <br>
            <br>
            <div id="suggestions-container" class="">
                <p class="fw-bold text-secondary">Suggested Questions:</p>
                <button class="btn btn-outline-secondary btn-sm mb-1 me-1" onclick="setQuestion('Tell me about yourself')">Tell me about yourself</button>
                <button class="btn btn-outline-secondary btn-sm mb-1 me-1" onclick="setQuestion('What\'s your hobby?')">What's your hobby?</button>
                <button class="btn btn-outline-secondary btn-sm mb-1" onclick="setQuestion('I want to hire you')">I want to hire you</button>
            </div>`;
            
        }

        sendButton.innerHTML = '<i class="bi bi-send-fill"></i>';
        sendButton.disabled = false;

    } catch (error) {
        // Handle errors and reset button state
        sendButton.innerHTML = '<i class="bi bi-send-fill"></i>';
        sendButton.disabled = false;
        console.error('Error:', error);
        // responseOutput.textContent = 'Sorry, something went wrong. Please try again later.';
        const fullResponse = `Sorry, something went wrong. Please try again later.
        
### Whats wrong?
- **AI server** is under maintenance
- or something else
------
**ERROR:** `+error;

        responseOutput.innerHTML = marked.parse(fullResponse);
    }

    // Clear the input
    userInput.value = '';
}