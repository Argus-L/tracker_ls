import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req:Request, res:NextResponse) => {
    try {
        const {title, location, skills, company, salary, description, tagArray} = await req.json();
        //const finalTags = tagArray.map((str:any) => ({name: str}))
        const post = await prisma.post.create({data: {
            title, location, skills, company, salary, description, tags: {
                connectOrCreate: tagArray.map((tag:any) => {
                    return {
                        where: {name: tag},
                        create: {name: tag},
                    };
                }),
            },
        }});
        return NextResponse.json({message: "Success", post, tagArray }, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}