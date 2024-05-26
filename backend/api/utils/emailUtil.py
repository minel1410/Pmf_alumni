from itsdangerous import URLSafeTimedSerializer
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


SECRET_KEY = "alumnipmf"
SECURITY_PASSWORD_SALT = "alumnipmf"
serializer = URLSafeTimedSerializer(SECRET_KEY)
reset_tokens = {}


SMTP_SERVER = "smtp-mail.outlook.com"
SMTP_PORT = 587
SMTP_USERNAME = "pmfalumni@hotmail.com"
SMTP_PASSWORD = "alumni123"
EMAIL_FROM = "pmfalumni@hotmail.com"
EMAIL_SUBJECT_RESET = "Zahtjev za resetovanje lozinke"


def send_reset_email(email: str, token: str):
    reset_url = f"http://localhost:3000/password-reset?token={token}"
    html = f"""
    <p>Zdravo,</p>
    <p>Za resetovanje lozinke, kliknite na sljedeći link:</p>
    <p><a href="{reset_url}">{reset_url}</a></p>
    <p>Ako niste zatražili resetovanje, ignorirajte ovaj email.</p>
    """
    msg = MIMEMultipart()
    msg["From"] = EMAIL_FROM
    msg["To"] = email
    msg["Subject"] = EMAIL_SUBJECT_RESET
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(EMAIL_FROM, email, msg.as_string())
