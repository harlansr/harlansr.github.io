document.addEventListener('DOMContentLoaded', (event) => {
    const userInput = document.getElementById('user-input');

    // Trigger sendMessage when 'Enter' key is pressed in the input
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
            // console.log(userInput.value.trim())
        }
    });
});

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
        console.log("INPUT: ",message);
        const response = await fetch('https://portfolio.paraweh.com/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-SIGNATURE': 'PRIVATE'
            },
            body: JSON.stringify({ input: message }),
        });

        const data = await response.json();
        const answer = data.answer;
        console.log("RESPONSE: ",answer);

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
        responseOutput.innerHTML = marked.parse(answer);

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
- or something else`;

        responseOutput.innerHTML = marked.parse(fullResponse);
    }

    // Clear the input
    userInput.value = '';
}