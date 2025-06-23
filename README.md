# Ping-Everyone

Simple tools to ping everyone in a group chat on WhatsApp Web.

## 🆕 Browser Extension (Recommended)

**NEW**: Now available as a browser extension! No more desktop automation needed.

### Features
- 🔔 One-click pinging for WhatsApp Web group chats
- ⚙️ Configurable number of users (1-50)
- 🛑 Stop button to cancel process
- 🎯 Works directly in browser - no external dependencies
- 🔒 Safe and secure - only works on WhatsApp Web

### Quick Installation
1. Go to the `browser-extension/` folder
2. Follow the instructions in `INSTALLATION.md`
3. Load the extension in your browser
4. Visit WhatsApp Web and start pinging!

[📖 Full Installation Guide](browser-extension/INSTALLATION.md) | [📁 Extension Files](browser-extension/)

---

## 🖥️ Original Python Script

The original desktop automation version using PyAutoGUI.

### Usage:
1. Open Whatsapp Web. 
2. Run .exe. You have 3 seconds until the effect triggers, which will press your keyboard keys (down + enter).
3. Click on Whatsapp chat box and wait around 3 seconds for it to trigger, which will fill the chat box with @'s for each user in the group chat. 
4. Add a message, and send to ping everyone.

Default number of user pings is 10. You can run exe from CMD and adds args to set number of user pings as the number of users in the group. 

To stop the ping prematurely, swipe the mouse cursor to one of the corners of your screen (default with PyAutoGUI).

---

## 🆚 Comparison

| Feature | Browser Extension | Python Script |
|---------|-------------------|---------------|
| **Platform** | Any browser | Desktop (Windows/Mac/Linux) |
| **Installation** | Simple browser extension | Requires Python + dependencies |
| **Interface** | Clean popup UI | Command line |
| **Safety** | Built-in stop button | Mouse corner failsafe |
| **WhatsApp Support** | WhatsApp Web only | Any WhatsApp interface |
| **Dependencies** | None | Python, PyAutoGUI |

## 🚀 Recommended Approach

**Use the browser extension** for the best experience! It's easier to install, safer to use, and provides a better user interface.
