from django.urls import path
from .views import RazorpayOrderView,ConfirmTrip

urlpatterns = [
    path('create-razopay-order/',RazorpayOrderView.as_view()),
    path('confirm-trip/',ConfirmTrip.as_view()),

    
]
