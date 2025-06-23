# Installation Guide - WhatsApp Ping Everyone Browser Extension

## Quick Start

1. **Choose your browser version:**
   - **Chrome/Edge/Brave/Opera**: Use the `build/chrome/` folder
   - **Firefox**: Use the `build/firefox/` folder

2. **Follow the installation steps below for your browser**

## Chrome/Chromium-based Browsers (Chrome, Edge, Brave, Opera)

### Step 1: Enable Developer Mode
1. Open your browser
2. Go to the extensions page:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`
   - **Opera**: `opera://extensions/`
3. Toggle **"Developer mode"** ON (usually in the top-right corner)

### Step 2: Load the Extension
1. Click **"Load unpacked"** button
2. Navigate to and select the `build/chrome/` folder
3. The extension should now appear in your extensions list

### Step 3: Pin the Extension (Optional)
1. Click the puzzle piece icon in your browser toolbar
2. Find "WhatsApp Ping Everyone" and click the pin icon
3. The extension icon will now be visible in your toolbar

## Firefox

### Step 1: Open Developer Tools
1. Open Firefox
2. Type `about:debugging` in the address bar and press Enter
3. Click **"This Firefox"** in the left sidebar

### Step 2: Load the Extension
1. Click **"Load Temporary Add-on..."** button
2. Navigate to the `build/firefox/` folder
3. Select the `manifest.json` file
4. The extension should now appear in your add-ons list

**Note**: In Firefox, temporary add-ons are removed when you restart the browser. For permanent installation, you would need to package and sign the extension.

## Verification

After installation, you should see:
1. The extension icon (🔔) in your browser toolbar
2. When you visit WhatsApp Web, a small green indicator saying "Ping Everyone Ready" appears briefly

## Usage

1. **Open WhatsApp Web** (https://web.whatsapp.com)
2. **Open a group chat**
3. **Click in the message input box**
4. **Click the extension icon** in your toolbar
5. **Set the number of users** to ping (1-50)
6. **Click "Start Ping"**
7. **Wait for completion**, then add your message and send

## Troubleshooting

### Extension not appearing?
- Make sure Developer mode is enabled
- Try refreshing the extensions page
- Check that you selected the correct folder (`build/chrome/` or `build/firefox/`)

### Extension not working on WhatsApp Web?
- Refresh the WhatsApp Web page
- Make sure you're in a group chat (not individual chat)
- Click in the message input box before using the extension
- Check browser console for error messages (F12 → Console)

### "Load unpacked" button not visible?
- Make sure Developer mode is enabled
- Try refreshing the extensions page

### Firefox: Extension disappears after restart?
- This is normal for temporary add-ons in Firefox
- You'll need to reload it each time you restart Firefox
- For permanent installation, the extension would need to be signed by Mozilla

## Uninstalling

### Chrome/Chromium browsers:
1. Go to your extensions page
2. Find "WhatsApp Ping Everyone"
3. Click "Remove"

### Firefox:
1. Go to `about:addons`
2. Find "WhatsApp Ping Everyone"
3. Click "Remove" or just restart Firefox (for temporary add-ons)

## Security Notes

- This extension only works on WhatsApp Web (web.whatsapp.com)
- It does not collect, store, or transmit any personal data
- It only simulates keyboard interactions that you could perform manually
- All processing happens locally in your browser

## Need Help?

If you encounter issues:
1. Check this troubleshooting guide
2. Try refreshing WhatsApp Web
3. Disable and re-enable the extension
4. Check the browser console for error messages
5. Create an issue on the project repository