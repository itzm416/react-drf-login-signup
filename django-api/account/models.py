from django.db import models
from django.contrib.auth.models import AbstractUser
from account.manager import MyUserManager

class MyUser(AbstractUser):
    username = models.CharField(verbose_name='Username', max_length=225, unique=True)
    email = models.EmailField(verbose_name='Email Address', unique=True)
    first_name = models.CharField(max_length=225)
    last_name = models.CharField(max_length=225)
    
    user_image = models.ImageField(upload_to='userimage', blank=True)
    tc = models.BooleanField()

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name','last_name','tc']

    def __str__(self):
        return self.email

    