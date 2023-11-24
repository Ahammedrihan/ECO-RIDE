from rest_framework import serializers
from accounts.models import CustomUser,AccountInfo,VehicleInfo



# <======================DRIVER PROFILE VIEW SERIALIZER=======================>


# class DriverProfileAccountInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AccountInfo
#         fields = "__all__"

class DriverProfileVehicleInfo(serializers.ModelSerializer):
    class Meta:
        model = VehicleInfo
        fields = "__all__"

class DriverProfileSerializer(serializers.ModelSerializer):
    # account_info = DriverProfileAccountInfoSerializer(read_only = True)
    vehicle_info = DriverProfileVehicleInfo(read_only = True,many=True)

    class Meta:
        model = CustomUser
        fields = ["id", "email", "first_name", "phone", "last_name", "is_active", "date_joined",  "vehicle_info"]


# serilizer meythod field, related 



class DeleteDriverSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    class Meta:
        models = VehicleInfo
        fields = "__all__"




 

    