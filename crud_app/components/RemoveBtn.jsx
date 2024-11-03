"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RemoveBtn({ id }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeProduct = async () => {
        const confirmed = confirm("Are you sure you want to delete this item?");

        if (confirmed) {
            setLoading(true); // Indicate loading state
            setError(null); // Reset error state

            try {
                const res = await fetch(`http://localhost:3000/api/products?id=${id}`, {
                    method: "DELETE",
                });

                if (!res.ok) {
                    throw new Error("Failed to delete the product.");
                }

                // Automatically refresh the page to reflect changes
                router.refresh(); // Refresh the page after deletion
            } catch (err) {
                setError(err.message); // Capture any errors
                console.error("Error deleting product:", err);
            } finally {
                setLoading(false); // Reset loading state
            }
        }
    };

    return (
        <div>
            <button
                onClick={removeProduct}
                className={`bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable button during loading
            >
                {loading ? 'Deleting...' : 'Delete'}
            </button>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        </div>
    );
}
