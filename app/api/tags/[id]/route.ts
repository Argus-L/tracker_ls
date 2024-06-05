import { NextResponse } from "next/server";
import prisma from '@/prisma';

export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id = parseInt(req.url.split("/tags/")[1]);
        const tag = await prisma?.languageTag.findFirst({where: {id}});
        if(!tag) 
            return NextResponse.json({message: "Not Found"}, {status: 404});
        return NextResponse.json({message: "Success" , tag}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma?.$disconnect();
    }
};

export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id = parseInt(req.url.split("/tags/")[1]);
        const name = await req.json();
        const tag = await prisma?.languageTag.update({
            data: name, 
            where: {id},
        });
        return NextResponse.json({message: "Success" , tag}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma?.$disconnect();
    }
};

export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id = parseInt(req.url.split("/tags/")[1]);
        const tag = await prisma?.languageTag.delete({where: {id}});
        return NextResponse.json({message: "Success" , tag}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma?.$disconnect();
    }
};