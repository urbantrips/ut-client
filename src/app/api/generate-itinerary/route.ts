import { NextRequest, NextResponse } from 'next/server';
import { fetchDestinationImage, extractDestinationFromItinerary } from '@/lib/image-fetcher';

interface GenerateItineraryRequest {
  departureCity: string;
  destination?: string;
  travelStyle: string;
  startDate: string | null;
  endDate: string | null;
  travelerCounts: {
    adults: number;
    children: number;
    infants: number;
  };
  hotelCategory: string;
  preferredTravelMode: string;
  selectedActivities: string[];
  travelStylePreferences: {
    relaxation: number;
    nightlife: number;
    heritage: number;
    adventure: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateItineraryRequest = await request.json();

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyAHsRns7gdFHZBbN698-pAyjUrixc2vvpA";
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Calculate number of days
    let numberOfDays = 3; // default
    if (body.startDate && body.endDate) {
      const start = new Date(body.startDate);
      const end = new Date(body.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    // Build the prompt for Gemini
    const prompt = `Create a detailed ${numberOfDays}-day travel itinerary for ${body.travelerCounts.adults} adult(s)${body.travelerCounts.children > 0 ? `, ${body.travelerCounts.children} child(ren)` : ''}${body.travelerCounts.infants > 0 ? `, ${body.travelerCounts.infants} infant(s)` : ''}.

Travel Details:
- Departure City: ${body.departureCity}
${body.destination ? `- Destination: ${body.destination}` : ''}
- Travel Style: ${body.travelStyle}
- Hotel Category: ${body.hotelCategory}
- Preferred Travel Mode: ${body.preferredTravelMode}
- Start Date: ${body.startDate ? new Date(body.startDate).toLocaleDateString() : 'Not specified'}
- End Date: ${body.endDate ? new Date(body.endDate).toLocaleDateString() : 'Not specified'}

Preferences:
- Relaxation: ${body.travelStylePreferences.relaxation}%
- Nightlife: ${body.travelStylePreferences.nightlife}%
- Heritage: ${body.travelStylePreferences.heritage}%
- Adventure: ${body.travelStylePreferences.adventure}%

Selected Activities: ${body.selectedActivities.length > 0 ? body.selectedActivities.join(', ') : 'None specified'}

Please generate a detailed day-by-day itinerary. For each day, provide:
1. A descriptive title for the day
2. A list of specific activities, attractions, and experiences
3. Include meal suggestions, transportation details, and timing recommendations where relevant

Format the response as a JSON array where each object has:
- day: number (1, 2, 3, etc.)
- title: string (e.g., "Arrival & Exploration", "Cultural Immersion")
- activities: string[] (array of activity descriptions)
- imageKeywords: string (comma-separated keywords for finding relevant images, e.g., "srinagar, dal lake, houseboat, kashmir")

The imageKeywords should be specific and relevant to the day's activities and location. Use 3-5 keywords that would help find appropriate travel/destination images.

Return ONLY valid JSON, no markdown formatting, no code blocks, just the JSON array.`;

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
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate itinerary', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Log the full Gemini API response for debugging
    console.log('=== Gemini API Response ===');
    console.log('Full response:', JSON.stringify(data, null, 2));
    console.log('==========================');

    // Extract text from Gemini response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Log the extracted text
    console.log('=== Extracted Text from Gemini ===');
    console.log(generatedText);
    console.log('==================================');

    if (!generatedText) {
      console.error('No text content found in Gemini response');
      return NextResponse.json(
        { error: 'No content generated from Gemini' },
        { status: 500 }
      );
    }

    // Try to parse JSON from the response
    // Gemini might return JSON wrapped in markdown code blocks or with extra text
    let itinerary: Array<{ day: number; title: string; activities: string[]; imageKeywords?: string }>;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = generatedText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                       generatedText.match(/\[[\s\S]*\]/);
      
      console.log('=== JSON Parsing Attempt ===');
      console.log('JSON Match found:', !!jsonMatch);
      if (jsonMatch) {
        console.log('Extracted JSON string:', jsonMatch[1] || jsonMatch[0]);
      }
      
      if (jsonMatch) {
        itinerary = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        itinerary = JSON.parse(generatedText);
      }
      
      console.log('Parsed itinerary:', JSON.stringify(itinerary, null, 2));
      console.log('============================');
    } catch (parseError) {
      // If parsing fails, try to construct a basic itinerary from the text
      console.error('Failed to parse JSON, attempting to parse text:', parseError);
      
      // Fallback: create a simple structure from the text
      const lines = generatedText.split('\n').filter((line: string) => line.trim());
      itinerary = [];
      let currentDay: { day: number; title: string; activities: string[]; imageKeywords?: string } = { day: 1, title: '', activities: [] };
      
      for (const line of lines) {
        if (line.match(/day\s+\d+/i) || line.match(/^day\s*\d+/i)) {
          if (currentDay.activities.length > 0) {
            itinerary.push(currentDay);
          }
          const dayMatch = line.match(/\d+/);
          currentDay = {
            day: dayMatch ? parseInt(dayMatch[0]) : itinerary.length + 1,
            title: line.replace(/day\s*\d+/i, '').trim() || `Day ${itinerary.length + 1}`,
            activities: [],
          };
        } else if (line.trim() && !line.match(/^[#*\-]/)) {
          currentDay.activities.push(line.trim().replace(/^[-*•]\s*/, ''));
        }
      }
      
      if (currentDay.activities.length > 0) {
        itinerary.push(currentDay);
      }
      
      // If still no itinerary, create a default one
      if (itinerary.length === 0) {
        itinerary = Array.from({ length: numberOfDays }, (_, i) => ({
          day: i + 1,
          title: `Day ${i + 1} Itinerary`,
          activities: ['Itinerary details will be available soon'],
          imageKeywords: 'travel, destination',
        }));
      }
    }

    // Ensure we have the correct number of days
    if (itinerary.length < numberOfDays) {
      for (let i = itinerary.length; i < numberOfDays; i++) {
        itinerary.push({
          day: i + 1,
          title: `Day ${i + 1} Itinerary`,
          activities: ['More details coming soon'],
          imageKeywords: 'travel, destination',
        });
      }
    }

    // Fetch images for each day using production-grade approach
    // Production apps typically: 1) Use CDN + curated images, 2) Cache aggressively, 
    // 3) Use licensed APIs (Pexels/Unsplash), 4) Fallback to local assets
    console.log('=== Generating Image URLs ===');
    const itineraryWithImages = await Promise.all(
      itinerary.map(async (day) => {
        // Extract destination name for local image lookup
        const destinationName = extractDestinationFromItinerary(
          day.title,
          day.activities,
          body.departureCity
        );
        
        // Use Gemini-provided imageKeywords if available, otherwise extract from title/activities
        let searchQuery = '';
        
        console.log(`\nDay ${day.day}:`);
        console.log('  Title:', day.title);
        console.log('  ImageKeywords from Gemini:', day.imageKeywords);
        console.log('  Extracted destination:', destinationName);
        
        if (day.imageKeywords && day.imageKeywords.trim()) {
          searchQuery = day.imageKeywords.trim();
          console.log('  Using Gemini keywords:', searchQuery);
        } else {
          // Fallback: Extract keywords from day title and activities
          console.log('  No Gemini keywords, extracting from title/activities...');
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
          
          if (allKeywords.length > 0) {
            searchQuery = allKeywords.join(',');
          } else if (body.departureCity) {
            searchQuery = `travel,${body.departureCity.toLowerCase()}`;
          } else {
            searchQuery = 'travel,destination';
          }
          console.log('  Extracted keywords:', searchQuery);
        }
        
        // Use production-grade image fetcher with multiple fallbacks
        const imageUrl = await fetchDestinationImage(searchQuery, destinationName);
        
        const result = {
          ...day,
          imageUrl,
        };
        
        console.log('  Final day object:', JSON.stringify(result, null, 2));
        
        return result;
      })
    );
    console.log('============================\n');

    // Log the final itinerary with images
    console.log('=== Final Itinerary with Images ===');
    console.log(JSON.stringify(itineraryWithImages, null, 2));
    console.log('===================================');

    return NextResponse.json({ itinerary: itineraryWithImages });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

