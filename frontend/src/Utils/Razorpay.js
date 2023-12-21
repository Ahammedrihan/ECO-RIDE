import axios from "./axios";

export const loadRazorPayScript = ()=>{
    return new Promise((resolve,reject)=>{
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    })
}


export const createRazorPayOrder = async(driverId,amount,userAccessToken) =>{

    try{
        const response = await axios.post('api/payment/create-razopay-order/',{
            driverId,amount
        },{
            headers:{
                Authorization: `Bearer ${userAccessToken}`
            }
        })
            console.log(response.data)
            return response.data
        }catch(error){
            console.log('Error creating Razorpay order:', error);
            throw error;
        }
    }