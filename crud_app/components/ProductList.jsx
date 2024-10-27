import Link from 'next/link';

export default function ProductList() {

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-center items-center">
                <h1 className="text-white font-bold py-10 text-2xl"> Crup App usig the Next js Crud : Create, read, update, delete,</h1>
            </div>
            
            <div className='text-right'>
              <Link className='btn btn-primary text-white' href="/addProducts">
               Add Products
              </Link>  
            </div>

        </div>
    )

}