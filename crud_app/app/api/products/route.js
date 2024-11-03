import connectMongoDB from '@/libs/connectDb';
import Product from '@/model/ProductModel';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectMongoDB();
    const products = await Product.find({});
    const productsWithStringIds = products.map(product => ({
        ...product._doc,
        _id: product._id.toString(),
    }));

    return  NextResponse.json(productsWithStringIds);
}

// export async function GET() {
//     await connectMongoDB();
//     const product = await Product.find({});
//     console.log(product);
//     return new NextResponse(product);
// }

// export async function GET(request, { params }) {
//     const { id } = params;
//     await connectMongoDB();
//     const product = await Product.findById(id);
//     console.log(product);
//     return new NextResponse(product);
// }


export async function POST(request) {
   try {
     const { name, image, price, category } = await request.json();
     await connectMongoDB();
     console.log({ name });
     await Product.create({ name, image, price, category });
     return new NextResponse({ mesage: "Product created Succesfully" }, { status: 201 });
   } catch (error) {
      console.log("Product Not Added!", error);
   }
}


export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await  connectMongoDB();
  await Product.findByIdAndDelete(id);
  return new NextResponse({ mesage: "Product Deleted Succesfully" }, { status: 200 });
}

