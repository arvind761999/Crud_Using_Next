// middleware.js

import { NextResponse } from 'next/server';

export function middleware(req) {
    const origin = req.headers.get('origin');
    console.log(origin);
    const response = NextResponse.next();

    if (origin === 'https://crud-using-next.vercel.app') {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    }

    return response;
}


export const config = {
    matcher: ['/api/:path*'],
};
