import prisma from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
    const paramString = req.nextUrl.searchParams
    const query = paramString.get('query') || ""
    const sortBy = paramString.get('sortBy') || "id"
    const locationFilter = paramString.get('locationFilter') || ""
    const companyFilter = paramString.get('companyFilter') || ""
    const minSalary = paramString.get('minSalary') || ""
    const maxSalary = paramString.get('maxSalary') || ""
    const selectedTags = paramString.get('tags') || ""
    const selectedTagsFinal = selectedTags.split(" ");

    if((isNaN(Number(query)) || query == null || query == "") && (locationFilter == "" && companyFilter == "" && minSalary == "" && maxSalary == "" && selectedTags.length == 0)) {
        try {
            const jobs = await prisma.post.findMany({
                include: {
                    tags: true
                },
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
                },
            })
            return (
                    NextResponse.json({message: "1", jobs}, {status: 200})
                )
        } catch (error) {
            console.log(error);
        }
    } else if((isNaN(Number(query)) || query == null || query == "") && (locationFilter !== "" || companyFilter !== "" || minSalary !== "" || maxSalary!== "" || selectedTagsFinal.length > 0)) {
        const jobs = await prisma.post.findMany({
            include: {
                tags: true
            },
            where: {
                // OR: [
                //     {
                //         location: {
                //             contains: locationFilter || undefined,
                //         }
                //     },
                //     {
                //         company: {
                //             contains: companyFilter || undefined,
                //         }
                //     }
                // ],
                AND: [
                    {
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
                        ]
                    },
                    {
                        location: {
                            contains: locationFilter || undefined,
                        },
                        company: {
                            contains: companyFilter || undefined,
                        }
                    },
                    {
                        salary: {
                            lte: Number(maxSalary) || undefined,
                            gte: Number(minSalary) || undefined,
                        }
                    },
                    {
                        tags: {
                            some: {
                                OR: selectedTagsFinal.map((str) => ({
                                    name: {contains: str}
                                }))
                            }
                        }
                    }
                ]
            },
            orderBy: {
                [sortBy]: 'asc'
            }
        })
        return (
            NextResponse.json({message: "2", jobs}, {status: 200})
        )
    } else if ((isNaN(Number(query))) == false) {
        try {
            const jobs = await prisma.post.findMany({
                include: {
                    tags: true
                },
                where: {
                    // OR: [
                    //     {
                    //         location: {
                    //             contains: locationFilter,
                    //         }
                    //     },
                    //     {
                    //         company: {
                    //             contains: companyFilter,
                    //         }
                    //     }
                    // ],
                    AND: [
                        {
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
                        {
                            location: {
                                contains: locationFilter || undefined,
                            },
                            company: {
                                contains: companyFilter || undefined,
                            }
                        },
                        {
                            salary: {
                                lte: Number(maxSalary) || undefined,
                                gte: Number(minSalary) || undefined,
                            }
                        }
                    ]
                },
                orderBy: {
                    [sortBy]: 'asc'
                }
            })
            return NextResponse.json({message:"3",jobs}, {status: 200})
        } catch (error) {
            console.log(error);
        }
    }
}