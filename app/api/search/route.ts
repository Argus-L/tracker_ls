import { NextResponse, NextRequest } from "next/server";
import prisma from '@/prisma'

export const GET = async (req:NextRequest, res:NextResponse) => {
    if(req.method === "GET") {
        try {
            const query = req.nextUrl.searchParams.get('query');
            if(typeof query !== 'string') {
                throw new Error('Invalid Request');
            }

            const jobs = await prisma.post.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: query,
                            },
                        },
                        {
                            location: {
                                contains: query,
                            },
                        },
                        {
                            skills: {
                                contains: query,
                            },
                        },
                        {
                            salary: {
                                equals: Number(query),
                            },
                        },
                        {
                            company: {
                                contains: query,
                            },
                        },
                        {
                            description: {
                                contains: query,
                            },
                        },
                    ]
                }
            })
            console.log('AT THE API')
            return NextResponse.json({jobs}, {status: 200})
        } catch (error) {
            console.log(error);
        }
    }
}