import { NextRequest, NextResponse } from 'next/server';
import { fetchDestinationImage, extractDestinationFromItinerary } from '@/lib/image-fetcher';

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
  imageUrl?: string;
  imageKeywords?: string;
}

interface ModifyItineraryRequest {
  currentItinerary: DayItinerary[];
  userMessage: string;
  travelContext?: {
    departureCity?: string;
    destination?: string;
    travelStyle?: string;
    startDate?: string | null;
    endDate?: string | null;
    travelerCounts?: {
      adults: number;
      children: number;
      infants: number;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ModifyItineraryRequest = await request.json();
    const { currentItinerary, userMessage, travelContext } = body;

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyAHsRns7gdFHZBbN698-pAyjUrixc2vvpA";
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Build the prompt for Gemini
    const itineraryContext = JSON.stringify(currentItinerary, null, 2);
    const contextInfo = travelContext ? `
Travel Context:
- Departure City: ${travelContext.departureCity || 'Not specified'}
${travelContext.destination ? `- Destination: ${travelContext.destination}` : ''}
- Travel Style: ${travelContext.travelStyle || 'Not specified'}
- Travelers: ${travelContext.travelerCounts?.adults || 0} adult(s)${travelContext.travelerCounts?.children ? `, ${travelContext.travelerCounts.children} child(ren)` : ''}
- Dates: ${travelContext.startDate ? new Date(travelContext.startDate).toLocaleDateString() : 'Not specified'} to ${travelContext.endDate ? new Date(travelContext.endDate).toLocaleDateString() : 'Not specified'}
` : '';

    const prompt = `You are a helpful travel planning AI assistant. The user wants to modify their existing travel itinerary.

${contextInfo}
Current Itinerary (JSON format):
${itineraryContext}

User's Request: "${userMessage}"

Your task:
1. Understand what the user wants to change or add to the itinerary
2. Modify the itinerary accordingly while maintaining the overall structure
3. If adding activities, integrate them naturally into the appropriate day(s)
4. If removing activities, remove them cleanly
5. If modifying activities, update them appropriately
6. Maintain the same JSON structure with day, title, activities, and imageKeywords fields
7. Keep the same number of days unless the user explicitly asks to add/remove days
8. Provide a friendly, conversational response message explaining what you changed

IMPORTANT: 
- Return your response as a JSON object with two fields:
  1. "message": A friendly text message explaining what you changed (e.g., "Perfect! I've added authentic local dining experiences! 🍽️")
  2. "itinerary": The updated itinerary array in the same format as the input

- The itinerary array must maintain the exact structure: [{ day: number, title: string, activities: string[], imageKeywords?: string }]
- Do NOT include any markdown formatting, code blocks, or extra text outside the JSON object
- Return ONLY valid JSON

Example response format:
{
  "message": "Perfect! I've added river rafting and trekking to Day 3. Would you like me to adjust the timing for other activities?",
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & Exploration",
      "activities": ["Activity 1", "Activity 2"],
      "imageKeywords": "destination, arrival"
    }
  ]
}`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to modify itinerary', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!generatedText) {
      console.error('No text content found in Gemini response');
      return NextResponse.json(
        { error: 'No content generated from Gemini' },
        { status: 500 }
      );
    }

    // Parse the response
    let result: { message: string; itinerary: DayItinerary[] };
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = generatedText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                       generatedText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        result = JSON.parse(generatedText);
      }
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      // Fallback: return the original itinerary with a generic message
      return NextResponse.json({
        message: "I understand your request, but I'm having trouble processing it. Could you please rephrase?",
        itinerary: currentItinerary,
      });
    }

    // Validate the response structure
    if (!result.itinerary || !Array.isArray(result.itinerary)) {
      console.error('Invalid itinerary structure in response');
      return NextResponse.json({
        message: result.message || "I've processed your request, but there was an issue updating the itinerary.",
        itinerary: currentItinerary,
      });
    }

    // Update image URLs for modified days
    const itineraryWithImages = await Promise.all(
      result.itinerary.map(async (day) => {
        // Only fetch new image if imageKeywords changed or imageUrl is missing
        const existingDay = currentItinerary.find(d => d.day === day.day);
        if (existingDay?.imageUrl && existingDay?.imageKeywords === day.imageKeywords) {
          return {
            ...day,
            imageUrl: existingDay.imageUrl,
          };
        }

        // Fetch new image
        const destinationName = travelContext?.departureCity || '';
        let searchQuery = day.imageKeywords || '';
        
        if (!searchQuery) {
          // Extract keywords from title and activities
          const extractKeywords = (text: string): string[] => {
            const commonWords = ['day', 'arrival', 'exploration', 'visit', 'tour', 'the', 'and', 'or', 'at', 'to', 'a', 'an'];
            return text
              .toLowerCase()
              .replace(/[^a-z0-9\s]/g, ' ')
              .split(/\s+/)
              .filter(word => word.length > 2 && !commonWords.includes(word))
              .slice(0, 3);
          };
          
          const titleKeywords = extractKeywords(day.title);
          const activityKeywords = day.activities.length > 0 
            ? extractKeywords(day.activities[0]) 
            : [];
          const allKeywords = [...titleKeywords, ...activityKeywords].slice(0, 3);
          
          searchQuery = allKeywords.length > 0 
            ? allKeywords.join(',')
            : 'travel,destination';
        }

        const imageUrl = await fetchDestinationImage(searchQuery, destinationName);
        
        return {
          ...day,
          imageUrl,
        };
      })
    );

    return NextResponse.json({
      message: result.message || "I've updated your itinerary!",
      itinerary: itineraryWithImages,
    });
  } catch (error) {
    console.error('Error modifying itinerary:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

