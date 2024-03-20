import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";

/*export const GET = async (req:NextRequest, res:NextResponse) => {
    console.log("GET");
    try {
        const posts = await prisma.post.findMany();
        const q = req.nextUrl.searchParams.get('query');
        return NextResponse.json({message: "Success", posts, q}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:"Error", error},{status: 500});
    } finally {
        await prisma.$disconnect();
    }
}*/

export const POST = async (req:Request, res:NextResponse) => {
    console.log("POST");
    try {
        const {title, location, skills, company, salary, description} = await req.json();
        const post = await prisma.post.create({data: {title, location, skills, company, salary, description}});
        return NextResponse.json({message: "Success", post }, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}