import time
import sys
import pyautogui

pyautogui.PAUSE = 0.01
time.sleep(3)
if len(sys.argv) > 1:
    size = sys.argv[1]
else:
    size = 10
for i in range(int(size)):
    pyautogui.press("@")
    for j in range(i):
        pyautogui.press("down")
    pyautogui.press("enter")
