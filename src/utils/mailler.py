import smtplib

host = "smtp.yandex.com.tr"
port = 465
user = "muhammed@rst.com.tr"
password = ""


server = smtplib.SMTP(host, port)

server.login(user, password)

server.sendmail(user, "muhammed@rst.com.tr", "Hello world!")

server.quit()