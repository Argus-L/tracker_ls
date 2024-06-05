import { NextResponse } from "next/server";
import prisma from '@/prisma';

export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id = parseInt(req.url.split("/blog/")[1]);
        const post = await prisma?.post.findFirst({
            include: {tags: true},
            where: {id}
        });
        if(!post) 
            return NextResponse.json({message: "Not Found"}, {status: 404});
        return NextResponse.json({message: "Success" , post}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma?.$disconnect();
    }
};

export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id = parseInt(req.url.split("/blog/")[1]);
        const {title, location, skills, company, salary, description, tags} = await req.json();
        const post = await prisma?.post.upsert({
            where: {id},
            update: {
                title, location, skills, company, salary, description, tags: {
                    connectOrCreate: tags.map((tag:any) => {
                        return {
                            where: {name: tag},
                            create: {name: tag},
                        };
                    })
                }, 
            },
            create: 
        });
        return NextResponse.json({message: "Success" , post}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma?.$disconnect();
    }
};

export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id = parseInt(req.url.split("/blog/")[1]);
        const post = await prisma?.post.delete({where: {id}});
        return NextResponse.json({message: "Success" , post}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma?.$disconnect();
    }
};