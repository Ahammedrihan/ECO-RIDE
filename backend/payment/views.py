from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import razorpay
import os
from .serializers import BookTripSerializer
from accounts.models import Trip


class RazorpayOrderView(APIView):
    print("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")

    def post (self,request,*args, **kwargs):
        print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")


        try:
            driver_id = request.data.get('driverId')
            amount = request.data.get('amount')
           

            client = razorpay.Client(auth=(os.environ['RAZORPAY_KEY_ID'], os.environ['RAZORPAY_KEY_SECRET']))
            print(client,"CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
            
            order_params = {
                'amount': float(amount) * 100, 
                'currency': 'INR',
                'receipt': 'receipt_id',
                'payment_capture': 1,
                'notes': {
                    'driver_id': driver_id,
                    'key':os.environ['RAZORPAY_KEY_ID'],
                },
            }
            print(order_params,"ooooooooooooooooooooooooooooooooooo")
            order = client.order.create(data=order_params)
            print(order,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
            return Response(order, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ConfirmTrip(APIView):

    def post(self,request):
        data = request.data.get('userStartRideData')
        user_id = data.get('user')
        user =Trip.objects.filter(user_id = user_id)
        if user:
            return Response({"message":"Already Active On Other Trip"},status=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
        
            try:
                print(data)
                serializer = BookTripSerializer(data = data)
                if serializer.is_valid():
                    print("data ok")
                    serializer.save()
                    return Response({"message":"Data stored successfully"},status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response ({"message":"data not received"},status=status.HTTP_204_NO_CONTENT)
            
