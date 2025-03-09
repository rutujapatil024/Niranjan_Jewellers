import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const navigate = useNavigate();

  const updateJewel = (jewel) => {
    navigate("/add", { state: { jewel } });
  };

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get("http://localhost:3001/api/auth/jewellery");
    console.log(response.status)
    if (response.status === 200) {
      console.log(response.data)
      setList(response.data);
    }
    else {
      toast.error("Error")
    }
  }

  const removeJewellery = async (jewelId) => {

    try {
      console.log("Removing jewellery with ID:", jewelId); // Debugging line
      const response = await axios.post("http://localhost:3001/api/auth/jewellery/remove", { id: jewelId }, // Send as JSON
        { headers: { "Content-Type": "application/json" } } )// Ensure correct headers

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error in removejewel function:", error); // Debugging line
      toast.error(error.response?.data?.message || "Error removing jewellery item");
    }
  };

  useEffect(() => {
    fetchList();
  }, [])


  return (
    <div className='list add flex-col'>
      <p>Jewellery List</p>
      <div className='list-table'>
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
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '65px', height: '65px', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                  alt={item.name}
                  style={{ width: '65px', height: '65px', objectFit: 'cover' }}
                />
              )}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.subcategory}</p>
              <p>{item.gender}</p>
              <p>{item.size}</p>
              <p>Rs.{item.price}</p>
              <div className="action-buttons">
                <p onClick={() => {
                  console.log("Clicked Remove for ID:", item._id); // Debugging line
                  removeJewellery(item._id);
                }} className="cursor delete-btn">X</p>
                <button onClick={() => updateJewel(item)} className="update-btn">Update</button>
              </div> </div>
          )

        })}
      </div>

    </div>
  )
}

export default List
