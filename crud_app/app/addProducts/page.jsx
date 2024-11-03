"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState(""); // "success" or "error"
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if required fields are filled
        if (!name || !image) {
            setPopupType("error");
            setShowPopup(true);
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ name, image, price, category }),
            });

            if (res.ok) {
                setPopupType("success");
                setShowPopup(true);
                // Redirect after a brief delay to allow the user to see the success message
                setTimeout(() => {
                    router.push("/products");
                }, 1500);
            }
        } catch (error) {
            console.log("Failed to create product: ", error);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setPopupType("");
    };

    return (
        <div className="flex justify-between items-center text-center m-16">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <h1 className="font-bold py-10 text-2xl">Add New Product</h1>
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
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="input input-bordered input-info w-full max-w-xs"
                />
                <input
                    type="number"
                    placeholder="Price"
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
                    className="btn btn-primary w-full max-w-xs"
                >
                    Add Product
                </button>
            </form>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
                        {popupType === "success" ? (
                            <>
                                <h2 className="text-xl font-semibold text-green-500 mb-4">
                                    Product Added Successfully
                                </h2>
                                <p className="text-gray-600 mb-4">Add More Products or View the Product List</p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold text-red-500 mb-4">
                                    Please fill all fields
                                </h2>
                                <p className="text-gray-600 mb-4">Ensure all required fields are filled.</p>
                            </>
                        )}
                        <button
                            onClick={closePopup}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
