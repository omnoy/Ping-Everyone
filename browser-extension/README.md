# WhatsApp Ping Everyone - Browser Extension

A browser extension that allows you to easily ping everyone in a WhatsApp Web group chat.

## Features

- 🔔 Ping multiple users in a WhatsApp group chat with one click
- ⚙️ Configurable number of users to ping (1-50)
- 🛑 Stop functionality to cancel the process
- 🎯 Works directly with WhatsApp Web interface
- 🚀 No external dependencies or desktop automation required

## Installation

### Chrome/Chromium-based browsers (Chrome, Edge, Brave, etc.)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `browser-extension` folder
5. The extension should now appear in your extensions list

### Firefox

1. Download or clone this repository
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the `browser-extension` folder

## Usage

1. **Open WhatsApp Web** in your browser (https://web.whatsapp.com)
2. **Open a group chat** where you want to ping everyone
3. **Click in the message input box** to focus it
4. **Click the extension icon** in your browser toolbar
5. **Set the number of users** you want to ping (default: 10)
6. **Click "Start Ping"** button
7. **Wait for the process to complete** - the extension will automatically add @ mentions
8. **Add your message** after the mentions and send

## How It Works

The extension replicates the behavior of the original Python script but works directly in the browser:

1. Injects JavaScript into WhatsApp Web pages
2. Simulates typing "@" to trigger user mention dropdown
3. Uses arrow keys to navigate through the user list
4. Presses Enter to select each user
5. Repeats for the specified number of users

## Safety Features

- ✅ Only works on WhatsApp Web (web.whatsapp.com)
- ✅ Checks if you're in a group chat before starting
- ✅ Configurable limits (max 50 users)
- ✅ Stop button to cancel the process
- ✅ Visual feedback and status messages

## Troubleshooting

### Extension not working?
- Make sure you're on WhatsApp Web (web.whatsapp.com)
- Refresh the WhatsApp Web page and try again
- Make sure you're in a group chat (not individual chat)
- Click in the message input box before starting

### Can't find the extension?
- Check if it's enabled in your browser's extension settings
- Look for the bell icon in your browser toolbar
- Try pinning the extension to make it always visible

### Mentions not working correctly?
- Make sure the message input box is focused (click in it)
- Try reducing the number of users to ping
- Some group chats may have different user list behaviors

## Differences from Original Python Script

| Feature | Python Script | Browser Extension |
|---------|---------------|-------------------|
| Platform | Desktop (any OS) | Browser only |
| Installation | Requires Python + PyAutoGUI | Simple browser extension |
| WhatsApp | Works with any WhatsApp interface | WhatsApp Web only |
| Automation | Desktop keyboard automation | Direct DOM manipulation |
| Safety | Mouse corner failsafe | Built-in stop button |
| UI | Command line | Popup interface |

## Privacy

This extension:
- ✅ Only runs on WhatsApp Web pages
- ✅ Does not collect or transmit any data
- ✅ Does not access your messages or contacts
- ✅ Only simulates keyboard interactions you could do manually

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the extension.

## License

This project is open source and available under the MIT License.