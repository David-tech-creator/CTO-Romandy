import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    const reference = await (db.clientReference.findUnique as any)({
      where: { id },
      include: {
        processingJobs: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    })

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ reference })

  } catch (error) {
    console.error('Get reference error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reference' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const data = await request.json()

    // Validate required fields
    if (!data.clientName || !data.projectTitle || !data.industry) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, projectTitle, industry' },
        { status: 400 }
      )
    }

    // Check if reference exists
    const existingReference = await (db.clientReference.findUnique as any)({
      where: { id }
    })

    if (!existingReference) {
      return NextResponse.json(
        { error: 'Reference not found' },
        { status: 404 }
      )
    }

    // Convert dates
    const updateData: any = {
      clientName: data.clientName,
      projectTitle: data.projectTitle,
      industry: data.industry,
      location: data.location || '',
      servicesDescription: data.servicesDescription || '',
      technologies: data.technologies || '',
      methodologies: data.methodologies || '',
      valueDelivered: data.valueDelivered || '',
      impact: data.impact || '',
      teamSize: data.teamSize ? parseInt(data.teamSize.toString()) : null,
      teamRoles: data.teamRoles || '',
      isAnonymized: Boolean(data.isAnonymized),
      contactName: data.contactName || '',
      contactEmail: data.contactEmail || '',
      contactPhone: data.contactPhone || '',
      referenceLetter: data.referenceLetter || '',
      updatedAt: new Date()
    }

    // Handle dates
    if (data.startDate) {
      updateData.startDate = new Date(data.startDate)
    }
    if (data.endDate) {
      updateData.endDate = new Date(data.endDate)
    }

    const updatedReference = await (db.clientReference.update as any)({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ 
      reference: updatedReference,
      message: 'Reference updated successfully'
    })

  } catch (error) {
    console.error('Update reference error:', error)
    return NextResponse.json(
      { error: 'Failed to update reference' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    // Check if reference exists
    const existingReference = await (db.clientReference.findUnique as any)({
      where: { id }
    })

    if (!existingReference) {
      return NextResponse.json(
        { error: 'Reference not found' },
        { status: 404 }
      )
    }

    // Delete related processing jobs first
    await (db.processingJob.deleteMany as any)({
      where: { referenceId: id }
    })

    // Delete the reference
    await (db.clientReference.delete as any)({
      where: { id }
    })

    return NextResponse.json({ 
      message: 'Reference deleted successfully' 
    })

  } catch (error) {
    console.error('Delete reference error:', error)
    return NextResponse.json(
      { error: 'Failed to delete reference' },
      { status: 500 }
    )
  }
} 