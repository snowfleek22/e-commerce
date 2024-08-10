import os

# Execute ADB command to remove the pattern lock
os.system("adb shell rm /data/system/gesture.key")

# Reboot the device
os.system("adb reboot")
