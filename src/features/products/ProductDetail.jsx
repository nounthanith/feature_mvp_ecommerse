import React, { useEffect } from 'react'
import useProduct from './useProduct';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { product, getProductById } = useProduct();
    const { id } = useParams();
    useEffect(() => {
        getProductById(id);
    }, [id]);
    console.log(product);
  return (
    <div>
        <img className='w-sm' src={import.meta.env.VITE_BASE_URL + product?.images[0]} alt="" />
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <p>{product?.price} $</p>
    </div>
  )
}

export default ProductDetail