from pygsr import Pygsr

speech = Pygsr()

speech.record(3)

phrase, complete_response = speech.speech_to_text('en-US')

print(phrase)