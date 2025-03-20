import React, { useContext, useState } from 'react';
import './placeorder.css';
import { StoreContext } from '../../Context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
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
        pincode: '',
        address: '',
        city: '',
        state: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // ✅ Handle Input Changes
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

    // ✅ Validate Form Fields
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
        if (!form.address.trim()) {
            newErrors.address = "Address is required";
        }
        if (!form.city.trim()) {
            newErrors.city = "City is required";
        }
        if (!form.state.trim()) {
            newErrors.state = "State is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Handle Form Submission & Navigation
    const handleSubmit = (e, paymentType) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("Form Data:", form); // ✅ Debugging to check form values

        // ✅ Store the full address correctly
        localStorage.setItem('customer', JSON.stringify(form));

        // ✅ Navigate based on button type
        if (paymentType === "fullPayment") {
            navigate('/full-payment');
        } else if (paymentType === "clickCollect") {
            navigate('/click-and-collect-payment');
        }
    };

    return (
        <form className='place-order' onSubmit={(e) => handleSubmit(e, 'fullPayment')}>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <p>Only deliverable in Thane, Maharashtra</p>
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
                    <input type='text' name='address' placeholder='Address' value={form.address} onChange={handleChange} />
                    {errors.address && <span className='error' style={{ color: 'darkred' }}>{errors.address}</span>}
                    <input type='text' name='city' placeholder='City' value={form.city} onChange={handleChange} />
                    {errors.city && <span className='error' style={{ color: 'darkred' }}>{errors.city}</span>}
                </div>
                <div className="multi-fields">
                    <input type='text' name='pincode' placeholder='Pincode' value={form.pincode} onChange={handleChange} maxLength={6} />
                    {errors.pincode && <span className='error' style={{ color: 'darkred' }}>{errors.pincode}</span>}
                    <input type='text' name='state' placeholder='State' value={form.state} onChange={handleChange} />
                    {errors.state && <span className='error' style={{ color: 'darkred' }}>{errors.state}</span>}
                </div>
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2> <br />
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
                        <hr /> <br />
                        <div className="cart-total-details">
                            <b>Total </b>
                            <b>Rs. {cartAmount === 0 ? 0 : finalAmount.toFixed(2)}</b>
                        </div>
                        {/* ✅ Updated Button Handlers */}
                        <button
                            type="submit"
                            className='payment'
                            onClick={(e) => handleSubmit(e, 'fullPayment')}
                        >
                            PROCEED TO PAYMENT
                        </button>
                        <br /><br />
                        <button
                            type="button"
                            className='click-collect'
                            onClick={(e) => handleSubmit(e, 'clickCollect')}
                        >
                            CLICK & COLLECT
                        </button>
                        <br />
                        <Link to="/click-and-collect" className="click-collect-link">What is Click & Collect?</Link>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;
