from django.urls import path
from .views import DriverProfileView

urlpatterns = [
    path("driver/profile/<int:driver_id>/",DriverProfileView.as_view(),name="driver-profile")
]
