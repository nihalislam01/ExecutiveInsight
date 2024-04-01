import toast, { Toaster } from 'react-hot-toast';

import '../../../styles/PlanComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAuth } from '../../../security/AuthContext';
import { paymentServiceApi } from '../../../api/PaymentApiService';

export default function PaymentForm() {

  const authContext = useAuth();
  const username = authContext.username();

  const [usd, setUsd] = useState('199.99');
  const [plan, setPlan] = useState('Annual');
  const [planId, setPlanId] = useState('price_1P0rA1EAoji8m5XPq5b5b7dO');


  const standard = () => {
    setUsd('11.99');
    setPlan('Monthly');
    setPlanId('price_1P0nvxEAoji8m5XP46rWm22v');
  }

  const premium = () => {
    setUsd('119.99');
    setPlan('Annual');
    setPlanId('price_1P0rA1EAoji8m5XPq5b5b7dO');
  }

  const handlePayment = async () => {
    const payment = {
      name: username,
      email: username,
      priceId: planId,
      numberOfLicense: 1
    }
    await paymentServiceApi(payment)
      .then((response)=>{
        authContext.setConsumer();
        toast.success(response.data);
      })
      .catch((error)=>toast.error(error.response.data))
  }

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{height: "80vh"}}>
      <Toaster />
      <div className='shadow pay'>
        <div className='d-flex'>
          <div className='container'>
            <h5 className='text-start'>Start your premium subscription with us</h5>
            <p className='m-0 text-start'>You can cancel your subscription anytime</p>
            <hr />
            <div className='d-flex justify-content-center'>
              <div className='plan-button' onClick={premium}>
                <h6 className='text-start m-2'>Billed Annually</h6>
                <div className='d-flex px-2'>
                  <p className='plan-value'><FontAwesomeIcon icon={faDollar} /></p>
                  <h1>9</h1>
                  <p className='plan-value'>.99 USD/month</p>
                </div>
                </div>
              <div className='plan-button' onClick={standard}>
                <h6 className='text-start m-2'>Billed Monthly</h6>
                <div className='d-flex px-2'>
                  <p className='plan-value'><FontAwesomeIcon icon={faDollar} /></p>
                  <h1>11</h1>
                  <p className='plan-value'>.99 USD/month</p>
                </div>
                </div>
            </div>
            <div className='d-flex justify-content-between'>
              <p>1 {plan} subscription @ {usd} USD each</p>
              <p>{usd} USD</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p className='m-0'>Sales Tax</p>
              <p className='m-0'>0.00 USD</p>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h6>Sub Total</h6>
              <h6>{usd} USD</h6>
            </div>

          </div>
          <div className='container text-start'>
            <h5>Payment Information</h5>
            <label className='m-0'>Card Number</label>
            <input type='text' className="form-control input" placeholder={`xxxx xxxx xxxx xxxx`} />
            <div className='d-flex'>
              <div className='p-1'>
              <label className='m-0'>Expiration Month</label>
              <input type='text' className="form-control input" placeholder='MM' />
              </div>
              <div className='p-1'>
              <label className='m-0'>Expiration Year</label>
              <input type='text' className="form-control input" placeholder='YY' />
              </div>
              <div className='p-1'>
              <label className='m-0'>CVC</label>
              <input type='text' className="form-control input" placeholder='3 digits' />
              </div>
            </div>
            <button className='btn form-control my-4' style={{backgroundColor: "#669bbc", color: "white"}} onClick={handlePayment}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
