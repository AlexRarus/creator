from djoser import email


class PasswordReset(email.PasswordResetEmail):
    template_name = "email/password_reset.html"


class ActivationEmail(email.ActivationEmail):
    template_name = "email/activation.html"
