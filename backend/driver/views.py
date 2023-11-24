from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from accounts.models import CustomUser ,VehicleInfo
from .serializers import DriverProfileSerializer,DeleteDriverSerializer
from rest_framework.response import Response
from rest_framework import status

class DriverProfileView(APIView):
    permission_classes  = [IsAuthenticated]

    def get(self,request,driver_id):
        try:
            driver = CustomUser.objects.get(id = driver_id)
            serializer = DriverProfileSerializer(driver)
            print(serializer)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "Driver not found"}, status=status.HTTP_404_NOT_FOUND)


        
    # def delete(self,request,driver_id):
    #     serializer = DeleteDriverSerializer(data=request.data)
    #     if serializer.is_valid():
    #         try:
    #             vehicle = VehicleInfo.objects.get(id = driver_id)
    #             vehicle.default()
                
    #             return Response({"message":"vehicle deleted succesfully"},status=status.HTTP_204_NO_CONTENT)
    #         except VehicleInfo.DoesNotExist:
    #             return Response ({"error":"Driver Not Found"},status=status.HTTP_404_NOT_FOUND)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DriverDeleteVehicle(APIView):
    print("kjhdhckjaca")
    permission_classes  = [IsAuthenticated]
    def post(self,request,vehicle_id):
        print("kjhdhckjaca")
        print(vehicle_id,"this is the vehicle id")
        serializer = DeleteDriverSerializer()
        try:
            vehicle = VehicleInfo.objects.get(id = vehicle_id)
            vehicle.delete()
            
            return Response({"message":"vehicle deleted succesfully"},status=status.HTTP_204_NO_CONTENT)
        except VehicleInfo.DoesNotExist:
            return Response ({"error":"vehicle Not Found"},status=status.HTTP_404_NOT_FOUND)
    
    def patch(self,request,vehicle_id,driver_id):
        try:
            driver_vehicles = VehicleInfo.objects.filter(user_id = driver_id)
            default_one = driver_vehicles.get(id = vehicle_id)
            non_other = driver_vehicles.exclude(id = vehicle_id)
            if default_one:
                default_one.default = True
                for i in non_other:
                    i.default = False
                    i.save()

                default_one.save() 
                return Response({"msg":" Set default Success"},status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"error":"Vehicle not found for the specified driver and ID"},status=status.HTTP_404_NOT_FOUND)
        except VehicleInfo.DoesNotExist:
            return Response ({"error":"vehicle Not Found"},status=status.HTTP_404_NOT_FOUND)


            




