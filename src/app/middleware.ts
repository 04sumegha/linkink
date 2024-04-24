import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function checkToken(request: NextRequest, next: () => Promise<NextResponse>) {
    try {
        const authHeader = request.headers.get('Authorization');
        
        if (!authHeader) {
            throw new Error('No token provided');
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            throw new Error('No token provided');
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        
        if (!decodedToken || typeof decodedToken !== 'object') {
            throw new Error('Invalid token');
        }
        
        const userId = decodedToken.id;
        console.log(userId)        

        return next();
    } 
    
    catch (error) {
        console.error('Error in checkToken middleware:', error);
        // return NextResponse.json({ error: error }, { status: 401 });
        return NextResponse.redirect(process.env.DOMAIN + "/login");
    }
}
