from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=200)
    roll_number = models.IntegerField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name