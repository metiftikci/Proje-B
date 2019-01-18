# -*- coding: utf-8 -*-

# pip install speechrecognition
# pip install pocketsphinx
# pip install pyaudio

import speech_recognition as sr

def listen():
    r = sr.Recognizer()

    with sr.Microphone() as mic:
        print("Dinleniyor...")

        audio = r.listen(mic)

        print("Dinleme işlemi tamamlandı.")

    try:
        text = r.recognize_google(audio, language="tr-TR").encode("utf-8")
        print("Dinlenen ses: " + text)

        return text
    except Exception as ex:
        print("Hata olustu: ", ex)

        return ""