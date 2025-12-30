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
- day: number (1, 2, 3, etc.) - MUST be sequential starting from 1
- title: string (descriptive title like "Sightseeing & Experiences", "Cultural Immersion", etc.)
- activities: string[] (MUST follow the format above with Location, Visit to major attractions, specific attractions, optional activities, Return to hotel, and Overnight Stay)
- imageKeywords: string (comma-separated keywords specific to the destination and activities, e.g., "${body.destination ? body.destination.toLowerCase() : 'destination'}, [specific attraction], [activity type]")

CRITICAL: You MUST return ALL ${numberOfDays} days in your response. Do not skip any days. Day 1, Day 2, Day 3, etc. must all be included.

IMPORTANT: Ensure your response is complete. If you cannot fit all days, prioritize completing at least the first ${Math.min(numberOfDays, 3)} days fully rather than providing incomplete days. Each day object must be complete with all required fields (day, title, activities, imageKeywords).

OUTPUT FORMAT:
Return your response as a valid JSON array starting with [ and ending with ]. 
DO NOT wrap it in markdown code blocks (no \`\`\`json).
DO NOT add any explanatory text before or after the JSON.
DO NOT use code blocks.
Start your response directly with [ and end with ].
The response should be parseable JSON that can be directly used with JSON.parse().

Example of correct output format:
[
  {
    "day": 1,
    "title": "Arrival & Exploration",
    "activities": ["Location: Bangkok", "Visit to major attractions:", "Grand Palace", "Wat Pho", "Return to hotel", "Overnight Stay: Budget Hotel / Bangkok"],
    "imageKeywords": "bangkok, grand palace, temples"
  },
  {
    "day": 2,
    "title": "Cultural Immersion",
    "activities": ["Location: Bangkok", "Visit to major attractions:", "Wat Arun", "Chinatown", "Return to hotel", "Overnight Stay: Budget Hotel / Bangkok"],
    "imageKeywords": "bangkok, wat arun, chinatown"
  }
]`;

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
            maxOutputTokens: 4096, // Increased for longer itineraries
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
    
    // Check if response was truncated
    const finishReason = data.candidates?.[0]?.finishReason;
    if (finishReason === 'MAX_TOKENS') {
      console.warn('Response was truncated due to token limit');
    }

    if (!generatedText) {
      console.error('No text content in Gemini response:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: 'No content generated from Gemini' },
        { status: 500 }
      );
    }
    
    // Log first part of response for debugging
    console.log('Generated text length:', generatedText.length);
    console.log('First 200 chars:', generatedText.substring(0, 200));

    // Try to parse JSON from the response
    // Gemini might return JSON wrapped in markdown code blocks or with extra text
    let itinerary: Array<{ day: number; title: string; activities: string[]; imageKeywords?: string }>;
    try {
      let parsed: any = null;
      
      // Strategy 1: Try to extract JSON from markdown code blocks
      const codeBlockMatch = generatedText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch) {
        try {
          parsed = JSON.parse(codeBlockMatch[1]);
        } catch (e) {
          // If parsing fails, try to extract complete day objects from the code block
          const codeBlockContent = codeBlockMatch[1];
          const extractedDays: any[] = [];
          let braceCount = 0;
          let startIndex = -1;
          let inString = false;
          let escapeNext = false;
          
          const arrayStart = codeBlockContent.indexOf('[');
          if (arrayStart !== -1) {
            for (let i = arrayStart + 1; i < codeBlockContent.length; i++) {
              const char = codeBlockContent[i];
              
              if (escapeNext) {
                escapeNext = false;
                continue;
              }
              
              if (char === '\\') {
                escapeNext = true;
                continue;
              }
              
              if (char === '"' && !escapeNext) {
                inString = !inString;
                continue;
              }
              
              if (inString) continue;
              
              if (char === '{') {
                if (startIndex === -1) startIndex = i;
                braceCount++;
              } else if (char === '}') {
                braceCount--;
                if (braceCount === 0 && startIndex !== -1) {
                  try {
                    const jsonStr = codeBlockContent.substring(startIndex, i + 1);
                    const dayObj = JSON.parse(jsonStr);
                    if (dayObj && typeof dayObj === 'object' && 
                        (dayObj.day !== undefined || dayObj.title !== undefined)) {
                      extractedDays.push(dayObj);
                    }
                  } catch (parseErr) {
                    // Invalid JSON for this object, continue
                  }
                  startIndex = -1;
                }
              }
            }
            
            if (extractedDays.length > 0) {
              console.log(`Extracted ${extractedDays.length} complete days from code block`);
              parsed = extractedDays;
            }
          }
          
          // If still no parsed data, continue to next strategy
          if (!parsed) {
            // Continue to next strategy
          }
        }
      }
      
      // Strategy 2: Try to find JSON array in the text (balanced brackets)
      // This finds the largest valid JSON array
      if (!parsed) {
        const candidates: { json: any; length: number }[] = [];
        let bracketCount = 0;
        let startIndex = -1;
        
        for (let i = 0; i < generatedText.length; i++) {
          if (generatedText[i] === '[') {
            if (startIndex === -1) startIndex = i;
            bracketCount++;
          } else if (generatedText[i] === ']') {
            bracketCount--;
            if (bracketCount === 0 && startIndex !== -1) {
              try {
                const jsonStr = generatedText.substring(startIndex, i + 1);
                const candidate = JSON.parse(jsonStr);
                if (Array.isArray(candidate) && candidate.length > 0) {
                  candidates.push({ json: candidate, length: candidate.length });
                }
              } catch (e) {
                // Invalid JSON, continue
              }
              startIndex = -1;
              bracketCount = 0;
            }
          }
        }
        
        // Use the largest valid array found
        if (candidates.length > 0) {
          candidates.sort((a, b) => b.length - a.length);
          parsed = candidates[0].json;
        }
      }
      
      // Strategy 2.5: If parsing failed, try to extract complete day objects from incomplete JSON
      if (!parsed || (Array.isArray(parsed) && parsed.length === 0)) {
        const extractedDays: any[] = [];
        let braceCount = 0;
        let startIndex = -1;
        let inString = false;
        let escapeNext = false;
        
        // Find the start of the array
        const arrayStart = generatedText.indexOf('[');
        if (arrayStart !== -1) {
          // Look for complete day objects within the array
          for (let i = arrayStart + 1; i < generatedText.length; i++) {
            const char = generatedText[i];
            
            if (escapeNext) {
              escapeNext = false;
              continue;
            }
            
            if (char === '\\') {
              escapeNext = true;
              continue;
            }
            
            if (char === '"' && !escapeNext) {
              inString = !inString;
              continue;
            }
            
            if (inString) continue;
            
            if (char === '{') {
              if (startIndex === -1) {
                startIndex = i;
              }
              braceCount++;
            } else if (char === '}') {
              braceCount--;
              if (braceCount === 0 && startIndex !== -1) {
                try {
                  const jsonStr = generatedText.substring(startIndex, i + 1);
                  const dayObj = JSON.parse(jsonStr);
                  // Validate it looks like a day object
                  if (dayObj && typeof dayObj === 'object' && 
                      (dayObj.day !== undefined || dayObj.title !== undefined)) {
                    extractedDays.push(dayObj);
                  }
                } catch (e) {
                  // Invalid JSON for this object, continue
                }
                startIndex = -1;
              }
            }
          }
          
          if (extractedDays.length > 0) {
            console.log(`Extracted ${extractedDays.length} complete days from incomplete JSON`);
            parsed = extractedDays;
          }
        }
      }
      
      // Strategy 3: Try to find JSON object with itinerary property
      if (!parsed) {
        let braceCount = 0;
        let startIndex = -1;
        for (let i = 0; i < generatedText.length; i++) {
          if (generatedText[i] === '{') {
            if (startIndex === -1) startIndex = i;
            braceCount++;
          } else if (generatedText[i] === '}') {
            braceCount--;
            if (braceCount === 0 && startIndex !== -1) {
              try {
                const jsonStr = generatedText.substring(startIndex, i + 1);
                const candidate = JSON.parse(jsonStr);
                if (candidate && typeof candidate === 'object' && Array.isArray(candidate.itinerary)) {
                  parsed = candidate.itinerary;
                  break;
                }
              } catch (e) {
                // Invalid JSON, continue
              }
              startIndex = -1;
              braceCount = 0;
            }
          }
        }
      }
      
      // Strategy 4: Try parsing the entire text
      if (!parsed) {
        try {
          parsed = JSON.parse(generatedText);
        } catch (e) {
          // Will fall through to fallback parsing
        }
      }
      
      // If parsed is an object with itinerary property, extract it
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.itinerary) {
        parsed = parsed.itinerary;
      }
      
      itinerary = Array.isArray(parsed) ? parsed : [];
      
      // Log for debugging
      if (itinerary.length === 0) {
        console.warn('No itinerary parsed from response. Generated text length:', generatedText.length);
        console.warn('First 500 chars of response:', generatedText.substring(0, 500));
        // Try one more time with a more lenient approach
        // Look for any array-like structure
        const arrayLikeMatch = generatedText.match(/\[[\s\S]{100,}?\]/);
        if (arrayLikeMatch) {
          try {
            const lenientParsed = JSON.parse(arrayLikeMatch[0]);
            if (Array.isArray(lenientParsed) && lenientParsed.length > 0) {
              console.log('Found itinerary using lenient parsing');
              itinerary = lenientParsed;
            }
          } catch (e) {
            console.warn('Lenient parsing also failed');
          }
        }
      } else {
        console.log(`Successfully parsed ${itinerary.length} days from itinerary`);
        
        // Check if we got fewer days than expected - might be truncated
        if (itinerary.length < numberOfDays) {
          console.warn(`Warning: Only got ${itinerary.length} days but expected ${numberOfDays}. Response may be truncated.`);
          // Check if the last day is complete by looking at the response
          const lastDay = itinerary[itinerary.length - 1];
          if (lastDay && (!lastDay.activities || lastDay.activities.length === 0)) {
            console.warn('Last day appears incomplete, removing it');
            itinerary = itinerary.slice(0, -1);
          }
        }
      }
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Generated text (first 1000 chars):', generatedText.substring(0, 1000));
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
      
      // If still no itinerary, try one more aggressive parsing attempt
      if (itinerary.length === 0) {
        // Try to find any JSON structure that might contain itinerary data
        const jsonPatterns = [
          /\[[\s\S]*?\]/g,  // Any array
          /\{[\s\S]*?"itinerary"[\s\S]*?\}/g,  // Object with itinerary property
        ];
        
        for (const pattern of jsonPatterns) {
          const matches = generatedText.match(pattern);
          if (matches) {
            for (const match of matches) {
              try {
                const candidate = JSON.parse(match);
                if (Array.isArray(candidate) && candidate.length > 0) {
                  itinerary = candidate;
                  console.log('Found itinerary using aggressive parsing');
                  break;
                } else if (candidate && candidate.itinerary && Array.isArray(candidate.itinerary)) {
                  itinerary = candidate.itinerary;
                  console.log('Found itinerary in object using aggressive parsing');
                  break;
                }
              } catch (e) {
                // Continue to next match
              }
            }
            if (itinerary.length > 0) break;
          }
        }
      }
      
      // If still no itinerary, create a default one
      if (itinerary.length === 0) {
        console.error('Failed to parse itinerary. Creating default placeholder.');
        itinerary = Array.from({ length: numberOfDays }, (_, i) => ({
          day: i + 1,
          title: `Day ${i + 1} Itinerary`,
          activities: ['Itinerary details will be available soon'],
          imageKeywords: 'travel, destination',
        }));
      }
    }

    // Ensure all activities are strings (not objects) and validate day structure
    itinerary = itinerary
      .filter((day) => day && typeof day === 'object') // Remove invalid entries
      .map((day, index) => {
        // Ensure day number is set correctly
        if (!day.day || typeof day.day !== 'number') {
          day.day = index + 1;
        }
        
        // Ensure title exists
        if (!day.title || typeof day.title !== 'string') {
          day.title = `Day ${day.day} Itinerary`;
        }
        
        // Ensure activities is an array of strings
        if (Array.isArray(day.activities)) {
          day.activities = day.activities
            .filter((activity) => activity !== null && activity !== undefined)
            .map((activity: any) => {
              // If activity is an object, convert it to string
              if (typeof activity === 'object' && activity !== null) {
                return JSON.stringify(activity);
              }
              // Ensure it's a string
              return String(activity);
            });
        } else {
          // If activities is not an array, make it an empty array
          day.activities = [];
        }
        
        // Ensure imageKeywords is a string if provided
        if (day.imageKeywords && typeof day.imageKeywords !== 'string') {
          day.imageKeywords = String(day.imageKeywords);
        }
        
        return day;
      })
      .sort((a, b) => a.day - b.day); // Sort by day number

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

