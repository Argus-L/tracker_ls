import prisma from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
    const paramString = req.nextUrl.searchParams
    const query = paramString.get('query') || ""
    const sortBy = paramString.get('sortBy') || "id"
    const filterBy = paramString.get('filterBy') || ""
    const filterOption = paramString.get('filterOptions') || ""

    if((isNaN(Number(query)) || query == null || query == "") && filterBy == "") {
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
                orderBy: {
                    [sortBy]: 'asc'
                }
            })
            return (
                    NextResponse.json({message:"testing123", jobs}, {status: 200})
                )
        } catch (error) {
            console.log(error);
        }
    } else if(filterBy !== "") {
        const jobs = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        location: {
                            contains: filterOption,
                        }
                    },
                    {
                        company: {
                            contains: filterOption,
                        }
                    }
                ]
            },
            orderBy: {
                [sortBy]: 'asc'
            }
        })
        return (
            NextResponse.json({message:"HELLO", jobs}, {status: 200})
        )
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
                },
            })
            return NextResponse.json({jobs}, {status: 200})
        } catch (error) {
            console.log(error);
        }
    }
}