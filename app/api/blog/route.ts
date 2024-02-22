import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";


export async function main() {
    try {
        await prisma?.$connect();
    } catch (error) {
        return Error("Database Connection Unsuccessful");
    }
}

export const GET = async (req:NextRequest, res:NextResponse) => {
    console.log("GET");
    try {
        await main();
        const posts = await prisma.post.findMany();
        const q = req.nextUrl.searchParams.get('query');
        return NextResponse.json({message: "Success", posts, q}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:"Error", error},{status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req:Request, res:NextResponse) => {
    console.log("POST");
    try {
        const {title, location, skills, company, salary, description} = await req.json();
        await main();

        const post = await prisma.post.create({data: {title, location, skills, company, salary, description}});
        return NextResponse.json({message: "Success", post }, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

/*export const GET = async (req:Request, res:NextResponse) => {
    const q = req.url;
    console.log("AT THE API",);
    return (
                NextResponse.json({q}, {status: 200})
           );
}*/