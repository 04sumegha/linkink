import {connect} from "@/dbConfig/dbConfig";
import Product from "@/models/productsModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const body = await request.json()
        const {image, title} = body

        const newProduct = new Product({
            image,
            title
        })
        
        const savedProduct = await newProduct.save()

        return NextResponse.json({
            message: "Product created successfully",
            success: true,
            savedProduct
        })
    } 
    
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}