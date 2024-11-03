"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductForm ({ id, name, image, price, category }){

    const [newName, setNewName] = useState(name || "");
    const [newImage, setNewImage] = useState(image || "");
    const [newPrice, setNewPrice] = useState(price || 0);
    const [newCategory, setNewCategory] = useState(category || "");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await fetch(`http://localhost:3000/api/products/${id}`,{
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },

                body: JSON.stringify({ newName, newImage, newPrice, newCategory}),
            });

            if (!res.ok) {
                throw new Error("Failed to update product");
                     }
                    router.refresh();
                    router.push("/products");
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <div>
        <h1>Update Product {id}</h1>
        <form onSubmit={handleSubmit}  className="flex flex-col gap-3">
               <input
                    onChange={(e) => setNewName(e.target.value)}
                    type="text"
                    value={newName}
                    className="input input-bordered input-primary w-full max-w-xs text-white" />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="input input-bordered input-primary w-full max-w-xs text-white" />
                <input
                    type="number"
                    placeholder="Price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="input input-bordered input-primary w-full max-w-xs text-white" />
                <input
                    type="text"
                    placeholder="Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="input input-bordered input-primary w-full max-w-xs text-white" />

                <button type="submit" className="btn btn-primary w-1/4 max-w-xs">
                    Update
                </button>
            </form>
        </div>
        </>
    );
} 

// export default function EditProductForm({ productId, name, image, price, category }) {
//     const [newName, setNewName] = useState(name || "");
//     const [newImage, setNewImage] = useState(image || "");
//     const [newPrice, setNewPrice] = useState(price || 0);
//     const [newCategory, setNewCategory] = useState(category || "");
//     const router = useRouter();

//     const handleSubmit = async(e) => {
//         e.preventDefault(); // Prevent default form submission

//        console.log(productId, name, image, price, category);
//             try {
//                 const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({newName, newImage, newPrice, newCategory}),
//                 });

//                 console.log({res});
        
//                 if (!res.ok) {
//                     throw new Error("Failed to update product");
//                 }
//                 router.refresh();
//                 router.push("/products");
//                 // const data = await res.json();
//                 console.log("Product update Succefully!");
//                 // return data.product; // Return updated product data
//             } catch (error) {
//                 console.log("Product update failed!", error);
//             }
        
//     };

//     return (
//         <>
//             <div>
//                 <h1 className="text-white">Update Product: {productId}</h1>
//             </div>
//             <form onSubmit={handleSubmit}  className="flex flex-col gap-3">
//                 <input
//                     onChange={(e) => setNewName(e.target.value)}
//                     type="text"
//                     value={newName}
//                     className="input input-bordered input-primary w-full max-w-xs text-white" />
//                 <input
//                     type="text"
//                     placeholder="Image URL"
//                     value={newImage}
//                     onChange={(e) => setNewImage(e.target.value)}
//                     className="input input-bordered input-primary w-full max-w-xs text-white" />
//                 <input
//                     type="number"
//                     placeholder="Price"
//                     value={newPrice}
//                     onChange={(e) => setNewPrice(e.target.value)}
//                     className="input input-bordered input-primary w-full max-w-xs text-white" />
//                 <input
//                     type="text"
//                     placeholder="Category"
//                     value={newCategory}
//                     onChange={(e) => setNewCategory(e.target.value)}
//                     className="input input-bordered input-primary w-full max-w-xs text-white" />

//                 <button type="submit" className="btn btn-primary w-1/4 max-w-xs">
//                     Update
//                 </button>
//             </form>
//         </>
//     );
// }
