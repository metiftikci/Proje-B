# -*- coding: utf-8 -*-

import settings
import utils
import speech_utils
import requests
import time

#persons = utils.read_csv(settings.DATABASE_FILE_NAME)

persons = utils.get_data_from_api(settings.WEBAPI_URL)
print("Kayıtlı Kişiler")
print(persons)


while True:
    sesler = speech_utils.listen()

    if "test" in sesler.split(" "):
        r_enable = requests.get(settings.WEBAPI_URL_ALARM_ENABLE)
        print(r_enable)

        print("========== Alert! ==========")

        subject = "Raspberry PI3"
        body = "Alert!"

        for person in persons:
            print(person)

            person_name = person[settings.DATABASE_INDEX_NAME]
            person_email_address = person[settings.DATABASE_INDEX_EMAIL_ADDRESS]
            person_phone_no = person[settings.DATABASE_INDEX_PHONE_NO]

            #utils.send_mail(settings.EMAIL_API_STMP_HOST, settings.EMAIL_API_STMP_HOST, settings.EMAIL_API_EMAIL_ADDRESS, settings.EMAIL_API_EMAIL_PASSWORD, person_email_address, subject, body)
            #utils.send_sms_mutlucell(settings.SMS_API_USERNAME, settings.SMS_API_PASSWORD, settings.SMS_API_ORIGINATOR, body, [person_phone_no])

        # Make alarm high
        alarm_is_on = True
        
        while alarm_is_on:
            alarm_is_on = requests.get(settings.WEBAPI_URL_ALARM).json()
            print("Alarm: ", alarm_is_on)
            
            time.sleep(1)