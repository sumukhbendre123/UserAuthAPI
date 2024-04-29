# crm/urls.py
from django.urls import path
from .views import CustomerListCreateAPIView, CustomerDetailAPIView, CommunicationListCreateAPIView, RegisterAPIView, SendEmailAPIView, VerifyEmailAPIView, LoginAPIView

urlpatterns = [
    path('customers/', CustomerListCreateAPIView.as_view(), name='customer-list-create'),
    path('customers/<int:pk>/', CustomerDetailAPIView.as_view(), name='customer-detail'),
    path('communications/', CommunicationListCreateAPIView.as_view(), name='communication-list-create'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='register'),
    path('verify-email/', VerifyEmailAPIView.as_view(), name='verify_email'),
    path('send-email/', SendEmailAPIView.as_view(), name='send-email'),
]
