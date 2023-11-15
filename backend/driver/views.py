from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from accounts.models import CustomUser
from .serializers import DriverProfileSerializer
from rest_framework.response import Response
from rest_framework import status

class DriverProfileView(APIView):
    permission_classes  = [IsAuthenticated]

    def get(self,request,driver_id):
        try:
            driver = CustomUser.objects.get(id = driver_id)
            serializer_class = DriverProfileSerializer(driver)
            print(serializer_class)
            return Response(serializer_class.data,{"msg":"sucess"},status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "Driver not found"}, status=status.HTTP_404_NOT_FOUND)


        
           
