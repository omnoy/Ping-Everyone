// WhatsApp Ping Everyone Content Script
class WhatsAppPinger {
    constructor() {
        this.isRunning = false;
        this.shouldStop = false;
        this.delay = 100; // Delay between actions in milliseconds
    }
    
    // Find the message input box
    findMessageInput() {
        // WhatsApp Web message input selectors (multiple fallbacks)
        const selectors = [
            '[data-testid="conversation-compose-box-input"]',
            'div[contenteditable="true"][data-tab="10"]',
            'div[contenteditable="true"][spellcheck="true"]',
            'div[role="textbox"]',
            '.selectable-text[contenteditable="true"]'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                return element;
            }
        }
        return null;
    }
    
    // Simulate typing @ character
    simulateAtSymbol(element) {
        // Focus the element
        element.focus();
        
        // Create and dispatch input events
        const inputEvent = new InputEvent('input', {
            bubbles: true,
            cancelable: true,
            inputType: 'insertText',
            data: '@'
        });
        
        // Insert the @ character
        const selection = window.getSelection();
        const range = document.createRange();
        
        if (element.childNodes.length > 0) {
            range.setStartAfter(element.lastChild);
        } else {
            range.setStart(element, 0);
        }
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Insert text
        document.execCommand('insertText', false, '@');
        
        // Dispatch input event
        element.dispatchEvent(inputEvent);
    }
    
    // Simulate key press
    simulateKeyPress(key, element = null) {
        const target = element || document.activeElement || document.body;
        
        const keyboardEvent = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: key,
            code: key === 'ArrowDown' ? 'ArrowDown' : (key === 'Enter' ? 'Enter' : key),
            keyCode: key === 'ArrowDown' ? 40 : (key === 'Enter' ? 13 : 0)
        });
        
        target.dispatchEvent(keyboardEvent);
        
        // Also dispatch keyup
        const keyupEvent = new KeyboardEvent('keyup', {
            bubbles: true,
            cancelable: true,
            key: key,
            code: key === 'ArrowDown' ? 'ArrowDown' : (key === 'Enter' ? 'Enter' : key),
            keyCode: key === 'ArrowDown' ? 40 : (key === 'Enter' ? 13 : 0)
        });
        
        setTimeout(() => target.dispatchEvent(keyupEvent), 10);
    }
    
    // Wait for a specified time
    async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Check if we're in a group chat
    isInGroupChat() {
        // Look for group indicators
        const groupIndicators = [
            '[data-testid="conversation-info-header-chat-title"]',
            '.chat-title',
            '[title*="participants"]',
            '[title*="members"]'
        ];
        
        for (const selector of groupIndicators) {
            if (document.querySelector(selector)) {
                return true;
            }
        }
        
        // Check if there's a participant count or group info
        const headerText = document.querySelector('[data-testid="conversation-info-header"]')?.textContent || '';
        return headerText.includes('participants') || headerText.includes('members');
    }
    
    // Main ping function
    async startPinging(userCount) {
        if (this.isRunning) {
            return { success: false, error: 'Ping process is already running' };
        }
        
        const messageInput = this.findMessageInput();
        if (!messageInput) {
            return { success: false, error: 'Could not find WhatsApp message input. Please make sure you have a chat open.' };
        }
        
        if (!this.isInGroupChat()) {
            return { success: false, error: 'Please open a group chat to ping everyone.' };
        }
        
        this.isRunning = true;
        this.shouldStop = false;
        
        try {
            // Focus on the message input
            messageInput.focus();
            await this.wait(500);
            
            // Start the pinging process
            for (let i = 0; i < userCount && !this.shouldStop; i++) {
                // Type @ symbol
                this.simulateAtSymbol(messageInput);
                await this.wait(this.delay);
                
                // Navigate down through the user list
                for (let j = 0; j < i && !this.shouldStop; j++) {
                    this.simulateKeyPress('ArrowDown', messageInput);
                    await this.wait(this.delay);
                }
                
                // Press Enter to select the user
                this.simulateKeyPress('Enter', messageInput);
                await this.wait(this.delay);
                
                // Add a space after each mention
                document.execCommand('insertText', false, ' ');
                await this.wait(this.delay);
            }
            
            this.isRunning = false;
            
            if (this.shouldStop) {
                return { success: true, message: 'Ping process stopped by user' };
            } else {
                return { success: true, message: `Successfully pinged ${userCount} users` };
            }
            
        } catch (error) {
            this.isRunning = false;
            return { success: false, error: 'Error during ping process: ' + error.message };
        }
    }
    
    // Stop the pinging process
    stopPinging() {
        this.shouldStop = true;
        this.isRunning = false;
        return { success: true, message: 'Ping process stopped' };
    }
}

// Create pinger instance
const pinger = new WhatsAppPinger();

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'startPing') {
        pinger.startPinging(request.userCount).then(result => {
            sendResponse(result);
            
            // Notify popup of completion
            if (result.success) {
                chrome.runtime.sendMessage({ action: 'pingComplete' });
            } else {
                chrome.runtime.sendMessage({ action: 'pingError', error: result.error });
            }
        });
        return true; // Keep message channel open for async response
    } else if (request.action === 'stopPing') {
        const result = pinger.stopPinging();
        sendResponse(result);
    }
});

// Add visual indicator when extension is loaded
console.log('WhatsApp Ping Everyone extension loaded');

// Optional: Add a small indicator to the page
function addExtensionIndicator() {
    if (document.querySelector('#ping-everyone-indicator')) return;
    
    const indicator = document.createElement('div');
    indicator.id = 'ping-everyone-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #25D366;
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        opacity: 0.8;
        pointer-events: none;
    `;
    indicator.textContent = '🔔 Ping Everyone Ready';
    document.body.appendChild(indicator);
    
    // Remove indicator after 3 seconds
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }, 3000);
}

// Add indicator when page is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addExtensionIndicator);
} else {
    addExtensionIndicator();
}