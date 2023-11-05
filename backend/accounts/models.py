from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None,**extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        normalized_email=self.normalize_email(email)
        email_org=normalized_email.lower()

        user = self.model(email=email_org,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,password=None,**extra_fields):
        user = self.create_user(email,password=password,**extra_fields)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    



class CustomUser(AbstractBaseUser):
    Role_Choices = [
      ("admin","Admin"),
      ("user","User"),
      ("driver","Driver")
    ]
    email = models.EmailField(max_length=255,unique=True)
    first_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    last_name = models.CharField(max_length=255)
    role = models.CharField(max_length=20,choices=Role_Choices, default= "user")
    
    is_driver = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name"]

    def save(self, *args, **kwargs):
        if self.is_staff:
            self.role = "admin"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True

  
  

