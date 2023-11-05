from rest_framework import serializers
from accounts.models import CustomUser
from django.contrib.auth.hashers import check_password



class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style = {'input_type':'password'},write_only = True)
    class Meta:
        model = CustomUser
        fields = ['email','first_name','last_name','phone','password','password2']
        extra_kwargs ={
            'password':{'write_only':True}
        }    

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password Does't Match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        return CustomUser.objects.create_user(**validated_data)
    


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length =255)
    class Meta:
        model = CustomUser
        fields = ['email','password']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','email','first_name','last_name','date_of_birth']

class UserChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(max_length =255,style = {'input_type':'password'},write_only = True)
    new_password = serializers.CharField(max_length =255,style = {'input_type':'password'},write_only = True)
    new_password2 = serializers.CharField(max_length =255,style = {'input_type':'password'},write_only = True)

    class Meta:
        model = CustomUser
        fields = ['old_password','new_password','new_password2']

    def validate(self, attrs):

        old_password = attrs.get('old_password')
        new_password = attrs.get('new_password')
        new_password2 = attrs.get('new_password2')
        user = self.context.get('user')

        if not check_password(old_password,user.password):
            raise serializers.ValidationError("Old Password and Entered Password Doesn't Match")
            
        if new_password != new_password2:
            raise serializers.ValidationError("password doesn't match")
        user.set_password(new_password)
        user.save()
        return attrs
      



# <===============================ADMIN SIDE ====================================>

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = '__all__'
