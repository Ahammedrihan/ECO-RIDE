from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from accounts.models import CustomUser ,VehicleInfo,ActiveDrivers,AccountInfo
from .serializers import DriverProfileSerializer,DeleteDriverSerializer,DriverActiveLocationSerializer,DriverProfileAccountInfoSerializer
from .serializers import DriverActiveLocationSerializer
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

class DriverManageVehicle(APIView):

    permission_classes  = [IsAuthenticated]
    def post(self,request,vehicle_id):
        try:
            vehicle = VehicleInfo.objects.get(id = vehicle_id)
            vehicle.delete()
            return Response({"message":"vehicle deleted succesfully"},status=status.HTTP_204_NO_CONTENT)
        except VehicleInfo.DoesNotExist:
            return Response ({"error":"vehicle Not Found"},status=status.HTTP_404_NOT_FOUND)
    
    def patch(self,request,vehicle_id,driver_id):
        try:
            vehicle = VehicleInfo.objects.get(id = vehicle_id)
            other_vehicles = VehicleInfo.objects.filter(user_id = driver_id).exclude(id = vehicle_id).update(default = False)

            if vehicle :
                vehicle.default = True
                vehicle.save()
                return Response({"msg":" Set default Success"},status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"error":"Vehicle not found for the specified driver and ID"},status=status.HTTP_404_NOT_FOUND)
        except VehicleInfo.DoesNotExist:
            return Response ({"error":"vehicle Not Found"},status=status.HTTP_404_NOT_FOUND)


      
        
class DriverManageAddress(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request,address_id):
        try:
            address = AccountInfo.objects.get(id = address_id)
            address.delete()
            return Response({"message":"Address deleteion Sucess"},status=status.HTTP_200_OK)
        except AccountInfo.DoesNotExist:
            return Response({"message":"Address Not Found"},status=status.HTTP_404_NOT_FOUND)
        
    def patch(self,request,address_id):
        driver_id = request.user.id
        try:
            address = AccountInfo.objects.get(id = address_id)
            AccountInfo.objects.filter(user_id= driver_id).exclude(id = address_id).update(default = False)
            if address:
                address.default = True
                address.save()
               
                return Response({"message":" Address Set Default Success"},status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"message":"Address Not Found"},status=status.HTTP_404_NOT_FOUND)
        except AccountInfo.DoesNotExist:
             return Response({"message":"Address Not Found"},status=status.HTTP_404_NOT_FOUND)





            


class DriverActiveLocationView(APIView):
    permission_classes =[IsAuthenticated]

    def post(self,request):
        print(request.data)
        serializer = DriverActiveLocationSerializer(data = request.data)
        if serializer.is_valid():

           return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)



class DriverDefaultAddressView(APIView):
    permission_classes =[IsAuthenticated]
        
    def get(self,request,driver_id):
        try:
            driver = CustomUser.objects.get(id = driver_id)
            try:
                default_driver_address = AccountInfo.objects.get(user_id = driver,default = True)
                serializer = DriverProfileAccountInfoSerializer(default_driver_address)
                return Response(serializer.data,status=status.HTTP_200_OK)
            except AccountInfo.DoesNotExist:
                return Response({"message":"You don't have any active  address"},status=status.HTTP_404_NOT_FOUND)
        except CustomUser.DoesNotExist:
            return Response({"message":"Driver Not Found"},status=status.HTTP_404_NOT_FOUND)

        
        


class ActiveDriverView(APIView):
    permission_classes = [IsAuthenticated]
    def post (self,request):

        driver_present = ActiveDrivers.objects.filter(user_id =request.user.id )
        if driver_present:
            return Response({"message":"Driver Already active"},status=status.HTTP_204_NO_CONTENT)
        else:
            try:
                user_id = request.user.id
                active_vehicle = VehicleInfo.objects.get(user = user_id,default = True)
                try:
                    driver_default_address = AccountInfo.objects.get(user = user_id,default = True)
                except:
                    pass
                data = { 
                    "user":user_id,
                    "active_vehicle" : active_vehicle.id,
                    "latitude": request.data.get("latitude"),
                    "longitude": request.data.get("longitude"),
                }
                print(data)
                if data["latitude"] and data["longitude"]:
                    data["existing_address"] = None
                else:
                    data["existing_address"] = driver_default_address.id
                serializer = DriverActiveLocationSerializer(data = data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                print(serializer.errors)
            except VehicleInfo.DoesNotExist:
                return Response({"message": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)
            # except AccountInfo.DoesNotExist:
            #     return Response({"msg": "Default address not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response({"message": "Unexpected error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def patch(self,request):

        driver_id = request.user.id
        active_driver_instance = ActiveDrivers.objects.get(user_id = driver_id)
        active_driver_instance.delete()
        return Response({"message":"deletion sucess"},status=status.HTTP_200_OK)

