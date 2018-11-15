# pip install speechrecognition
# pip install pyaudio

import speech_recognition as sr

r = sr.Recognizer()

with sr.Microphone() as mic:
    print("Say something:")

    audio = r.listen(mic)

    print("Time over, thanks.")

try:
    print("Text: " + r.recognize_google(audio, language="tr-TR"))
except Exception as ex:
    print(ex.message)