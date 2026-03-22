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
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    const skip = (page - 1) * limit

    // Build comprehensive where clause
    const where: any = {}
    const searchConditions: any[] = []

    // Full-text search across multiple fields
    if (search) {
      const searchTerms = search.split(' ').filter(term => term.length > 0)
      
      searchTerms.forEach(term => {
        searchConditions.push({
          OR: [
            { clientName: { contains: term, mode: 'insensitive' } },
            { projectTitle: { contains: term, mode: 'insensitive' } },
            { industry: { contains: term, mode: 'insensitive' } },
            { location: { contains: term, mode: 'insensitive' } },
            { servicesDescription: { contains: term, mode: 'insensitive' } },
            { technologies: { contains: term, mode: 'insensitive' } },
            { methodologies: { contains: term, mode: 'insensitive' } },
            { valueDelivered: { contains: term, mode: 'insensitive' } },
            { impact: { contains: term, mode: 'insensitive' } },
            { teamRoles: { contains: term, mode: 'insensitive' } }
          ]
        })
      })

      if (searchConditions.length > 0) {
        where.AND = searchConditions
      }
    }

    // Specific field filters
    if (industry) {
      where.industry = { contains: industry, mode: 'insensitive' }
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' }
    }

    if (technologies) {
      where.technologies = { contains: technologies, mode: 'insensitive' }
    }

    // Date range filtering
    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom)
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo)
      }
    }

    // Build order by clause
    const orderBy: any = {}
    const validSortFields = ['createdAt', 'updatedAt', 'clientName', 'projectTitle', 'industry', 'location']
    
    if (validSortFields.includes(sortBy)) {
      orderBy[sortBy] = sortOrder === 'asc' ? 'asc' : 'desc'
    } else {
      orderBy.createdAt = 'desc'
    }

    // Execute search with pagination
    const references = await (db.clientReference.findMany as any)({
      where,
      skip,
      take: limit,
      orderBy,
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
        methodologies: true,
        valueDelivered: true,
        impact: true,
        teamSize: true,
        teamRoles: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    const total = await (db.clientReference.count as any)({ where })

    // Calculate search relevance scores (simple implementation)
    const referencesWithScore = references.map((ref: any) => {
      let relevanceScore = 0
      
      if (search) {
        const searchTerms = search.toLowerCase().split(' ')
        const searchableText = [
          ref.clientName,
          ref.projectTitle,
          ref.industry,
          ref.location,
          ref.servicesDescription,
          ref.technologies,
          ref.valueDelivered
        ].join(' ').toLowerCase()

        searchTerms.forEach(term => {
          const termCount = (searchableText.match(new RegExp(term, 'g')) || []).length
          relevanceScore += termCount
        })
      }

      return {
        ...ref,
        relevanceScore
      }
    })

    // Sort by relevance if search query exists
    if (search && sortBy === 'relevance') {
      referencesWithScore.sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
    }

    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }

    // Get aggregated data for faceted search
    const aggregations = await Promise.all([
      // Top industries
      (db.clientReference.groupBy as any)({
        by: ['industry'],
        where: { ...where, industry: { not: null } },
        _count: true,
        orderBy: { _count: { _all: 'desc' } },
        take: 10
      }),
      // Top locations
      (db.clientReference.groupBy as any)({
        by: ['location'],
        where: { ...where, location: { not: null } },
        _count: true,
        orderBy: { _count: { _all: 'desc' } },
        take: 10
      })
    ])

    const facets = {
      industries: aggregations[0] || [],
      locations: aggregations[1] || []
    }

    return NextResponse.json({
      references: referencesWithScore,
      pagination,
      facets,
      query: {
        search,
        industry,
        location,
        technologies,
        sortBy,
        sortOrder,
        dateFrom,
        dateTo
      }
    })

  } catch (error) {
    console.error('Search Error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
} 