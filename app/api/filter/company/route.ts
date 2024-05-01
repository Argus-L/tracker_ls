import prisma from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const companies = await prisma.post.findMany({
            distinct: ['company'],
            select: {
                company: true,
            }
        })
        return (
            NextResponse.json({companies}, {status:200})
        )
    } catch (error) {
        console.log(error)
    }
}