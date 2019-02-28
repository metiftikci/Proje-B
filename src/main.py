# -*- coding: utf-8 -*-

import settings
import utils
import speech_utils
import requests
import time

#persons = utils.read_csv(settings.DATABASE_FILE_NAME)

teachers = utils.get_teachers_from_api()
print("Kayıtlı Kişiler")
print(teachers)

while True:
    alarm_status = utils.get_raspberry_status_from_api()

    if alarm_status == 0:
        print("Sistem kapalı.")

        time.sleep(settings.SYSTEM_STOPPED_DELAY_TIME)

        continue

    sesler = speech_utils.listen()

    if settings.DANGEROUS_WORD in sesler.split(" "):
        print("========== Alert! ==========")

        subject = "Raspberry PI3"
        body = "Alert!"

        for person in teachers:
            print(person)

            person_name = person["fullName"]
            person_email_address = person["email"]
            person_phone_no = person["phoneNumber"]

            if person_email_address != None:
                print("Sent email to {}".format(person_name))
                # utils.send_mail(settings.EMAIL_API_STMP_HOST, settings.EMAIL_API_STMP_HOST, settings.EMAIL_API_EMAIL_ADDRESS, settings.EMAIL_API_EMAIL_PASSWORD, person_email_address, subject, body)

            if person_phone_no != None:
                print("Sent sms to {}".format(person_name))
                # utils.send_sms_mutlucell(settings.SMS_API_USERNAME, settings.SMS_API_PASSWORD, settings.SMS_API_ORIGINATOR, body, [person_phone_no])

        # Make alarm high
        # 0: System Stopped
        # 1: System Started (Listening)
        # 2: Alarm active
        status = [ "System Stopped", "System Started (Listening)", "Alarm Activated" ]
        alarm_status = 2

        while alarm_status == 2:
            alarm_status = utils.get_raspberry_status_from_api()
            print("Alarm Status: ", status[alarm_status])

            time.sleep(1)
