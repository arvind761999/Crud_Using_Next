import connectMongoDB from '@/libs/connectDb';
import Product from '@/model/ProductModel';
import { NextResponse } from 'next/server';

export async function PUT(request, {params}) {
    const { id } = params;
    const{newName:name , newImage:image , newPrice:price , newCategory:category } = await request.json();
    await connectMongoDB();
    await Product.findByIdAndUpdate(id, { name, image, price, category});
    return NextResponse.json({ message: "Product Updated"}, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const product = await Product.findOne({ _id: id });
    return  NextResponse.json({ product }, { status: 200 });
}

