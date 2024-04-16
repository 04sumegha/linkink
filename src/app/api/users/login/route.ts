import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try {

        const body = await request.json()
        const {email, password} = body;

        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json({error: "User doesn't exist"}, {status: 400})
        }
        
        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        
        const data = {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        }

        const token = jwt.sign(data, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;

    } 
    
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}