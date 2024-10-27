import connectMongoDB from '@/libs/connectDb';
import Product from '@/model/ProductModel';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { name, image, price, category } = await request.json();
    await connectMongoDB();
    console.log(name);
    await Product.create({name, image, price, category});
    return new NextResponse({mesage : "Product created Succesfully"}, {status : 201});  
}