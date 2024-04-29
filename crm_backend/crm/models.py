from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    gst_number = models.CharField(max_length=20)
    reminder_frequency = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Communication(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    conversation = models.TextField()

    def __str__(self):
        return f"Conversation with {self.customer.name} at {self.timestamp} by {self.sender.username}"
