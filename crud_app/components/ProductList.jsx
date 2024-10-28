"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const getProducts = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/products', {
            cache: "no-store",
        }
        );
        console.log({ res });
        if (!res.ok) {
            console.log("Failed to fetch products!");
            return [];
        }
        return await res.json();
    } catch (error) {
        console.log("Error in Loading:", error);
        return [];
    }
};

export default function ProductList() {
    const [products, setProducts] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            console.log("Fetched Data:", data);
            if (data) setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-center items-center">
                <h1 className="text-white font-bold py-10 text-2xl">
                    CRUD App using Next.js: Create, Read, Update, Delete
                </h1>
            </div>

            <div className="text-right mb-4">
                <Link className="btn btn-primary text-white" href="/addProducts">
                    Add Product
                </Link>
            </div>
            <div className='flex m-8'>
                <table className="relative table-auto w-full">
                    <thead className='border border-red-400'>
                        <tr className="text-white border-b border-blue-500">
                            <th><input type="checkbox" className="checkbox" /></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody className='ml-4 border border-blue-400'>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className="border-b border-blue-500 ml-4">
                                    <td><input type="checkbox" className="checkbox" /></td>
                                    <td>{product.name}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
