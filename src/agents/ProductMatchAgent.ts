import { PerfectCorpClient, CrusoeCloudClient } from '@/lib/apiClients';

interface PersonaProfile {
  extractedStyleKeywords: string[];
  colorPalette: string[];
  preferredBrands: string[];
  inferredBodyShape: string;
  skinConcerns: string[];
}

interface FashionConcept {
  outfitCompositionDetails: Record<string, string>; // e.g., { top: 'silk blouse', bottom: 'high-waisted jeans' }
}

interface SkinAnalysisReport {
  concerns: string[];
  score: number;
}

interface ProductMatchInputs {
  personaProfile: PersonaProfile;
  fashionConcept?: FashionConcept;
  skinAnalysisReport?: SkinAnalysisReport;
  realtimeInventoryData?: Record<string, any>; // Simulated inventory
  userFeedback?: string; // e.g., 'too expensive', 'wrong color'
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  brand: string;
  category: 'fashion' | 'beauty';
  imageUrl: string;
  perfectCorpTryOnLink?: string; // Direct link for virtual try-on via Perfect Corp API
  alternativeSuggestions?: Product[];
}

interface ProductMatchOutput {
  curatedProducts: Product[];
  detailedProductInfo: Record<string, Product>;
}

/**
 * ProductMatch Agent (Hermes):
 * Intelligent product sourcing and recommendation based on structured criteria and persona.
 * Interacts with Crusoe Cloud Managed Inference for Hermes reasoning and Perfect Corp API for recommendations.
 */
export class ProductMatchAgent {
  private perfectCorpClient: PerfectCorpClient;
  private crusoeClient: CrusoeCloudClient;

  constructor(perfectCorpClient: PerfectCorpClient, crusoeClient: CrusoeCloudClient) {
    this.perfectCorpClient = perfectCorpClient;
    this.crusoeClient = crusoeClient;
  }

  /**
   * Curates and recommends products based on comprehensive inputs.
   * @param inputs - Object containing persona, fashion concepts, skin analysis, inventory, and user feedback.
   * @returns A promise resolving to curated product lists and detailed product information.
   */
  async matchProducts(inputs: ProductMatchInputs): Promise<ProductMatchOutput> {
    console.log('[ProductMatchAgent] Matching products with inputs:', inputs);

    // Step 1: Use Hermes (via Crusoe Cloud) for advanced reasoning on matching criteria
    const hermesReasoning = await this.crusoeClient.invokeAgent('Hermes-Product-Matcher', {
      persona: inputs.personaProfile,
      fashionConcept: inputs.fashionConcept,
      skinAnalysis: inputs.skinAnalysisReport,
      inventory: inputs.realtimeInventoryData,
      feedback: inputs.userFeedback,
    });

    let matchCriteria: string[] = inputs.personaProfile.extractedStyleKeywords;
    if (hermesReasoning.status === 'success' && hermesReasoning.response?.agentOutput) {
      // Mock parsing Hermes output for more refined criteria
      matchCriteria = [...matchCriteria, 'sustainable', 'trendy'];
    }
    if (inputs.fashionConcept) {
      matchCriteria.push(...Object.values(inputs.fashionConcept.outfitCompositionDetails));
    }
    if (inputs.skinAnalysisReport) {
      matchCriteria.push(...inputs.skinAnalysisReport.concerns.map(c => `${c} treatment`));
    }

    // Step 2: Call Perfect Corp's Personalized Product Recommendation API
    const recommendationsResult = await this.perfectCorpClient.getRecommendations({
      userId: 'mockUserId',
      criteria: matchCriteria.join(', '),
      brandPreferences: inputs.personaProfile.preferredBrands,
    });

    let curatedProducts: Product[] = [];
    if (recommendationsResult.status === 'success' && recommendationsResult.data) {
      curatedProducts = recommendationsResult.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: `A perfect match based on your ${item.category || 'style'}.`,
        price: `$${(Math.random() * 100 + 20).toFixed(2)}`,
        brand: item.brand || inputs.personaProfile.preferredBrands[0] || 'Generic Brand',
        category: item.category || (item.name.toLowerCase().includes('cream') ? 'beauty' : 'fashion'),
        imageUrl: `/placeholder-${item.category || 'item'}.jpg`,
        perfectCorpTryOnLink: item.tryOnLink || `https://tryon.perfectcorp.com/${item.id}`,
      }));
    }

    const detailedProductInfo: Record<string, Product> = curatedProducts.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});

    return {
      curatedProducts: curatedProducts,
      detailedProductInfo: detailedProductInfo,
    };
  }
}
