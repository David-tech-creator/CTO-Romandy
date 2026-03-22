import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { parseReferenceText } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    // Create processing job
    const job = await db.processingJob.create({
      data: {
        status: 'processing',
        rawText: text
      }
    })

    try {
      // Parse text with OpenAI
      const parsedData = await parseReferenceText(text)
      
      // Convert dates
      const startDate = parsedData.startDate ? new Date(parsedData.startDate) : null
      const endDate = parsedData.endDate ? new Date(parsedData.endDate) : null
      
      // Create client reference
      const reference = await db.clientReference.create({
        data: {
          clientName: parsedData.clientName,
          isAnonymized: parsedData.isAnonymized,
          industry: parsedData.industry,
          projectTitle: parsedData.projectTitle,
          startDate,
          endDate,
          location: parsedData.location,
          servicesDescription: parsedData.servicesDescription,
          technologies: parsedData.technologies,
          methodologies: parsedData.methodologies,
          teamSize: parsedData.teamSize,
          teamRoles: parsedData.teamRoles,
          valueDelivered: parsedData.valueDelivered,
          impact: parsedData.impact,
          clientContactName: parsedData.clientContactName,
          clientContactRole: parsedData.clientContactRole,
          clientContactInfo: parsedData.clientContactInfo,
          referenceLetter: parsedData.referenceLetter,
          rawText: text
        }
      })

      // Update job status
      await db.processingJob.update({
        where: { id: job.id },
        data: {
          status: 'completed',
          result: parsedData as any
        }
      })

      return NextResponse.json({
        success: true,
        reference,
        jobId: job.id
      })

    } catch (parseError) {
      // Update job with error
      await db.processingJob.update({
        where: { id: job.id },
        data: {
          status: 'failed',
          error: parseError instanceof Error ? parseError.message : 'Unknown parsing error'
        }
      })

      return NextResponse.json(
        { 
          error: 'Failed to parse reference text',
          details: parseError instanceof Error ? parseError.message : 'Unknown error',
          jobId: job.id
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 