import React,{ useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import config from '../config/config'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { Redirect } from "react-router";
import Cookies from "js-cookie";


export const CheckoutForm = (props) => {
  // alert(props.amount);

  const [ButtonDisable, setButtonDisable] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  const trxamount = props.amount
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(!trxamount){
      setErrorMessage("Please enter the amount");
      return;
    }
    setErrorMessage('');
    setButtonDisable(true);

    if(props.itemData[1] === undefined){
      toast.error('Firstly you have to login!', {
        position: toast.POSITION.TOP_CENTER , 
      })
      setTimeout(() => {
        
        window.location.href = `${config.baseUrl}login`
      }, 500);
   }
   if(props.itemData[2] === 'Auction'){

     if( parseFloat(trxamount) < parseFloat(props.itemData[3])){
      setErrorMessage('Bid price should be greater than '+ props.itemData[3])
      //   toast.error('Bid price should be greater than '+ props.itemData[3], {
      //     position: toast.POSITION.TOP_CENTER , 
      //    });
         setButtonDisable(false);
         return;
    }else{
      setErrorMessage('')
    }
   }
   
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      
      try {
        const  {id}  = paymentMethod;
        const response = 

        await axios({
          method: 'post',
          url: `${config.apiUrl}charge`,
          headers: { "Authorization": props.itemData[5] },
          data: {
            email: props.itemData[6],
            amount: trxamount,
            id: id,
            user_id: props.itemData[1],
            sell_type: props.itemData[2],
            item_edition_id: props.itemData[0],
            item_id:props.itemData[4],
            user_address:props.user_address,
          }
       })
        // await axios.post(
          
        //   `${config.apiUrl}charge`,
        //   {
        //     amount: trxamount,
        //     id: id,
        //     user_id: props.itemData[1],
        //     sell_type: props.itemData[2],
        //     item_edition_id: props.itemData[0],
        //     item_id:props.itemData[4],
        //     user_address:props.user_address,
        //   }
        // );  

        
        // let transction_id = response.data.transaction_id
        if (response.data.success) {
          
          // const response = axios.post(
          //   `${config.apiUrl}stripe_success`,
          //   {
          //     bid_price: trxamount,
          //     user_id: props.itemData[1],
          //     sell_type: props.itemData[2],
          //     item_edition_id: props.itemData[0],
          //     item_id:props.itemData[4],
          //   }
          //   )

            var willSearch =  await Swal.fire({
              title: 'Payment successful!',
              text: 'Congratulations, you are successfully completed the payment.',
              icon: 'success',
              width:500,
              confirmButtonColor: '#3085d6',
              allowOutsideClick: false,
              // showCancelButton: true,
              confirmButtonText: 'View Purchased items',
              // cancelButtonText: 'No, keep it'
            });
          
            Cookies.set('paymentFor',props.itemData[2]);
            // Cookies.set('purchase_item_id',props.itemData[0])
            Cookies.set('purchase_item_id',response.data?.transaction_id)

            

            window.location.href =`${config.baseUrl}purchasedetail`
            
        }
      } catch (error) {
        setButtonDisable(false);
        setErrorMessage(error);
        
      }
    } else {
      setErrorMessage(error.message);
      setButtonDisable(false);
      
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <ToastContainer/>
      <CardElement />
      <span style={{color:'red',fontFamily:'cursive',textAlign:'center'}}>{ErrorMessage}</span>
      <button className="btn btn-primary col-sm-12 size-1 " disabled={ButtonDisable}>
        {(ButtonDisable)?'Processing...':(props.itemData[2] === 'Auction' ? 'Place bid':'Purchase')} </button>
    </form>
  );
};