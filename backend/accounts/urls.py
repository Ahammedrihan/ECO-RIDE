from django.contrib import admin
from django.urls import path
from .views import UserRegistrationView, UserProfileView,UserChangePasswordView ,UserListView,DriverListView,UserBlock,LogoutView,DriverRegistrationView
from .views import UserAddAddressView ,AddVehicleView

urlpatterns = [
    path('register/',UserRegistrationView.as_view(),name ="register"),
    path('driver-register/',DriverRegistrationView.as_view(),name ="driver_register"),

    path('profile/',UserProfileView.as_view(),name ="profile"),
    path('reset-password/',UserChangePasswordView.as_view(),name ="reset-password"),
    path('get-users/', UserListView.as_view(), name='users-list'),
    path('user-logout/', LogoutView.as_view(), name='users-list'),
    path('get-drivers/', DriverListView.as_view(), name='drivers-list'),
    path('user-block/<int:user_id>/', UserBlock.as_view(), name='user-block'),
    path('user-address/<int:user_id>/',UserAddAddressView.as_view(), name='user-address'),
    path('add-vehicle/<int:user_id>/',AddVehicleView.as_view(),name = "add-vehicle"),
    

]
