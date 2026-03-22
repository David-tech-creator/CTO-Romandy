import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import * as XLSX from 'xlsx'

export async function POST(request: NextRequest) {
  try {
    const { format, fields, filters } = await request.json()
    
    if (!format || !['excel', 'csv'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Must be "excel" or "csv"' },
        { status: 400 }
      )
    }

    // Build where clause from filters
    const where: any = {}
    
    if (filters?.search) {
      where.OR = [
        { clientName: { contains: filters.search, mode: 'insensitive' } },
        { projectTitle: { contains: filters.search, mode: 'insensitive' } },
        { servicesDescription: { contains: filters.search, mode: 'insensitive' } },
        { valueDelivered: { contains: filters.search, mode: 'insensitive' } }
      ]
    }

    if (filters?.industry) {
      where.industry = { contains: filters.industry, mode: 'insensitive' }
    }

    if (filters?.location) {
      where.location = { contains: filters.location, mode: 'insensitive' }
    }

    if (filters?.technologies) {
      where.technologies = { contains: filters.technologies, mode: 'insensitive' }
    }

    // Get all references (up to 1000 for export)
    const references = await (db.clientReference.findMany as any)({
      where,
      take: 1000,
      orderBy: { createdAt: 'desc' }
    })

    if (references.length === 0) {
      return NextResponse.json(
        { error: 'No references found matching the criteria' },
        { status: 404 }
      )
    }

    // Default fields if none specified
    const defaultFields = [
      'clientName', 'industry', 'projectTitle', 'location', 
      'servicesDescription', 'technologies', 'valueDelivered',
      'startDate', 'endDate', 'teamSize', 'createdAt'
    ]
    
    const selectedFields = fields && fields.length > 0 ? fields : defaultFields

    // Transform data for export
    const exportData = references.map((ref: any) => {
      const row: any = {}
      
      selectedFields.forEach((field: string) => {
        switch (field) {
          case 'clientName':
            row['Client Name'] = ref.isAnonymized ? '[ANONYMIZED]' : ref.clientName
            break
          case 'industry':
            row['Industry'] = ref.industry
            break
          case 'projectTitle':
            row['Project Title'] = ref.projectTitle
            break
          case 'location':
            row['Location'] = ref.location
            break
          case 'servicesDescription':
            row['Services Description'] = ref.servicesDescription
            break
          case 'technologies':
            row['Technologies'] = ref.technologies
            break
          case 'methodologies':
            row['Methodologies'] = ref.methodologies
            break
          case 'valueDelivered':
            row['Value Delivered'] = ref.valueDelivered
            break
          case 'impact':
            row['Impact'] = ref.impact
            break
          case 'teamSize':
            row['Team Size'] = ref.teamSize
            break
          case 'teamRoles':
            row['Team Roles'] = ref.teamRoles
            break
          case 'startDate':
            row['Start Date'] = ref.startDate ? new Date(ref.startDate).toLocaleDateString() : ''
            break
          case 'endDate':
            row['End Date'] = ref.endDate ? new Date(ref.endDate).toLocaleDateString() : ''
            break
          case 'createdAt':
            row['Created'] = new Date(ref.createdAt).toLocaleDateString()
            break
          case 'isAnonymized':
            row['Anonymized'] = ref.isAnonymized ? 'Yes' : 'No'
            break
          default:
            if (ref[field] !== undefined) {
              row[field] = ref[field]
            }
        }
      })
      
      return row
    })

    // Create workbook
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(exportData)
    
    // Auto-size columns
    const columnWidths = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, 15)
    }))
    worksheet['!cols'] = columnWidths

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Client References')

    // Generate file
    let buffer: Buffer
    let filename: string
    let contentType: string

    if (format === 'excel') {
      buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
      filename = `client-references-${new Date().toISOString().split('T')[0]}.xlsx`
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } else {
      const csvData = XLSX.utils.sheet_to_csv(worksheet)
      buffer = Buffer.from(csvData, 'utf8')
      filename = `client-references-${new Date().toISOString().split('T')[0]}.csv`
      contentType = 'text/csv'
    }

    // Return file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('Export Error:', error)
    return NextResponse.json(
      { error: 'Failed to export references' },
      { status: 500 }
    )
  }
} 