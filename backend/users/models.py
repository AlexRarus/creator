from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class UserRoles(models.TextChoices):
    USER = "user"
    MODERATOR = "moderator"
    ADMIN = "admin"


class CustomUser(AbstractUser):
    first_name = models.CharField(
        max_length=50, blank=True, verbose_name="First name"
    )
    last_name = models.CharField(
        max_length=50, blank=True, verbose_name="Last name"
    )
    username = models.SlugField(
        max_length=254, unique=True, blank=True, null=True
    )
    email = models.EmailField(max_length=254, unique=True)
    role = models.CharField(
        max_length=10,
        blank=True,
        choices=UserRoles.choices,
        default=UserRoles.USER,
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    @property
    def is_admin(self):
        return (
            self.role == UserRoles.ADMIN or self.is_staff or self.is_superuser
        )

    @property
    def is_moderator(self):
        return self.role == UserRoles.MODERATOR

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
        ordering = ("email",)


@receiver(pre_save, sender=CustomUser)
def set_username(sender, instance, **kwargs):
    if not instance.username:
        counter = 1
        slug = slugify(instance.email)
        username = slug
        while CustomUser.objects.filter(username=username):
            username = f"{slug}{counter}"
            counter += 1
        instance.username = username
