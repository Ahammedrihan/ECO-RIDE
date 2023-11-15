from rest_framework import serializers
from accounts.models import CustomUser,AccountInfo,VehicleInfo



# <======================DRIVER PROFILE VIEW SERIALIZER=======================>


class DriverProfileAccountInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountInfo
        fields = "__all__"

class DriverProfileVehicleInfo(serializers.ModelSerializer):
    class Meta:
        model = VehicleInfo
        fields = "__all__"

class DriverProfileSerializer(serializers.ModelSerializer):
    account_info = DriverProfileAccountInfoSerializer()
    vehicle_info = DriverProfileVehicleInfo()

    class Meta:
        model = CustomUser
        fields = ["id", "email", "first_name", "phone", "last_name", "is_active", "date_joined", "account_info", "vehicle_info"]


# serilizer meythod field, related 




 

    