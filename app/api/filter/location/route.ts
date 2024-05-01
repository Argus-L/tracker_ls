import prisma from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const locations = await prisma.post.findMany({
            distinct: ['location'],
            select: {
                location: true,
            }
        })
        return (
            NextResponse.json({locations}, {status:200})
        )
    } catch (error) {
        console.log(error)
    }
}