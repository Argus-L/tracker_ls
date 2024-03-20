"use server";

import prisma from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function getFilter (filterBy: string) {
    if(filterBy == 'location') {
        try {
            const optionsByFilter = await prisma.post.findMany({
                select: {
                    location: true,
                }
            })
            return (
                {optionsByFilter}
            )
        } catch (error) {
            console.log(error)
        }
    } else if(filterBy == 'company') {
        try {
            const optionsByFilter = await prisma.post.findMany({
                select: {
                    company: true,
                }
            })
            return (
                {optionsByFilter}
            )
        } catch (error) {
            console.log(error)
        }
    } else {
        const optionsByFilter = ["yo"];
        return (
            {optionsByFilter}
        )
    }
}