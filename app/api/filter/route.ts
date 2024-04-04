import prisma from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
    const paramString = req.nextUrl.searchParams
    const filterBy = paramString.get('filterBy') || ''
    if(filterBy == 'location') {
        try {
            const optionsByFilter = await prisma.post.findMany({
                distinct: ['location'],
                select: {
                    location: true,
                }
            })
            return (
                NextResponse.json({optionsByFilter}, {status:200})
            )
        } catch (error) {
            console.log(error)
        }
    } else if(filterBy == 'company') {
        try {
            const optionsByFilter = await prisma.post.findMany({
                distinct: ['company'],
                select: {
                    company: true,
                }
            })
            return (
                NextResponse.json({optionsByFilter}, {status:200})
            )
        } catch (error) {
            console.log(error)
        }
    } else {
        const optionsByFilter = await prisma.post.findUnique({
            where: {
                id: 9999999999999
            },
        })
        return (
            NextResponse.json({optionsByFilter}, {status:200})
        )
    }
}