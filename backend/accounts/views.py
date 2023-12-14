from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, UserLoginSerializer ,UserProfileSerializer,UserChangePasswordSerializer,UserSerializer,DriverSerializer
from .serializers import AddressSerializer , AddVehicleSerializer ,BasicProfileSerializer 
from driver.serializers import DriverProfileSerializer ,DriverBasicInfoSerializer
from rest_framework.generics import ListAPIView
from .models import CustomUser, AccountInfo,VehicleInfo,Profile,ActiveDrivers
from django.db.models import Q

from django.contrib.auth import authenticate
from accounts.renderers import CustomUserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from driver.serializers import DriverProfileVehicleInfo



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['first_name'] = user.first_name
        token['is_superuser'] = user.is_superuser
        token['email'] = user.email
        token['role'] = user.role
        token['phone'] = user.phone

        print(token)
        return token

       
    
class MyTokenObtainPairView(TokenObtainPairView):
    
    serializer_class = MyTokenObtainPairSerializer


   

class UserRegistrationView(APIView):
    renderer_classes = [CustomUserRenderer]
    permission_classes = [AllowAny]
    def post(self,request,format=None):
        print(request.data,"beforre serialize")
        print(request,"request")
        serializer = UserRegistrationSerializer(data=request.data)
        print(serializer,"after serialization")
        if serializer.is_valid():
            user = serializer.save()
            return Response({'msg':"reg sucess"},status=status.HTTP_201_CREATED)
        print(serializer.error_messages)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class DriverRegistrationView(APIView):
    renderer_classes = [CustomUserRenderer]
    permission_classes = [AllowAny]
    
    def post(self,request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            
            user = serializer.save()
            user.role = "driver"
            user.is_driver = True
            user.save() 
            print(user.role, "role of user")
            return Response({'msg':"reg sucess"},status=status.HTTP_201_CREATED)
        print(serializer.error_messages)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    



# class UserLoginView(APIView):
#     renderer_classes = [CustomUserRenderer]

#     def post(self,request,format=None):
#         serializer = UserLoginSerializer(data = request.data)
#         if serializer.is_valid(raise_exception=True):
#             email = serializer.data.get('email')
#             password = serializer.data.get("password")
#             user = authenticate(email=email,password=password)
#             print(user)
#             if user is not None:
               
#                 return Response({"msg":"login sucess"},status=status.HTTP_200_OK)
#             else:
#                 return Response({"errors":{'non_field_errors':['email or password is not valid ']}},status=status.HTTP_404_NOT_FOUND)   
#         return Response({serializer.errors},status = status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,user_id):
        try:
            user = CustomUser.objects.get(id = user_id)
            serializer = UserProfileSerializer(user)
            print(serializer)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "user not found"}, status=status.HTTP_404_NOT_FOUND)


class UserChangePasswordView(APIView):
    print("helooooooooo")
    renderer_classes = [CustomUserRenderer]
    permission_classes =[IsAuthenticated]
    print("issue with renderer class")
    print("issue with user login")
    
    def post(self,request,format= None):
        print(request.data,"kjb")
        print("function entered")
        print(request.user)
        
        serializer_class = UserChangePasswordSerializer(data = request.data,context ={'user':request.user})
        if serializer_class.is_valid(raise_exception=True):
            return Response({"msg":"password change successfull"},status=status.HTTP_200_OK)
        return Response(serializer_class.errors,status=status.HTTP_400_BAD_REQUEST)



class UserListView(ListAPIView):
    permission_classes =[AllowAny]
    serializer_class = UserSerializer

    def get_queryset(self):
        query = CustomUser.objects.filter(role="user")
        print(query)
        search = self.request.query_params.get('search',None)
        if search==None:
            return query
        else:
            queryset = query.filter(
                Q(id__icontains =search)|
                Q(first_name__icontains=search)|
                Q(last_name__icontains=search)|
                Q(email__icontains=search)|
                Q(phone__icontains=search))
            return queryset
       


class DriverListView(ListAPIView):
    permission_classes =[AllowAny]
    serializer_class = DriverSerializer
    def get_queryset(self):
        query = CustomUser.objects.filter(role ="driver")
        print(query)
        search = self.request.query_params.get('search',None)
        if search == None:
            return query
        else:
            queryset = query.filter(
                Q(id__icontains =search)|
                Q(first_name__icontains=search)|
                Q(last_name__icontains=search)|
                Q(email__icontains=search)|
                Q(phone__icontains=search))
            return queryset



       
       

class UserBlock(APIView):
    permission_classes = [AllowAny]

    def patch(self,request,user_id):
        try:
            user = CustomUser.objects.get(id = user_id)
            print(user)

            user.is_active = not user.is_active
            user.save()
            print(user.is_active,"user status")
            if not user.is_active:
                message = "User blocked successfully"
            else:
                message = "User Unblocked sucessfully"
            return Response({"message":message},status=status.HTTP_200_OK)
        except Exception as e:
            return Response ({"message":str(e)},status=status.HTTP_400_BAD_REQUEST)




        

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post (self,request):
        try:

            refresh_token=request.data["refresh_token"]
            token=RefreshToken(refresh_token)
            token.blacklist()
            print(request.user,"cbnx,xn,mxncmxn")
            print(request.data["refresh_token"])
            return Response(status=status.HTTP_205_RESET_CONTENT)
                  
        
        except Exception as e:

            return Response(status=status.HTTP_400_BAD_REQUEST)

            

    

    
           

  

  

class UserAddAddressView(APIView):
    permission_classes = [IsAuthenticated]
    serializer  = AddressSerializer

    def post(self,request,user_id):
        try:
            user = CustomUser.objects.get(id = user_id)
            print(user.id)
            print(request.data)
            data = request.data.copy()
            data['user'] = user.id 
            serializer_class = self.serializer(data=request.data)
            print(serializer_class)
            if serializer_class.is_valid():
                print("ASDFGHJKHGFDSDFGHJ")
                serializer_class.save()
                return Response({"msg":"address info suceess"},status=status.HTTP_201_CREATED)
            return Response({"msg":"invalid data received", "errors": serializer_class.errors}, status = status.HTTP_400_BAD_REQUEST)
            
        except CustomUser.DoesNotExist:
            return Response({"error":"User Not Found"}, status=status.HTTP_404_NOT_FOUND)
        

class UserBasicProfileView(APIView):
    permission_classes = [IsAuthenticated]
   
    def get(self,request,user_id):
        try:
            user = CustomUser.objects.get(id = user_id)
            try:
                user_basic_profile = Profile.objects.get(user = user)
                serializer_class = BasicProfileSerializer(user_basic_profile)
                return Response(serializer_class.data,status=status.HTTP_204_NO_CONTENT)
            except :
                return Response ({"msg":"user basic profile doesnot exist","error": "Profile is incomplete"},status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response ({"msg":"user  doesnot exist"},status=status.HTTP_404_NOT_FOUND)


            


from rest_framework.parsers import MultiPartParser

# class AddVehicleView(viewsets.ModelViewSet):
#     serializer_class = AddVehicleSerializer
#     parser_classes = [MultiPartParser]

#     def create(self, request, *args, **kwargs):
#         print("Request data:", request.data)
#         copy_data = request.data.copy()
#         vehicle_image1 = request.FILES.get("vehicle_image1")
#         print(vehicle_image1)
#         copy_data["vehicle_image1"] = vehicle_image1

#         serializer = self.serializer_class(data=copy_data)

#         if serializer.is_valid():
#             print("ASDFGHJKHGFDSDFGHJ")
#             serializer.save()

#             return super().create(request, *args, **kwargs)
#         else:
#             print("Serializer is not valid:", serializer.errors)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser


class AddVehicleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        print(user_id,"userid")
        vehicle = VehicleInfo.objects.filter(user_id = user_id)
        print(vehicle,"user vehicle")
        print(len(vehicle))
        if len(vehicle) < 4 :

            image = request.FILES.get("vehicle_image1")
            print(image)
            print(request.FILES.get("vehicle_image1"))
            copy = request.data.copy()
            copy["vehicle_image1"] = image
            serializer = AddVehicleSerializer(data=copy) 
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"msg":"max 4 vehicles"})


class DeleteAddress(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,address_id):
        try:
            address = AccountInfo.objects.get(id = address_id)
            address.delete()
            return Response({"message":"address deleted succesfully"},status=status.HTTP_204_NO_CONTENT)
        except VehicleInfo.DoesNotExist:
            return Response ({"error":"address Not Found"},status=status.HTTP_404_NOT_FOUND)
        

from math import radians, cos, sin, asin, sqrt

import json


class FindNearByDriver(APIView):
    @staticmethod

    def find_distance(user_lat,user_long,driver_lat,driver_long):
                        user_lat = radians(user_lat)
                        user_long = radians(user_long)
                        driver_lat = radians(driver_lat)
                        driver_long = radians(driver_long)

                        dlon = user_long - driver_long
                        dlat = user_lat - driver_lat
                        a = sin(dlat / 2)**2 + cos(driver_lat) * cos(user_lat) * sin(dlon / 2)**2
                        c = 2 * asin(sqrt(a)) 
                        r = 6371
                        return(c * r)

    def put(self,request,user_id):
        try:
            user_starting_location_details = request.data
            user_starting_coordinates =  request.data.get("coordinates")

            try:
                user = CustomUser.objects.get(id = user_id)
                user_account = AccountInfo.objects.filter(user = user)
                user_long = user_starting_coordinates[0]
                user_lat = user_starting_coordinates[1]
                print(user_long,"staring point")
                print(user_lat,"staring point")

                try:
                    drivers = ActiveDrivers.objects.all()
                

                  
                    user_driver_distance_array = []
                    for driver in drivers:
                            
                            driver_basic_details = CustomUser.objects.get(id = driver.user_id)
                            basic_info_serializer = DriverBasicInfoSerializer(driver_basic_details)
                            driver_basic = basic_info_serializer.data
                            print(driver_basic)

                            
                            driver_vehicle = VehicleInfo.objects.get(id = driver.active_vehicle_id)
                            serializer = DriverProfileVehicleInfo(driver_vehicle)
                            vehicle = serializer.data
                            print(vehicle,"VECHILE")
                          
                            a = self.find_distance(user_lat,user_long,driver.latitude,driver.longitude)
                            b = {
                                "driver_id" : driver.id,
                                "distance": round(a,2),
                                "latitude": driver.latitude,
                                "longitude": driver.longitude,
                                "driver_vehicle":vehicle,
                                "driver_basic":driver_basic
                            }
                            user_driver_distance_array.append(b)
                  
                    return Response(user_driver_distance_array,status=status.HTTP_200_OK)
                except :
                    return Response({"message":"driver address Not Found"},status=status.HTTP_404_NOT_FOUND)

            except:
                return Response({"message":"user address Not Found"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"message":"Enter Your Locations First"},status=status.HTTP_404_NOT_FOUND)


class UserDefaultAddress(APIView):

    def get(self,request):
        user = request.user
        try:
            user_default_address = AccountInfo.objects.get(user_id = user,default = True)
            serializer = AddressSerializer(user_default_address)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response({"message":"Default Address Not Found"},status=status.HTTP_404_NOT_FOUND)
        
            
class UserFromToDestinationDistanceFinder(APIView):
    def post (self,request):
        data = request.data
        from_latitude = data.get('from_latitude')
        from_longitude = data.get('from_longitude')
        to_latitude = data.get('to_latitude')
        to_longitude = data.get('to_longitude')
        distance_total = FindNearByDriver.find_distance(from_latitude,from_longitude,
                                                         to_latitude,to_longitude)
        distance = round(distance_total,2)
       
        return Response({'distance': distance}, status=status.HTTP_200_OK)
    


class TripAmount(APIView):
    print("aksjdlkajaklalknalkdnalkndalskd")
  
    RATE_PER_KM= {
        'sedan':25,
        'hatch':30,
        'xuv':40
    }
    TAX_RATE = 18/100

    def findAmount(self,each_vehicle_amount,distance):
        amount =  each_vehicle_amount * distance["distance"]
        tax = amount * self.TAX_RATE
        total_amount = tax + amount
        amount_details = {
            'amount' :round(amount,2),
            'tax' : round(tax,2),
            'total_amount' :round(total_amount,2)
        }
        return amount_details

    def post(self,request):

        try:
            data = request.data
            driver_id  = data.get('driverId')
            distance  = data.get('distance')
            vehicle_type  = data.get('vehicleType')
            rate_per_km = self.RATE_PER_KM[vehicle_type]
            amount = self.findAmount(rate_per_km,distance)
            # request.amount_details = amount
            return Response(amount,status=status.HTTP_200_OK)
        except:
            return Response({"message":"data not received properly"},status=status.HTTP_404_NOT_FOUND)


                  





        
        

    
    # class DistanceCalculator:
    # def calculate_distance(lat1,lon1,lat2,lon2):
    #     # user lat user long driver lat diver long

    #     lat1,lon1,lat2,lon2 = map(radians,[lat1,lon1,lat2,lon2])
    #     dlon = lon1 - lon2 
    #     dlat =  lat1 -lat2 
    #     a = sin(dlat / 2) ** 2 + cos(lat2) * cos(lat1) * sin(dlon / 2) ** 2
    #     c = 2 * asin(sqrt(a))
    #     r = 6371 
    #     return c * r
   
    





        # for driver in drivers:
        #     driver_info = AccountInfo.objects.filter(user = driver).first()
        #     if driver_info :
        #         driver_dic = {
        #              "driver":driver_info.user_id,
        #              "driver_longitude" : driver_info.longitude,
        #              "driver_latitude": driver_info.latitude
        #         }
        #         driver_info_list.append(driver_dic)


        # print(driver_info_list,"list of drivers ")

        # final  = []
        # for i in driver_info_list :
        #     a = find_distance(user_lat,user_long,i["driver_latitude"],i["driver_longitude"])
        #     b = {
        #         "driver_id":i["driver"],
        #         "distance" : a
        #     }
        #     final.append(b)
        # print(final)
        # return Response({"msg":f"hekllo,{user}"})


    


                
