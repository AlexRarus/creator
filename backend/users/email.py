from django.conf import settings
from djoser import email


class PasswordReset(email.PasswordResetEmail):
    template_name = "email/password_reset.html"

    def send(self, to, *args, **kwargs):
        bcc = [settings.DEFAULT_FROM_EMAIL]
        try:
            super().send(to, *args, **kwargs, bcc=bcc)
        except Exception:
            print(f"Couldn't send mail to {to}")
            raise


class ActivationEmail(email.ActivationEmail):
    template_name = "email/activation.html"

    def send(self, to, *args, **kwargs):
        bcc = [settings.DEFAULT_FROM_EMAIL]
        try:
            super().send(to, *args, **kwargs, bcc=bcc)
        except Exception:
            print(f"Couldn't send mail to {to}")
            raise
