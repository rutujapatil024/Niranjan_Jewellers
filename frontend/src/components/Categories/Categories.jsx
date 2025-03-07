import React from 'react'
import './Categories.css'
import {category_list} from '../../assets/assets'

const Categories = ({product,setProduct}) => {
  return (
    <div className='categories' id='categories'>
        <h1>Discover Our Collections</h1>
        <p className='categories-text'>Discover stunning pieces in every category, from classic to contemporary.</p>

        <div className='category-list'>
            {category_list.map((item,index)=>{
                console.log(item.category_name)
                return(
                    <div onClick={()=>setProduct(prev=>prev===item.category_name?"All":item.category_name)}key={index} className='category-list-item'>
                        <img className={product===item.category_name?"active":""}src={item.category_img} alt=''/>
                        <p>{item.category_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default Categories
