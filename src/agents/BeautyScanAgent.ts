import { PerfectCorpClient, CrusoeCloudClient } from '@/lib/apiClients';

interface PersonaBeautyPreferences {
  skinConcerns: string[];
  preferredBrands: string[];
}

interface BeautyScanInputs {
  userSelfie: File; // The actual file would be uploaded to Perfect Corp API
  reportedSkinConcerns: string[];
  personaBeautyPreferences: PersonaBeautyPreferences;
}

interface BeautyScanOutput {
  skinAnalysisReport: { // Detailed report from Perfect Corp
    concerns: string[];
    score: number;
    areasAnalyzed: Record<string, string>; // e.g., { 'forehead': 'oily', 'cheeks': 'dry' }
  };
  personalizedSkincareRoutine: string[]; // e.g., ['Cleanse', 'Tone', 'Serum (Hyaluronic Acid)', 'Moisturize', 'SPF']
  makeupProductRecommendations: { id: string; name: string; imageUrl: string; tryOnLink: string }[];
  triggerPerfectCorpVirtualTryOnCommands: string[];
}

/**
 * BeautyScan Agent (Hermes):
 * AI Skin Analysis and personalized beauty product recommendation.
 * Interacts with Crusoe Cloud Managed Inference for Hermes reasoning and Perfect Corp API for analysis and try-on.
 */
export class BeautyScanAgent {
  private perfectCorpClient: PerfectCorpClient;
  private crusoeClient: CrusoeCloudClient; // For Hermes to refine routine/recommendations

  constructor(perfectCorpClient: PerfectCorpClient, crusoeClient: CrusoeCloudClient) {
    this.perfectCorpClient = perfectCorpClient;
    this.crusoeClient = crusoeClient;
  }

  /**
   * Performs AI skin analysis and generates personalized beauty recommendations.
   * @param inputs - Object containing user selfie, reported concerns, and persona beauty preferences.
   * @returns A promise resolving to skin analysis report, routine, and product recommendations.
   */
  async analyzeAndRecommend(inputs: BeautyScanInputs): Promise<BeautyScanOutput> {
    console.log('[BeautyScanAgent] Initiating skin analysis and recommendations with inputs:', inputs);

    // Step 1: Send user selfie to Perfect Corp API for analysis
    const analysisResult = await this.perfectCorpClient.analyzeSkin(inputs.userSelfie);

    let skinConcerns: string[] = inputs.reportedSkinConcerns;
    let analysisScore: number = 0;
    let areasAnalyzed: Record<string, string> = {};
    if (analysisResult.status === 'success' && analysisResult.data) {
      skinConcerns = Array.from(new Set([...skinConcerns, ...analysisResult.data.concerns]));
      analysisScore = analysisResult.data.score;
      areasAnalyzed = analysisResult.data.areasAnalyzed || { face: skinConcerns.join(', ') }; // Mock detailed areas
    }

    const skinAnalysisReport = {
      concerns: skinConcerns,
      score: analysisScore,
      areasAnalyzed: areasAnalyzed,
    };

    // Step 2: Use Hermes (via Crusoe Cloud) for advanced routine and product selection reasoning
    const hermesRecommendation = await this.crusoeClient.invokeAgent('Hermes-Beauty-Advisor', {
      skinAnalysis: skinAnalysisReport,
      userPreferences: inputs.personaBeautyPreferences,
    });

    let personalizedSkincareRoutine: string[] = ['Cleanse', 'Moisturize', 'SPF'];
    let makeupRecs: { id: string; name: string; imageUrl: string; tryOnLink: string }[] = [];

    if (hermesRecommendation.status === 'success' && hermesRecommendation.response?.agentOutput) {
      // Mock parsing Hermes output for richer routine and product ideas
      personalizedSkincareRoutine = [
        'Morning: Gentle Cleanser, Vitamin C Serum, Lightweight Moisturizer, SPF 50',
        'Evening: Double Cleanse, Retinol Serum (3x/week), Hydrating Night Cream',
        `Targeted Treatment: Spot treatment for ${skinConcerns[0] || 'acne'} (if applicable)`,
      ];

      makeupRecs = [
        { id: 'm001', name: 'Hydrating Foundation', imageUrl: '/placeholder-makeup1.jpg', tryOnLink: `perfectcorp://makeup/foundation/m001` },
        { id: 'm002', name: 'Nourishing Lipstick', imageUrl: '/placeholder-makeup2.jpg', tryOnLink: `perfectcorp://makeup/lipstick/m002` },
      ];
    }

    // Step 3: Trigger Perfect Corp virtual try-on for makeup products
    const tryOnCommands = makeupRecs.map(rec => rec.tryOnLink);

    return {
      skinAnalysisReport: skinAnalysisReport,
      personalizedSkincareRoutine: personalizedSkincareRoutine,
      makeupProductRecommendations: makeupRecs,
      triggerPerfectCorpVirtualTryOnCommands: tryOnCommands,
    };
  }
}
