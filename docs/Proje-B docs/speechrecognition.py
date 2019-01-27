# pip install speechrecognition
# sudo apt-get install swig
# sudo apt-get install libpulse-dev
# sudo apt-get install libasound2-dev
# sudo apt-get install flac
# sudo apt-get install alsa-tools
# sudo apt-get install alsa-utils
# pip install pocketsphinx
# pip install pyaudio

import speech_recognition as sr

r = sr.Recognizer()

with sr.Microphone(device_index=2) as mic:
    print("Say something:")

    audio = r.listen(mic)

    print("Time over, thanks.")

try:
    # print("Text: " + r.recognize_sphinx(audio))
    print("Text: " + r.recognize_google(audio, language="tr-TR"))
except Exception as ex:
    print(ex.message)