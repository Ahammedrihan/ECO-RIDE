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
        return self.is_superuser

    def has_module_perms(self, add_label):
        return True

  
  

class AccountInfo(models.Model):


    class Gender(models.TextChoices):
        MALE = 'M','Male'
        FEMALE = 'F', 'Female'
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    dob = models.DateField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    alternate_phone = models.CharField(max_length=15)
    city = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    pin_code = models.IntegerField()
    gender = models.CharField(max_length=10, choices=Gender.choices)
    about = models.TextField(null=True, default=None, blank=True)
    lattitude =models.DecimalField(max_digits=30, decimal_places=20)
    longitude =models.DecimalField(max_digits=30, decimal_places=20)
    


class VehicleInfo(models.Model):
   

    class VehicleType(models.TextChoices):
        SEDAN = "sedan", "Sedan"
        HATCHBACK = "hatch", "Hatchback"


    user = models.ForeignKey(CustomUser,on_delete = models.CASCADE)
    regtration_number = models.CharField(max_length=10,unique=True)
    vehicle_brand = models.CharField(max_length=30)
    vehicle_name = models.CharField(max_length=30)
    vehicle_type = models.CharField(max_length=20,choices=VehicleType.choices)
    vehicle_color = models.CharField(max_length=30)
    vehicle_year = models.DateField(null=True, blank=True)
    insurance_end_date = models.DateField(null=True, blank=True)
    license_validity = models.DateField(null=True, blank=True)
    seat_capacity = models.IntegerField()
    mileage = models.IntegerField()
    vehicle_image1 = models.ImageField(upload_to="vehicle_images/",default=None,blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}{self.vehicle_brand}"


