"use client";
import { useState } from "react";
import { useRouter  } from "next/navigation";

export default function AddProduct() {

    const [name, setName] = useState('');
    const [image, setImages] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!name || !image) {
            setShowPopup(true);
            return;
        }

        try {
           const res = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({name, image, price, category})
           });
           if(res.ok){
            router.push("/products");
           }


        } catch (error) {
            console("Failed to create Products: ", error);
        }
    }

    const closePopup = () => {
        setShowPopup(false);
    }

    return (
        <div className="flex justify-between items-center text-center m-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <h1 className="font-bold py-10 text-2xl">Add new Product</h1>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered input-info w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="/Images/1.jpg"
                    // defaultValue="/Images/1.jpg"
                    value={image}
                    onChange={(e) => setImages(e.target.value)}
                    className="input input-bordered input-info w-full max-w-xs"
                />
                <input
                    type="number"
                    placeholder="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input input-bordered input-info w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="Product Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input input-bordered input-info w-full max-w-xs"
                />

                <button
                    type="submit"
                    className="btn btn-primary w-full max-wxs"
                    onClick={() => closePopup()}
                >
                    Add Product
                </button>

                {showPopup &&
                    (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Please fill all Fied</h2>
                            <p className="text-gray-600 mb-4">This is a sample popup content.</p>
                            <button
                                onClick={() => closePopup()}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>)
                }
            </form>
        </div>
    )
}