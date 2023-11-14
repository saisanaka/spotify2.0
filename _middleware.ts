import { NextRequest , NextResponse } from "next/server";
import { useSession } from "next-auth/react";

export default function middleware(req : NextRequest){
    const {data : session} = useSession();
    return NextResponse.redirect(new URL("/"));
}

export const config = {
    matcher: '/Login',
}