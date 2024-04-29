from django.contrib import admin
from .models import Customer, Communication

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'gst_number', 'reminder_frequency')
    search_fields = ('name', 'email', 'phone', 'gst_number')

admin.site.register(Customer, CustomerAdmin)

class CommunicationAdmin(admin.ModelAdmin):
    list_display = ('customer', 'sender', 'timestamp', 'conversation')
    list_filter = ('sender',)
    search_fields = ('customer__name', 'sender__username', 'conversation')

admin.site.register(Communication, CommunicationAdmin)