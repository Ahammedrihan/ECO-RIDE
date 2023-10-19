from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, UserLoginSerializer ,UserProfileSerializer,UserChangePasswordSerializer

from django.contrib.auth import authenticate
from accounts.renderers import CustomUserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated



# Function to generate token manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes = [CustomUserRenderer]
    def post(self,request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response({'msg':"reg sucess"},status=status.HTTP_201_CREATED)
         
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    renderer_classes = [CustomUserRenderer]

    def post(self,request,format=None):
        serializer = UserLoginSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get("password")
            user = authenticate(email=email,password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({"token":token ,"msg":"login sucess"},status=status.HTTP_200_OK)
            else:
                return Response({"errors":{'non_field_errors':['email or password is not valid ']}},status=status.HTTP_404_NOT_FOUND)   
        return Response({serializer.errors},status = status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    renderer_classes =  [CustomUserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format = None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    


class UserChangePasswordView(APIView):
    renderer_classes = [CustomUserRenderer]
    permission_classes =[IsAuthenticated]
    def post(self,request,format= None):
        serializer = UserChangePasswordSerializer(data = request.data,context ={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({"msg":"password change successfull"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)





