import smtplib
import csv
import ssl
import time
from email.message import EmailMessage

# --- CONFIGURATION ---
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
SENDER_EMAIL = "ko.laramie83@gmail.com"
SENDER_PASSWORD = "adui mqcr habj gpzl"  # Replace with your 16-character Google App Password

# --- EMAIL CONTENT ---
# Use placeholders like {recipient_name}, {program}, and {phone}
SUBJECT_TEMPLATE = "Quick update: Laramie Community Hub and {program} listing"
BODY_TEMPLATE = """Hi {recipient_name},

I hope you’re having a great week!

I’m writing to let you know that I’ve recently updated my website, www.LaramieCommunityHub.com, to be much more user-friendly and visually appealing. 

I’m also currently working on a new schedule tab to make the calendar even easier for parents to navigate across all programs—please stay tuned for that!

If you’d like to update your program’s picture or any specific information (currently listed with phone: {phone}), please feel free to email me directly. Also, if you have other programs you’d like to add to the site, let me know. I’m more than happy to include them.

Best regards,

Mookwon Seo
ko.laramie83@gmail.com
www.laramiecommunityhub.com

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
                    manager = row['Manager'].strip()
                    email = row['Email'].strip()
                    phone = row['Phone'].strip() if row['Phone'] else "N/A"
                    
                    # Personalized name logic: Use manager name if available, else "Program Manager"
                    recipient_name = manager if manager else f"{program} Manager"
                    
                    msg = EmailMessage()
                    msg.set_content(BODY_TEMPLATE.format(
                        recipient_name=recipient_name,
                        program=program,
                        phone=phone
                    ))
                    
                    msg['Subject'] = SUBJECT_TEMPLATE.format(program=program)
                    msg['From'] = SENDER_EMAIL
                    msg['To'] = email
                    
                    print(f"Preparing individual email for: {recipient_name} ({email})")
                    
                    # --- ACTUAL SENDING ---
                    server.send_message(msg)  # <-- UNCOMMENT THIS LINE TO ACTUALLY SEND
                    
                    print(f"Success! (Simulated)")
                    
                    # Optional: Add a small delay between emails to avoid spam filters
                    # time.sleep(1) 

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print(f"Email script initialized for {SENDER_EMAIL}.")
    print("STATUS: Individual sending mode active.")
    print("IMPORTANT: Uncomment 'server.send_message(msg)' in the script to start sending.")
    send_emails()
