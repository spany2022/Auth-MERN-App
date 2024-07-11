"use client"
import { handleError } from '@/utils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Servicepage = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');
  const router = useRouter();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])
  
  const handleLogout = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() =>{
      router.push("/login");
    }, 1000);
  }

  //fetch products data with giving token authorization
  const fetchProducts = async () => {
    try {
      const url = "http://localhost:3001/products";
      const token = localStorage.getItem('token');
      const headers = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [])
  
  

  return (
    <>
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div className="">
        {
          products && products?.map((item, index) => (
            <ul key={index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default Servicepage
