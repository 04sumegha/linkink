import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId, size } = body;

        const newOrder = new Order({
            productId,
            size
        });
        
        const savedOrder = await newOrder.save();
        
        const orderQRCode = await QRCode.toDataURL(process.env.DOMAIN + "/link?orderid=" + savedOrder._id.toString());

        savedOrder.qrLink = orderQRCode;
        await savedOrder.save();

        return NextResponse.json({
            message: "Order created successfully",
            success: true,
            savedOrder
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}