#!/usr/bin/env python3
"""
Build script for WhatsApp Ping Everyone browser extension.
Creates browser-specific versions of the extension.
"""

import os
import shutil
import json

def create_chrome_version():
    """Create Chrome/Chromium version (Manifest V3)"""
    print("Creating Chrome version...")
    
    chrome_dir = "build/chrome"
    os.makedirs(chrome_dir, exist_ok=True)
    
    # Copy common files
    files_to_copy = [
        "popup.html",
        "popup.js",
        "content.js",
        "README.md"
    ]
    
    for file in files_to_copy:
        if os.path.exists(file):
            shutil.copy2(file, chrome_dir)
    
    # Copy icons
    if os.path.exists("icons"):
        shutil.copytree("icons", f"{chrome_dir}/icons", dirs_exist_ok=True)
    
    # Copy manifest
    shutil.copy2("manifest.json", chrome_dir)
    
    print(f"Chrome version created in {chrome_dir}/")

def create_firefox_version():
    """Create Firefox version (Manifest V2)"""
    print("Creating Firefox version...")
    
    firefox_dir = "build/firefox"
    os.makedirs(firefox_dir, exist_ok=True)
    
    # Copy common files
    files_to_copy = [
        "popup.html",
        "README.md"
    ]
    
    for file in files_to_copy:
        if os.path.exists(file):
            shutil.copy2(file, firefox_dir)
    
    # Copy Firefox-specific files
    if os.path.exists("popup-firefox.js"):
        shutil.copy2("popup-firefox.js", f"{firefox_dir}/popup.js")
    
    if os.path.exists("content-firefox.js"):
        shutil.copy2("content-firefox.js", f"{firefox_dir}/content.js")
    
    # Copy icons
    if os.path.exists("icons"):
        shutil.copytree("icons", f"{firefox_dir}/icons", dirs_exist_ok=True)
    
    # Copy Firefox manifest
    if os.path.exists("manifest-firefox.json"):
        shutil.copy2("manifest-firefox.json", f"{firefox_dir}/manifest.json")
    
    print(f"Firefox version created in {firefox_dir}/")

def create_package_info():
    """Create package information"""
    package_info = {
        "name": "WhatsApp Ping Everyone",
        "version": "1.0.0",
        "description": "Browser extension to ping everyone in WhatsApp Web group chats",
        "browsers": {
            "chrome": "build/chrome/",
            "firefox": "build/firefox/"
        },
        "installation": {
            "chrome": [
                "1. Open Chrome and go to chrome://extensions/",
                "2. Enable Developer mode",
                "3. Click 'Load unpacked' and select the chrome folder"
            ],
            "firefox": [
                "1. Open Firefox and go to about:debugging",
                "2. Click 'This Firefox'",
                "3. Click 'Load Temporary Add-on'",
                "4. Select manifest.json from the firefox folder"
            ]
        }
    }
    
    with open("build/package-info.json", "w") as f:
        json.dump(package_info, f, indent=2)

def main():
    """Main build function"""
    print("Building WhatsApp Ping Everyone browser extension...")
    
    # Create build directory
    os.makedirs("build", exist_ok=True)
    
    # Create browser-specific versions
    create_chrome_version()
    create_firefox_version()
    create_package_info()
    
    print("\nBuild complete!")
    print("Chrome version: build/chrome/")
    print("Firefox version: build/firefox/")
    print("\nSee build/package-info.json for installation instructions.")

if __name__ == "__main__":
    main()