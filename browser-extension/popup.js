document.addEventListener('DOMContentLoaded', function() {
    const pingButton = document.getElementById('pingButton');
    const stopButton = document.getElementById('stopButton');
    const userCountInput = document.getElementById('userCount');
    const statusDiv = document.getElementById('status');
    
    let isRunning = false;
    
    function showStatus(message, type = 'info') {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        statusDiv.style.display = 'block';
        
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 3000);
        }
    }
    
    function updateButtonStates(running) {
        isRunning = running;
        pingButton.disabled = running;
        stopButton.disabled = !running;
        userCountInput.disabled = running;
    }
    
    pingButton.addEventListener('click', async function() {
        const userCount = parseInt(userCountInput.value);
        
        if (userCount < 1 || userCount > 50) {
            showStatus('Please enter a number between 1 and 50', 'error');
            return;
        }
        
        updateButtonStates(true);
        showStatus('Starting ping process...', 'info');
        
        try {
            // Get the active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab.url.includes('web.whatsapp.com')) {
                showStatus('Please open WhatsApp Web first', 'error');
                updateButtonStates(false);
                return;
            }
            
            // Send message to content script
            chrome.tabs.sendMessage(tab.id, {
                action: 'startPing',
                userCount: userCount
            }, function(response) {
                if (chrome.runtime.lastError) {
                    showStatus('Error: Please refresh WhatsApp Web and try again', 'error');
                    updateButtonStates(false);
                } else if (response && response.success) {
                    showStatus('Ping process started successfully!', 'success');
                    updateButtonStates(false);
                } else {
                    showStatus(response ? response.error : 'Unknown error occurred', 'error');
                    updateButtonStates(false);
                }
            });
            
        } catch (error) {
            showStatus('Error: ' + error.message, 'error');
            updateButtonStates(false);
        }
    });
    
    stopButton.addEventListener('click', async function() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            chrome.tabs.sendMessage(tab.id, {
                action: 'stopPing'
            }, function(response) {
                showStatus('Ping process stopped', 'info');
                updateButtonStates(false);
            });
            
        } catch (error) {
            showStatus('Error stopping process', 'error');
            updateButtonStates(false);
        }
    });
    
    // Listen for messages from content script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'pingComplete') {
            showStatus('Ping process completed!', 'success');
            updateButtonStates(false);
        } else if (request.action === 'pingError') {
            showStatus('Error: ' + request.error, 'error');
            updateButtonStates(false);
        }
    });
});