import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const industry = searchParams.get('industry') || ''
    const location = searchParams.get('location') || ''
    const technologies = searchParams.get('technologies') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { clientName: { contains: search, mode: 'insensitive' } },
        { projectTitle: { contains: search, mode: 'insensitive' } },
        { servicesDescription: { contains: search, mode: 'insensitive' } },
        { valueDelivered: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (industry) {
      where.industry = { contains: industry, mode: 'insensitive' }
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' }
    }

    if (technologies) {
      where.technologies = { contains: technologies, mode: 'insensitive' }
    }

    // Get references with pagination
    const references = await (db.clientReference.findMany as any)({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        clientName: true,
        isAnonymized: true,
        industry: true,
        projectTitle: true,
        startDate: true,
        endDate: true,
        location: true,
        technologies: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    const total = await (db.clientReference.count as any)({ where })

    return NextResponse.json({
      references,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.clientName || !data.industry || !data.projectTitle) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, industry, projectTitle' },
        { status: 400 }
      )
    }

    // Convert dates
    const startDate = data.startDate ? new Date(data.startDate) : null
    const endDate = data.endDate ? new Date(data.endDate) : null

    const reference = await db.clientReference.create({
      data: {
        ...data,
        startDate,
        endDate,
        teamSize: data.teamSize ? parseInt(data.teamSize) : null,
        isAnonymized: Boolean(data.isAnonymized)
      }
    })

    return NextResponse.json(reference, { status: 201 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 