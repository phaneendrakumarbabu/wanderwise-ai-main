import { GoogleGenerativeAI } from '@google/generative-ai';
import { Destination } from '@/data/destinations';
import { UserPreferences } from '@/utils/recommendations';

// Initialize Gemini AI
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface GeminiRecommendation {
  destinationId: string;
  matchScore: number;
  matchReasons: string[];
  aiInsight?: string;
}

/**
 * Get AI-powered destination recommendations based on user preferences
 */
export async function getGeminiRecommendations(
  preferences: UserPreferences,
  destinations: Destination[],
  limit: number = 6
): Promise<GeminiRecommendation[]> {
  try {
    // Prepare destination data for the AI
    const destinationsData = destinations.map(dest => ({
      id: dest.id,
      name: dest.name,
      country: dest.country,
      region: dest.region,
      budgetCategory: dest.budgetCategory,
      bestSeason: dest.bestSeason,
      idealDuration: dest.idealDuration,
      activities: dest.activities,
      accommodationTypes: dest.accommodationTypes,
      culturalTags: dest.culturalTags,
      travelTypes: dest.travelTypes,
      description: dest.description
    }));

    // Create a detailed prompt for Gemini
    const prompt = `You are an expert travel advisor. Analyze the following user preferences and recommend the best matching destinations from the provided list.

User Preferences:
- Budget: ${preferences.budget}
- Duration: ${preferences.duration}
- Season: ${preferences.season}
- Travel Type: ${preferences.travelType}
- Activities: ${preferences.activities.join(', ')}
- Accommodation Preferences: ${preferences.accommodation.join(', ')}
- Cultural Interests: ${preferences.cultural.join(', ')}

Available Destinations:
${JSON.stringify(destinationsData, null, 2)}

Please analyze each destination and return a JSON array of recommendations with the following structure:
[
  {
    "destinationId": "string (matching the id from destinations)",
    "matchScore": number (0-100, where 100 is perfect match),
    "matchReasons": ["reason1", "reason2", "reason3"],
    "aiInsight": "A brief personalized insight about why this destination matches the user"
  }
]

Return ONLY the top ${limit} best matches, sorted by matchScore (highest first). Return ONLY valid JSON, no additional text or markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    // Clean the response in case it has markdown code blocks
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }

    const recommendations: GeminiRecommendation[] = JSON.parse(cleanedText);

    // Validate and ensure we have valid recommendations
    return recommendations
      .filter(rec => rec.destinationId && rec.matchScore !== undefined)
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting Gemini recommendations:', error);
    // Fallback to empty array or throw error based on your preference
    throw new Error('Failed to get AI recommendations. Please try again.');
  }
}

/**
 * Generate a personalized trip summary using Gemini AI
 */
export async function generateGeminiTripSummary(
  destination: Destination,
  preferences: UserPreferences
): Promise<string> {
  try {
    const prompt = `You are a travel expert creating a personalized trip summary. Generate a detailed, engaging, and helpful trip summary for the following destination based on the user's preferences.

Destination Details:
- Name: ${destination.name}, ${destination.country}
- Description: ${destination.description}
- Best Season: ${destination.bestSeason.join(', ')}
- Budget Category: ${destination.budgetCategory}
- Ideal Duration: ${destination.idealDuration.join(', ')}
- Activities: ${destination.activities.join(', ')}
- Accommodation Types: ${destination.accommodationTypes.join(', ')}
- Cultural Tags: ${destination.culturalTags.join(', ')}
- Highlights: ${destination.highlights.join(', ')}

User Preferences:
- Budget: ${preferences.budget}
- Duration: ${preferences.duration}
- Season: ${preferences.season}
- Travel Type: ${preferences.travelType}
- Activities: ${preferences.activities.join(', ')}
- Accommodation Preferences: ${preferences.accommodation.join(', ')}
- Cultural Interests: ${preferences.cultural.join(', ')}

Create a comprehensive trip summary that includes:
1. A personalized introduction mentioning why this destination matches their preferences
2. Trip overview with practical details (best time to visit, recommended duration, estimated budget range)
3. Top activities and experiences tailored to their interests
4. Accommodation recommendations based on their preferences
5. Cultural highlights that match their interests
6. Packing tips specific to the destination and season
7. Must-see highlights
8. Practical travel tips

Format the response in a friendly, engaging manner with emojis where appropriate. Make it feel personalized and exciting!`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating Gemini trip summary:', error);
    // Fallback to basic summary
    throw new Error('Failed to generate AI trip summary. Please try again.');
  }
}

/**
 * Get AI-powered match reasons for a specific destination
 */
export async function getGeminiMatchReasons(
  destination: Destination,
  preferences: UserPreferences
): Promise<string[]> {
  try {
    const prompt = `Analyze why this destination matches the user's preferences and provide 3 concise, compelling reasons (each should be one short sentence).

Destination: ${destination.name}, ${destination.country}
- Budget Category: ${destination.budgetCategory}
- Best Season: ${destination.bestSeason.join(', ')}
- Ideal Duration: ${destination.idealDuration.join(', ')}
- Activities: ${destination.activities.join(', ')}
- Travel Types: ${destination.travelTypes.join(', ')}

User Preferences:
- Budget: ${preferences.budget}
- Duration: ${preferences.duration}
- Season: ${preferences.season}
- Travel Type: ${preferences.travelType}
- Activities: ${preferences.activities.join(', ')}

Return ONLY a JSON array of 3 strings, each being a reason why this destination matches. Example: ["Reason 1", "Reason 2", "Reason 3"]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Clean markdown if present
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/g, '');
    }

    const reasons: string[] = JSON.parse(text);
    return reasons.slice(0, 3);
  } catch (error) {
    console.error('Error getting Gemini match reasons:', error);
    // Return fallback reasons
    return [
      `Perfect for your ${preferences.budget.toLowerCase()} budget`,
      `Ideal during ${preferences.season}`,
      `Great for ${preferences.travelType.toLowerCase()} travel`
    ];
  }
}
