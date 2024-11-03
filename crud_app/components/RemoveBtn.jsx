"use client";
import { useRouter } from "next/navigation";

export default function RemoveBtn( { id } ) {

    const router = useRouter();

    const removeProduct = async() => {
       const confirmed = confirm("Are you sure ?")

       if(confirmed){
        const res = await fetch(`http://localhost:3000/api/products?id=${id}`,{
            method: "DELETE"
        });

        if(res.ok){
         router.refresh();
        }

       }

    }

  return (
    <button onClick={removeProduct} className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md">
        Delete
    </button>
  )
}

