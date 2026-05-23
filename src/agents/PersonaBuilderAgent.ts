import { CrusoeCloudClient, TrueFoundryClient } from '@/lib/apiClients';

interface PersonaInputs {
  conversationalText: string;
  uploadedInspirationImages?: File[];
  demographicData?: Record<string, any>;
}

interface PersonaOutput {
  extractedStyleKeywords: string[];
  colorPalette: string[];
  preferredBrands: string[];
  occasionNeeds: string[];
  inferredBodyShape: string;
  skinConcerns: string[];
  historicalPreferences: Record<string, any>;
  fullProfileSummary: string;
}

/**
 * PersonaBuilder Agent (NemoClaw):
 * Deep user persona and style/beauty needs understanding, leveraging Nemotron for nuanced NLP.
 * Interacts with Crusoe Cloud Managed Inference for Nemotron and TrueFoundry for general LLM capabilities.
 */
export class PersonaBuilderAgent {
  private crusoeClient: CrusoeCloudClient;
  private trueFoundryClient: TrueFoundryClient;

  constructor(crusoeClient: CrusoeCloudClient, trueFoundryClient: TrueFoundryClient) {
    this.crusoeClient = crusoeClient;
    this.trueFoundryClient = trueFoundryClient;
  }

  /**
   * Processes user input to build a comprehensive persona profile.
   * @param inputs - Object containing conversational text, optional inspiration images, and demographic data.
   * @returns A promise resolving to the comprehensive user persona profile.
   */
  async buildPersona(inputs: PersonaInputs): Promise<PersonaOutput> {
    console.log('[PersonaBuilderAgent] Building persona with inputs:', inputs);

    // Step 1: Use TrueFoundry (routing to Nemotron/OpenAI/Claude) for initial NLP on conversational text
    const llmResponse = await this.trueFoundryClient.chat('Nemotron-4-340B-Instruct', [
      { role: 'system', content: 'Extract style keywords, body shape, skin concerns, and preferences from user input.' },
      { role: 'user', content: inputs.conversationalText },
    ]);

    let inferredKeywords: string[] = [];
    let inferredBodyShape: string = 'unknown';
    let inferredSkinConcerns: string[] = [];
    if (llmResponse.status === 'success' && llmResponse.llmOutput) {
      // Mock parsing LLM output
      inferredKeywords = llmResponse.llmOutput.includes('bohemian') ? ['bohemian', 'casual', 'summer'] : ['classic', 'elegant', 'professional'];
      inferredBodyShape = llmResponse.llmOutput.includes('hourglass') ? 'hourglass' : 'rectangle';
      inferredSkinConcerns = llmResponse.llmOutput.includes('acne') ? ['acne', 'oily'] : ['dryness', 'sensitivity'];
    }

    // Step 2: (Optional) Process uploaded images for style cues (mocked)
    if (inputs.uploadedInspirationImages && inputs.uploadedInspirationImages.length > 0) {
      console.log(`[PersonaBuilderAgent] Processing ${inputs.uploadedInspirationImages.length} inspiration images.`);
      // In a real scenario, this would involve sending images to a vision API (e.g., Perfect Corp or a custom model via Crusoe Cloud).
      // For now, we'll just acknowledge.
    }

    // Step 3: Combine all data points for the final persona
    const fullProfileSummary = `Based on your input "${inputs.conversationalText}", we've identified key preferences.`;

    return {
      extractedStyleKeywords: inferredKeywords,
      colorPalette: ['earth tones', 'pastels'],
      preferredBrands: ['Zara', 'H&M'], // Mock values
      occasionNeeds: ['everyday', 'work'],
      inferredBodyShape: inferredBodyShape,
      skinConcerns: inferredSkinConcerns,
      historicalPreferences: { lastSearched: ['dresses'], lastPurchased: ['skirt'] }, // Mock values
      fullProfileSummary: fullProfileSummary,
    };
  }
}
