import OpenAI from 'openai'
import { ParsedReferenceData } from '@/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const EXTRACTION_PROMPT = `
You are an expert consultant reference parser. Extract structured information from the provided text about a consulting project/client reference. 

Parse the text and extract the following information into a JSON object:

{
  "clientName": "Full legal name or anonymized version",
  "isAnonymized": boolean,
  "industry": "Primary industry/sector (e.g., Finance, Healthcare, Manufacturing)",
  "projectTitle": "Concise descriptive project name",
  "startDate": "MM/YYYY format or null",
  "endDate": "MM/YYYY format or null", 
  "location": "Country or region",
  "servicesDescription": "What was done, how it was done, key deliverables",
  "technologies": "Tools, platforms, technologies used (comma-separated)",
  "methodologies": "Approaches and methodologies used (comma-separated)",
  "teamSize": number or null,
  "teamRoles": "Number and seniority of consultants involved",
  "valueDelivered": "Quantitative or qualitative outcomes achieved",
  "impact": "Business impact and results",
  "clientContactName": "Contact person name or null",
  "clientContactRole": "Contact person role or null", 
  "clientContactInfo": "Contact information or null",
  "referenceLetter": "Any testimonial or reference content or null"
}

Rules:
- If information is not available, use null for optional fields or appropriate defaults
- For dates, use MM/YYYY format (e.g., "03/2023")
- Keep descriptions concise but informative
- Extract all relevant technologies and methodologies mentioned
- If client name should be anonymized for confidentiality, set isAnonymized to true

Text to parse:
`

export async function parseReferenceText(text: string): Promise<ParsedReferenceData> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: EXTRACTION_PROMPT
        },
        {
          role: "user", 
          content: text
        }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const parsed = JSON.parse(content) as ParsedReferenceData
    
    // Validate required fields
    if (!parsed.clientName || !parsed.industry || !parsed.projectTitle) {
      throw new Error('Missing required fields: clientName, industry, or projectTitle')
    }

    return parsed
  } catch (error) {
    console.error('Error parsing reference text:', error)
    throw error
  }
}

export async function enhanceReferenceData(
  existingData: Partial<ParsedReferenceData>,
  additionalText: string
): Promise<ParsedReferenceData> {
  const enhancePrompt = `
You have existing client reference data and additional text. Enhance and merge the information while preserving existing accurate data.

Existing data: ${JSON.stringify(existingData)}

Additional text: ${additionalText}

Return the enhanced data in the same JSON format, filling gaps and improving descriptions while keeping accurate existing information.
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: enhancePrompt
        }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    return JSON.parse(content) as ParsedReferenceData
  } catch (error) {
    console.error('Error enhancing reference data:', error)
    throw error
  }
} 