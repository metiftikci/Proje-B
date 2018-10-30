import csv
import requests
import smtplib


def read_csv(filename):
    with open(filename, 'rb') as file:
        spamreader = csv.reader(file)

        result = []

        for row in spamreader:
            result.append(row)

        return result


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
<smspack ka="{}" pwd="{}" org="{}" />
    <mesaj>
        <metin>{}</metin>
        <nums>{}</nums>
    </mesaj>
</smspack>'''.format(username, password, originator, message, numbers.join(''))

    headers = { 'Content-Type': 'application/xml' }

    requests.post(url, data=xml, headers=headers)