import {connect} from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "@/app/middleware";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const { orderId } = await request.json()

        const order = await Order.findById(orderId)

        if(!order){
            return NextResponse.json({error: "Order doesn't exist"}, {status: 400})
        }

        
        if (!order.ownedBy) {
            return checkToken(request, async () => {
                const authHeader = request.headers.get('Authorization');
                const token = authHeader!.split(' ')[1];

                console.log(token)

                const decoded : any = jwt.verify(token, process.env.TOKEN_SECRET!);

                console.log(decoded)

                const userId = decoded.id

                console.log(userId)

                order.ownedBy = userId
                order.status = 'Delivered'
                order.isSet = true //CHECK THIS
                await order.save()

                const user = await User.findById(userId);
                user.products.push(order._id);
                await user.save();
                return NextResponse.json({
                    message: "Owned By updated",
                    success: true
                })
                // return NextResponse.redirect(process.env.DOMAIN + "/login");
            });
        } 
        
        else {
            return NextResponse.redirect(order.linkedTo);
        }

    } 
    
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}