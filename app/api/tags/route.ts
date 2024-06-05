import prisma from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const tags = await prisma.languageTag.findMany();
        return (
            NextResponse.json({tags}, {status:200})
        )
    } catch (error) {
        console.log(error)
    }
}

export const POST = async (req:Request, res:NextResponse) => {
    try { //add if statement to check if tag already exists, if it does, do not create it
        const name = await req.json();
        const tag = await prisma.languageTag.create({data: name});
        return NextResponse.json({message: "Success", tag}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}