from django.urls import path
from .views import DriverProfileView,DriverDeleteVehicle

urlpatterns = [
    path("driver/profile/<int:driver_id>/",DriverProfileView.as_view(),name="driver-profile"),
    path("driver/profile/vehicle-delete/<int:vehicle_id>/",DriverDeleteVehicle.as_view(),name="driver-delete"),
    path("driver/profile/set-default/<int:vehicle_id>/<int:driver_id>/",DriverDeleteVehicle.as_view(),name="driver-delete"),
]

