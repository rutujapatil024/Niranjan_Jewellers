import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import {assets} from '../../assets/assets';

const List = ({ url }) => {
  const navigate = useNavigate();

  const updateJewel = (jewel) => {
    navigate("/add", { state: { jewel } });
  };

  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchList = async () => {
    const response = await axios.get("http://localhost:3001/api/auth/jewellery");
    if (response.status === 200) {
      setList(response.data);
    } else {
      toast.error("Error");
    }
  };

  const removeJewellery = async (jewelId) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/jewellery/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: jewelId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message);
        await fetchList();
      } else {
        toast.error(data.message || "Failed to remove item");
      }
    } catch (error) {
      toast.error("Error removing jewellery item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sizes.some(size => size.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.price.toString().includes(searchTerm)
  );

  return (
    <div className='list add flex-col'>
      <div className='list-table'>
     <div className='search-container'> <p>Jewellery List</p>
        <input 
          type='text' 
          placeholder='Search Jewellery...' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />
        <img src={assets.search_icon} alt="" className="search_icon" />
      </div>
     
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Sub-category</b>
          <b>Gender</b>
          <b>Size</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {filteredList.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img
              src={item.image || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}
              alt={item.name}
              style={{ width: '65px', height: '65px', objectFit: 'cover' }}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.subcategory}</p>
            <p>{item.gender}</p>
            <p>{item.sizes[0]}</p>
            <p>Rs.{item.price}</p>
            <div className="action-buttons">
              <p onClick={() => removeJewellery(item._id)} className="cursor delete-btn">X</p>
              <button onClick={() => updateJewel(item)} className="update-btn">Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
