import { Destination, destinations } from '@/data/destinations';
import { 
  getGeminiRecommendations, 
  generateGeminiTripSummary,
  getGeminiMatchReasons 
} from '@/services/gemini';

export interface UserPreferences {
  budget: string;
  duration: string;
  season: string;
  travelType: string;
  accommodation: string[];
  activities: string[];
  cultural: string[];
}

export interface ScoredDestination extends Destination {
  matchScore: number;
  matchReasons: string[];
}

const WEIGHTS = {
  budget: 0.25,
  season: 0.20,
  duration: 0.15,
  activities: 0.20,
  accommodation: 0.10,
  cultural: 0.10
};

function calculateArrayOverlap(userArr: string[], destArr: string[]): number {
  if (userArr.length === 0) return 1;
  const matches = userArr.filter(item => destArr.includes(item)).length;
  return matches / userArr.length;
}

/**
 * Get AI-powered recommendations using Gemini AI with fallback to algorithm-based recommendations
 */
export async function getRecommendations(preferences: UserPreferences, limit: number = 5): Promise<ScoredDestination[]> {
  // Try Gemini AI first if API key is available
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    try {
      const geminiRecs = await getGeminiRecommendations(preferences, destinations, limit);
      
      // Map Gemini recommendations to ScoredDestination format
      const scoredDestinations: ScoredDestination[] = geminiRecs
        .map(rec => {
          const dest = destinations.find(d => d.id === rec.destinationId);
          if (!dest) return null;
          
          return {
            ...dest,
            matchScore: rec.matchScore,
            matchReasons: rec.matchReasons
          };
        })
        .filter((dest): dest is ScoredDestination => dest !== null);

      // If we got valid recommendations, return them
      if (scoredDestinations.length > 0) {
        return scoredDestinations;
      }
    } catch (error) {
      console.warn('Gemini AI recommendation failed, falling back to algorithm:', error);
      // Fall through to algorithm-based recommendations
    }
  }

  // Fallback to algorithm-based recommendations
  return getAlgorithmRecommendations(preferences, limit);
}

/**
 * Algorithm-based recommendations (original implementation)
 */
function getAlgorithmRecommendations(preferences: UserPreferences, limit: number = 5): ScoredDestination[] {
  const scoredDestinations: ScoredDestination[] = destinations.map(dest => {
    let totalScore = 0;
    const matchReasons: string[] = [];

    // Budget match (25%)
    const budgetMatch = dest.budgetCategory === preferences.budget ? 1 : 
      (dest.budgetCategory === 'Medium' && preferences.budget !== 'High') ? 0.5 : 0.3;
    totalScore += budgetMatch * WEIGHTS.budget;
    if (budgetMatch === 1) {
      matchReasons.push(`Perfect for your ${preferences.budget.toLowerCase()} budget`);
    }

    // Season match (20%)
    const seasonMatch = preferences.season === 'Anytime' ? 1 :
      dest.bestSeason.includes(preferences.season) ? 1 : 0.3;
    totalScore += seasonMatch * WEIGHTS.season;
    if (seasonMatch === 1 && preferences.season !== 'Anytime') {
      matchReasons.push(`Ideal during ${preferences.season}`);
    }

    // Duration match (15%)
    const durationMatch = dest.idealDuration.includes(preferences.duration) ? 1 : 0.4;
    totalScore += durationMatch * WEIGHTS.duration;
    if (durationMatch === 1) {
      matchReasons.push(`Great for a ${preferences.duration.toLowerCase()} trip`);
    }

    // Activities match (20%)
    const activityScore = calculateArrayOverlap(preferences.activities, dest.activities);
    totalScore += activityScore * WEIGHTS.activities;
    const matchedActivities = preferences.activities.filter(a => dest.activities.includes(a));
    if (matchedActivities.length > 0) {
      matchReasons.push(`Offers ${matchedActivities.slice(0, 2).join(' & ').toLowerCase()}`);
    }

    // Accommodation match (10%)
    const accommodationScore = calculateArrayOverlap(preferences.accommodation, dest.accommodationTypes);
    totalScore += accommodationScore * WEIGHTS.accommodation;

    // Cultural match (10%)
    const culturalScore = calculateArrayOverlap(preferences.cultural, dest.culturalTags);
    totalScore += culturalScore * WEIGHTS.cultural;
    const matchedCultural = preferences.cultural.filter(c => dest.culturalTags.includes(c));
    if (matchedCultural.length > 0) {
      matchReasons.push(`Rich in ${matchedCultural[0].toLowerCase()}`);
    }

    // Travel type bonus
    if (dest.travelTypes.includes(preferences.travelType)) {
      totalScore += 0.05;
      matchReasons.push(`Perfect for ${preferences.travelType.toLowerCase()} travel`);
    }

    return {
      ...dest,
      matchScore: Math.round(totalScore * 100),
      matchReasons: matchReasons.slice(0, 3)
    };
  });

  return scoredDestinations
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

/**
 * Generate AI-powered trip summary using Gemini AI with fallback to template-based summary
 */
export async function generateTripSummary(destination: Destination, preferences: UserPreferences): Promise<string> {
  // Try Gemini AI first if API key is available
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    try {
      return await generateGeminiTripSummary(destination, preferences);
    } catch (error) {
      console.warn('Gemini AI trip summary failed, falling back to template:', error);
      // Fall through to template-based summary
    }
  }

  // Fallback to template-based summary
  return generateTemplateTripSummary(destination, preferences);
}

/**
 * Template-based trip summary (original implementation)
 */
function generateTemplateTripSummary(destination: Destination, preferences: UserPreferences): string {
  const budgetEstimates: Record<string, string> = {
    'Low': '₹15,000 - ₹25,000',
    'Medium': '₹35,000 - ₹55,000',
    'High': '₹70,000 - ₹1,50,000'
  };

  const tips = [
    `Best time to visit: ${destination.bestSeason.join(' or ')}`,
    `Recommended duration: ${destination.idealDuration[0]}`,
    `Estimated budget: ${budgetEstimates[destination.budgetCategory]} per person`,
    `Top activities: ${destination.activities.slice(0, 3).join(', ')}`,
    `Stay options: ${destination.accommodationTypes.slice(0, 2).join(' or ')}`,
    `Cultural highlights: ${destination.culturalTags.slice(0, 2).join(', ')}`
  ];

  const packingTips = destination.activities.includes('Beaches') 
    ? 'Pack sunscreen, swimwear, and light cotton clothes.'
    : destination.activities.includes('Mountains') 
    ? 'Pack warm layers, sturdy shoes, and rain gear.'
    : 'Pack comfortable walking shoes and weather-appropriate clothing.';

  return `
🌍 **${destination.name}, ${destination.country}**

${destination.description}

📋 **Trip Overview:**
${tips.map(tip => `• ${tip}`).join('\n')}

🎒 **Packing Tip:**
${packingTips}

✨ **Must-See Highlights:**
${destination.highlights.map(h => `• ${h}`).join('\n')}

💡 **Travel Tip:** Book accommodations in advance during peak season and always carry local currency for small vendors.
  `.trim();
}
