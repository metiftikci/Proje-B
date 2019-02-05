# -*- coding: utf-8 -*-

# pip install speechrecognition
# pip install pocketsphinx
# pip install pyaudio

import speech_recognition as sr

def listen():
    r = sr.Recognizer()

    with sr.Microphone(device_index=2) as mic:
        print("Ortam dinleniyor...")

        audio = r.listen(mic)

        print("Dinleme işlemi tamamlandı.")

    try:
        text = r.recognize_google(audio, language="tr-TR")
        print("Dinlenen ses: " + text)

        return text.decode('utf-8')
    except sr.UnknownValueError as ex:
	return ""
    except Exception as ex:
        print("Hata olustu: ", ex)

        return ""
