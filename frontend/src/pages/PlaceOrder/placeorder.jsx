import React, { useContext } from 'react';
import './placeorder.css';
import { StoreContext } from '../../Context/StoreContext';

const Placeorder = () => {

    const { getTotalAmount } = useContext(StoreContext);

    const cartAmount = getTotalAmount();  // Base cart amount (without taxes and charges)
    const makingCharges = cartAmount * 0.10;  // 10% making charges
    const sgst = cartAmount * 0.015;          // 1.5% SGST
    const cgst = cartAmount * 0.015;          // 1.5% CGST
    const finalAmount = cartAmount + makingCharges + sgst + cgst;  // Total amount

    return (
        <form className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <p>Only deliverable in Thane, Maharashtra </p>
                <div className="multi-fields">
                    <input type='text' placeholder='First name' />
                    <input type='text' placeholder='Last name' />
                </div>
                <input type='email' placeholder='Email address'/>
                <input type='number' placeholder='Phone number'/>
                <div className="multi-fields">
                    <input type='text' placeholder='Address' />
                    <input type='text' placeholder='City' />
                </div>
                <div className="multi-fields">
                    <input type='number' placeholder='Pincode' />
                    <input type='text' placeholder='State' />
                </div>
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2> <br/> 
                    <div>
                        <div className="cart-total-details">
                            <p>Making Charges (10%) :
                            Rs. {cartAmount === 0 ? 0 : makingCharges.toFixed(2)}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>SGST @1.50% :
                             Rs. {cartAmount === 0 ? 0 : sgst.toFixed(2)}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>CGST @1.50% :
                            Rs. {cartAmount === 0 ? 0 : cgst.toFixed(2)}</p>
                        </div>
                        <hr/> <br />
                        <div className="cart-total-details">
                            <b>Total </b>
                            <b>Rs. {cartAmount === 0 ? 0 : finalAmount.toFixed(2)}</b>
                        </div>
                        <button className='payment'>PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Placeorder;
