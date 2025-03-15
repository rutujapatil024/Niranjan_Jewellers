import React, { useContext, useState } from 'react';
import './placeorder.css';
import { StoreContext } from '../../Context/StoreContext';

const Placeorder = () => {
    const { getTotalAmount } = useContext(StoreContext);
    const cartAmount = getTotalAmount();  
    const makingCharges = cartAmount * 0.10;
    const sgst = cartAmount * 0.015;
    const cgst = cartAmount * 0.015;
    const finalAmount = cartAmount + makingCharges + sgst + cgst;

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pincode: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === "firstName" || name === "lastName") && /\d/.test(value)) {
            return; // Prevent numbers in first and last name
        }

        if (name === "phone" || name === "pincode") {
            if (!/^[0-9]*$/.test(value)) return; // Allow only numeric input
        }

        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        let newErrors = {};
        if (!/^[A-Za-z]+$/.test(form.firstName.trim())) {
            newErrors.firstName = "Enter a valid first name";
        }
        if (!/^[A-Za-z]+$/.test(form.lastName.trim())) {
            newErrors.lastName = "Enter a valid last name";
        }
        if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        }
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!/^\d{6}$/.test(form.pincode)) {
            newErrors.pincode = "Pincode must be exactly 6 digits";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        alert("Form submitted successfully");
    };

    return (
        <form className='place-order' onSubmit={handleSubmit}>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <p>Only deliverable in Thane, Maharashtra </p>
                <div className="multi-fields">
                    <input type='text' name='firstName' placeholder='First name' value={form.firstName} onChange={handleChange} />
                    {errors.firstName && <span className='error' style={{ color: 'darkred' }}>{errors.firstName}</span>}
                    <input type='text' name='lastName' placeholder='Last name' value={form.lastName} onChange={handleChange} />
                    {errors.lastName && <span className='error' style={{ color: 'darkred' }}>{errors.lastName}</span>}
                </div>
                <input type='email' name='email' placeholder='Email address' value={form.email} onChange={handleChange} />
                {errors.email && <span className='error' style={{ color: 'darkred' }}>{errors.email}</span>}
                <input type='text' name='phone' placeholder='Phone number' value={form.phone} onChange={handleChange} maxLength={10} />
                {errors.phone && <span className='error' style={{ color: 'darkred' }}>{errors.phone}</span>}
                <div className="multi-fields">
                    <input type='text' placeholder='Address' />
                    <input type='text' placeholder='City' />
                </div>
                <div className="multi-fields">
                    <input type='text' name='pincode' placeholder='Pincode' value={form.pincode} onChange={handleChange} maxLength={6} />
                    {errors.pincode && <span className='error' style={{ color: 'darkred' }}>{errors.pincode}</span>}
                    <input type='text' placeholder='State' />
                </div>
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2> <br/> 
                    <div>
                        <div className="cart-total-details">
                            <p>Making Charges (10%) : Rs. {cartAmount === 0 ? 0 : makingCharges.toFixed(2)}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>SGST @1.50% : Rs. {cartAmount === 0 ? 0 : sgst.toFixed(2)}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>CGST @1.50% : Rs. {cartAmount === 0 ? 0 : cgst.toFixed(2)}</p>
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
