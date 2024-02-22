import prisma from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function basicSearch(
    query: string,
    currentPage: number,
) {
    if(isNaN(Number(query)) || query == null || query == "") {
        try {
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
                            company: {
                                contains: query,
                            },
                        },
                        {
                            description: {
                                contains: query,
                            },
                        },
                    ],
                }, 
            })
            return NextResponse.json({jobs}, {status: 200})
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const jobs = await prisma.post.findMany({
                where:{
                    OR: [
                        {
                            salary: {
                                equals: Number(query)
                            }
                        },
                        {
                            salary: {
                                lte: Number(query)
                            }
                        }
                    ]
                }
            })
            return NextResponse.json({jobs}, {status: 200})
        } catch (error) {
            console.log(error);
        }
    }
    
}