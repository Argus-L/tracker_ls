import prisma from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const tags = await prisma.post.findMany({
            distinct: ['tags'],
            select: {
                tags: {
                    select: {name: true} 
                }
            }
        })
        return (
            NextResponse.json({tags}, {status:200})
        )
    } catch (error) {
        console.log(error)
    }
}