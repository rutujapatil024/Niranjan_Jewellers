import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Collections.css';
import { StoreContext } from '../../Context/StoreContext';
import Jewelitem from '../../components/Jewelitem/Jewelitem';

const Collections = () => {
    const { product_list } = useContext(StoreContext);
    const navigate = useNavigate();
    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        gender: [],
        metal: []
    });

    const filters = {
        category: ['Ring', 'Bangle', 'Earrings', 'Mangalsutra', 'Chain', 'Anklet', 'Gold Coin and Bar', 'Silver Coin and Bar'],
        gender: ['Female', 'Male'],
        metal: ['Gold', 'Silver', 'Platinum', 'Diamond']
    };

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

    const filteredProducts = product_list.filter((item) => {
        return (
            (selectedFilters.category.length === 0 || selectedFilters.category.includes(item.category_name)) &&
            (selectedFilters.gender.length === 0 || selectedFilters.gender.includes(item.gender)) &&
            (selectedFilters.metal.length === 0 || selectedFilters.metal.includes(item.metal))
        );
    });

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
