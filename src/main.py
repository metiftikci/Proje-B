import settings
import utils

persons = utils.read_csv(settings.DATABASE_FILE_NAME)

if True:
    print("========== Alert! ==========")

    subject = "Raspberry PI3"
    body = "Alert!"

    for person in persons:
        print(person)

        person_name = person[settings.DATABASE_INDEX_NAME]
        person_email_address = person[settings.DATABASE_INDEX_EMAIL_ADDRESS]
        person_phone_no = person[settings.DATABASE_INDEX_PHONE_NO]

        utils.send_mail(settings.STMP_HOST, settings.STMP_HOST, settings.EMAIL_ADDRESS, settings.EMAIL_PASSWORD, person_email_address, subject, body)
        # utils.send_sms_mutlucell()