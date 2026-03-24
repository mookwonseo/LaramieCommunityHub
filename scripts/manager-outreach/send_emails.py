import smtplib
import csv
import ssl
from email.message import EmailMessage

# --- CONFIGURATION ---
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
SENDER_EMAIL = "ko.laramie83@gmail.com"
SENDER_PASSWORD = "your-app-password"  # Use a Google App Password, not your real password!

# --- EMAIL CONTENT ---
SUBJECT = "Update for Laramie Community Hub"
BODY_TEMPLATE = """Hi {recipient_name},

I am writing to you regarding the {program} program listed on the Laramie Community Hub. We are currently updating our listings for 2026. 

Please let us know if there are any changes to your information (currently listed with phone: {phone}) or if you have new sessions starting soon.

Best regards,
Laramie Community Hub Team
"""

def send_emails():
    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            
            with open('contacts.csv', mode='r') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    program = row['Program']
                    manager = row['Manager']
                    email = row['Email']
                    phone = row['Phone'] if row['Phone'] else "N/A"
                    
                    # Use manager name if available, otherwise just "Manager"
                    recipient_name = manager if manager else f"{program} Manager"
                    
                    msg = EmailMessage()
                    msg.set_content(BODY_TEMPLATE.format(
                        recipient_name=recipient_name,
                        program=program,
                        phone=phone
                    ))
                    msg['Subject'] = SUBJECT
                    msg['From'] = SENDER_EMAIL
                    msg['To'] = email
                    
                    print(f"Sending email to {recipient_name} for {program} ({email})...")
                    # server.send_message(msg)  # UNCOMMENT THIS LINE TO ACTUALLY SEND
                    print(f"Success!")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print(f"Email script initialized for {SENDER_EMAIL}.")
    print("IMPORTANT: You must set your SENDER_PASSWORD (Google App Password) in the script file.")
    send_emails()
