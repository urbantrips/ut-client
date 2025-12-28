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
    const apiKey = process.env.GEMINI_API_KEY
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

    // Build a comprehensive prompt for Gemini that emphasizes all user preferences
    const destinationText = body.destination 
      ? `The destination is ${body.destination}. The traveler is departing from ${body.departureCity}.`
      : `The traveler is departing from ${body.departureCity}. Please suggest an appropriate destination based on their preferences and travel style.`;

    // Calculate preference emphasis
    const preferences = body.travelStylePreferences;
    const maxPreference = Math.max(preferences.relaxation, preferences.nightlife, preferences.heritage, preferences.adventure);
    const preferenceEmphasis = maxPreference > 0 
      ? Object.entries(preferences)
          .filter(([_, value]) => value === maxPreference)
          .map(([key, _]) => key)
          .join(' and ')
      : 'balanced';

    const prompt = `You are an expert travel planner. Create a detailed, personalized ${numberOfDays}-day travel itinerary.

CRITICAL REQUIREMENTS - These must be strictly followed:
${destinationText}

Traveler Profile:
- Number of travelers: ${body.travelerCounts.adults} adult(s)${body.travelerCounts.children > 0 ? `, ${body.travelerCounts.children} child(ren)` : ''}${body.travelerCounts.infants > 0 ? `, ${body.travelerCounts.infants} infant(s)` : ''}
- Travel Style: ${body.travelStyle}
- Departure City: ${body.departureCity}
${body.destination ? `- Destination: ${body.destination} (THIS IS THE PRIMARY DESTINATION - all activities must be in or near this location)` : ''}
- Travel Dates: ${body.startDate ? new Date(body.startDate).toLocaleDateString() : 'Not specified'} to ${body.endDate ? new Date(body.endDate).toLocaleDateString() : 'Not specified'}
- Hotel Category: ${body.hotelCategory}
- Preferred Travel Mode: ${body.preferredTravelMode}

PREFERENCE SCORES (Higher scores = more emphasis required):
- Relaxation: ${preferences.relaxation}% ${preferences.relaxation >= 50 ? '(HIGH PRIORITY - Include spa, beach, peaceful activities, quiet places)' : ''}
- Nightlife: ${preferences.nightlife}% ${preferences.nightlife >= 50 ? '(HIGH PRIORITY - Include bars, clubs, evening entertainment, night markets)' : ''}
- Heritage: ${preferences.heritage}% ${preferences.heritage >= 50 ? '(HIGH PRIORITY - Include historical sites, museums, cultural experiences, temples, monuments)' : ''}
- Adventure: ${preferences.adventure}% ${preferences.adventure >= 50 ? '(HIGH PRIORITY - Include outdoor activities, trekking, water sports, adventure sports)' : ''}

Primary Focus: ${preferenceEmphasis} (emphasize this throughout the itinerary)

Selected Activities (MUST be included): ${body.selectedActivities.length > 0 ? body.selectedActivities.join(', ') : 'None specified - use preferences to suggest activities'}

INSTRUCTIONS:
1. The itinerary MUST be tailored to the destination "${body.destination || 'based on preferences'}" and departure from "${body.departureCity}"
2. Activities MUST reflect the preference scores - higher scores mean more activities of that type
3. Include specific, real attractions and places in the destination
4. Consider the travel style (${body.travelStyle}) - activities should match this style
5. Include meal suggestions appropriate for the hotel category (${body.hotelCategory})
6. Provide transportation details considering the preferred travel mode (${body.preferredTravelMode})
7. Include timing recommendations for each activity
8. Make activities age-appropriate for the traveler composition

CRITICAL FORMAT REQUIREMENT - Each day's activities array MUST follow this exact structure:
The activities array should contain strings in this specific format:
- "Location: [City/Area name]"
- "Visit to major attractions:"
- "[Specific Attraction 1 name]"
- "[Specific Attraction 2 name]"
- "[Additional attractions as needed]"
- "Optional activities (extra cost): [activity name]"
- "Return to hotel"
- "Overnight Stay: [Hotel name or category] / [City name]"

Example format for activities array:
[
  "Location: [City/Area]",
  "Visit to major attractions:",
  "[Attraction 1 - specific name]",
  "[Attraction 2 - specific name]",
  "Optional activities (extra cost): [activity name]",
  "Return to hotel",
  "Overnight Stay: [Hotel] / [City]"
]

For each day, provide:
- day: number (1, 2, 3, etc.)
- title: string (descriptive title like "Sightseeing & Experiences", "Cultural Immersion", etc.)
- activities: string[] (MUST follow the format above with Location, Visit to major attractions, specific attractions, optional activities, Return to hotel, and Overnight Stay)
- imageKeywords: string (comma-separated keywords specific to the destination and activities, e.g., "${body.destination ? body.destination.toLowerCase() : 'destination'}, [specific attraction], [activity type]")

Return ONLY valid JSON array, no markdown, no code blocks, just the JSON array.`;

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
      return NextResponse.json(
        { error: 'Failed to generate itinerary', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract text from Gemini response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!generatedText) {
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
      
      if (jsonMatch) {
        itinerary = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        itinerary = JSON.parse(generatedText);
      }
    } catch (parseError) {
      // If parsing fails, try to construct a basic itinerary from the text
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
    const itineraryWithImages = await Promise.all(
      itinerary.map(async (day, index) => {
        // Extract destination name for local image lookup
        const destinationName = extractDestinationFromItinerary(
          day.title,
          day.activities,
          body.departureCity
        );
        
        // Use Gemini-provided imageKeywords if available, otherwise extract from title/activities
        let searchQuery = '';
        
        if (day.imageKeywords && day.imageKeywords.trim()) {
          searchQuery = day.imageKeywords.trim();
        } else {
          // Fallback: Extract keywords from day title and activities
          // Try to extract specific attractions from activities for more unique searches
          const extractKeywords = (text: string): string[] => {
            const commonWords = ['day', 'arrival', 'exploration', 'visit', 'tour', 'the', 'and', 'or', 'at', 'to', 'a', 'an', 'return', 'overnight', 'optional', 'activities', 'extra', 'cost'];
            return text
              .toLowerCase()
              .replace(/[^a-z0-9\s]/g, ' ')
              .split(/\s+/)
              .filter(word => word.length > 2 && !commonWords.includes(word))
              .slice(0, 3);
          };
          
          // Extract from multiple activities to get more specific keywords
          const activityTexts = day.activities.slice(0, 3).join(' '); // Use first 3 activities
          const titleKeywords = extractKeywords(day.title);
          const activityKeywords = extractKeywords(activityTexts);
          const allKeywords = [...titleKeywords, ...activityKeywords].slice(0, 3);
          
          if (allKeywords.length > 0) {
            searchQuery = allKeywords.join(',');
          } else if (body.destination) {
            // Use destination with day-specific variation
            searchQuery = `${body.destination.toLowerCase()},day ${day.day}`;
          } else if (body.departureCity) {
            searchQuery = `travel,${body.departureCity.toLowerCase()}`;
          } else {
            searchQuery = 'travel,destination';
          }
        }
        
        // Use production-grade image fetcher with multiple fallbacks
        // Pass day index (0-based) as photoIndex to get different photos for same location
        const imageUrl = await fetchDestinationImage(searchQuery, destinationName, index);
        
        const result = {
          ...day,
          imageUrl,
        };
        
        return result;
      })
    );

    return NextResponse.json({ itinerary: itineraryWithImages });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

