from django.contrib import admin
from django.urls import path
from .views import UserRegistrationView, UserProfileView,UserChangePasswordView ,UserListView,DriverListView,UserBlock

urlpatterns = [
    path('register/',UserRegistrationView.as_view(),name ="register"),
    path('profile/',UserProfileView.as_view(),name ="profile"),
    path('resetpassword/',UserChangePasswordView.as_view(),name ="resetpassword"),
    path('get-users/', UserListView.as_view(), name='users-list'),
    path('get-drivers/', DriverListView.as_view(), name='drivers-list'),
    path('user-block/<int:user_id>/', UserBlock.as_view(), name='user-block'),


]
