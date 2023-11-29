from rest_framework import serializers
from accounts.models import CustomUser,AccountInfo,VehicleInfo,ActiveDrivers



# <======================DRIVER PROFILE VIEW SERIALIZER=======================>


class DriverProfileAccountInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountInfo
        exclude = ["address"]

class DriverProfileVehicleInfo(serializers.ModelSerializer):
    class Meta:
        model = VehicleInfo
        fields = "__all__"

class DriverProfileSerializer(serializers.ModelSerializer):
    account_info = serializers.SerializerMethodField()

    def get_account_info(self, obj):
        account_info_instances = obj.account_info.all()
        return DriverProfileAccountInfoSerializer(account_info_instances, many=True).data

    vehicle_info = DriverProfileVehicleInfo(read_only=True, many=True)
    class Meta:
        model = CustomUser
        fields = ["id", "email", "first_name", "phone", "last_name", "is_active", "date_joined",  "vehicle_info", "account_info"]


# serilizer meythod field, related 


# <======================DRIVER PROFILE VIEW SERIALIZER END=======================>



class DeleteDriverSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    class Meta:
        model = VehicleInfo
        fields = "__all__"

class DriverActiveLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveDrivers
        fields = "__all__"
        




 

    