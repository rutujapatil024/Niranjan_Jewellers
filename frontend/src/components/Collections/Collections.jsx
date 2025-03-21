import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Collections.css';
import Jewelitem from '../../components/Jewelitem/Jewelitem';
import { toast } from 'react-toastify';

const Collections = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        gender: [],
        metal: []
    });

    const filters = {
        category: ['Rings', 'Bangles', 'Earrings', 'Mangalsutra', 'Gold Chain', 'Anklet', 'Gold Coin & Bars', 'Silver Coin & Bars'],
        gender: ['Women', 'Men', 'Kids'],
        metal: ['Gold', 'Silver', 'Platinum', 'Diamond']
    };

    // Fetch products from backend
    const fetchList = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/auth/jewellery");
            if (response.status === 200) {
                console.log("Fetched List:", response.data); // Debugging API response
                setList(response.data);
            } else {
                toast.error("Failed to fetch products");
            }
        } catch (error) {
            toast.error("Error fetching product list");
            console.error("Error:", error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchList();
    }, []);

    // Handle filter change
    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prevFilters => {
            const isSelected = prevFilters[filterType].includes(value);
            return {
                ...prevFilters,
                [filterType]: isSelected
                    ? prevFilters[filterType].filter(item => item !== value)
                    : [...prevFilters[filterType], value]
            };
        });
    };

    // Apply filters to product list
    const filteredProducts = list.filter((item) => {
        return (
            (selectedFilters.category.length === 0 || selectedFilters.category.map(c => c.toLowerCase()).includes(item.category.toLowerCase())) &&
            (selectedFilters.gender.length === 0 || selectedFilters.gender.map(g => g.toLowerCase()).includes(item.gender.toLowerCase())) &&
            (selectedFilters.metal.length === 0 || selectedFilters.metal.map(m => m.toLowerCase()).includes(item.subcategory.toLowerCase()))
        );
    });

    // Navigate to product details page
    const handleProductClick = (id) => {
        navigate(`/item-details/${id}`);
    };

    return (
        <div className="collections-container">
            <div className="filter-sidebar">
                <h2>Filters</h2>
                {Object.keys(filters).map(filterType => (
                    <div key={filterType} className="filter-group">
                        <h3>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
                        {filters[filterType].map(item => (
                            <label key={item} className="filter-item">
                                <input
                                    type="checkbox"
                                    value={item}
                                    checked={selectedFilters[filterType].includes(item)}
                                    onChange={() => handleFilterChange(filterType, item)}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                ))}
            </div>

            <div className="product-display">
                <h2>Products</h2>
                <div className="jewel-items-list">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item, index) => (
                            <div key={index} onClick={() => handleProductClick(item._id)} style={{ cursor: 'pointer' }}>
                                <Jewelitem 
                                    id={item._id} 
                                    name={item.name} 
                                    description={item.description} 
                                    price={item.price} 
                                    image={item.image} 
                                />
                            </div>
                        ))
                    ) : (
                        <p>No products match the selected filters.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collections;
