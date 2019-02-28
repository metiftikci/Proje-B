import csv
import requests
import smtplib
import settings


def read_csv(filename):
    with open(filename, 'rb') as file:
        spamreader = csv.reader(file)

        result = []

        for row in spamreader:
            result.append(row)

        return result

def get_teachers_from_api():
    response = requests.get(settings.WEBAPI_URL_TEACHER)

    teachers = []

    for x in response.json():
        teacher = {
            "fullName": x["adSoyad"].encode("utf-8"),
            "email": x["email"],
            "phoneNumber": x["telefon"]
        }

        teachers.append(teacher)

    return teachers

def get_raspberry_from_api():
    id = settings.RASPBERRY_ID

    response = requests.get(settings.WEBAPI_URL_RASPBERRY.format(str(id)))

    print("Response", response.json())

    return response.json()

def get_raspberry_name_from_api():
    return get_raspberry_from_api()["name"]

def get_raspberry_status_from_api():
    return get_raspberry_from_api()["status"]

def send_mail(host, port, from_addr, password, to_addr, subject, body):
    server = smtplib.SMTP(host, port)
    server.ehlo()
    server.starttls()
    server.login(from_addr, password)

    server.sendmail(from_addr, to_addr, "Subject: {}\n\n{}".format(subject, body))

    server.quit()


def send_sms_mutlucell(username, password, originator, message, numbers):
    url = "https://smsgw.mutlucell.com/smsgw-ws/sndblkex"

    xml = '''<?xml version="1.0" encoding="UTF-8"?>
<smspack ka="{}" pwd="{}" org="{}">
    <mesaj>
        <metin>{}</metin>
        <nums>{}</nums>
    </mesaj>
</smspack>'''.format(username, password, originator, message, ",".join(numbers))

    headers = { 'Content-Type': 'text/xml; charset=utf-8' }

    response = requests.post(url, data=xml, headers=headers)

    return response.text
