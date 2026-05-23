# AuraStyle AI

> Your AI-Powered Personal Stylist & Beauty Consultant for the Next Generation of Hyper-Personalized Shopping.

## 🎯 Problem Statement
Online fashion and beauty shopping is plagued by a lack of genuine personalization, leading to decision paralysis, high return rates, and a disjointed customer experience. Consumers struggle to visualize products on themselves, find items matching their unique style and body type, or discover solutions truly suited for their specific skin needs.

## 💡 Solution
AuraStyle AI is an intelligent web application providing hyper-personalized styling and beauty advice. It leverages Perfect Corp's AI/AR for virtual try-on, skin analysis, and gen AI fashion visualization, combined with advanced multi-agent reasoning (Hermes & NemoClaw powered by Nvidia Nemotron on Crusoe Cloud) to co-create entire looks, recommend products, and analyze suitability in real-time.

## 🏗️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, Tailwind CSS, Framer Motion, Lucide React |
| Backend | Python (for agent logic, Perfect Corp API integration, and general API backend), Node.js (optional, as a BFF for Next.js if extensive data transformation is needed, otherwise Python covers all) |
| APIs | Perfect Corp API (virtual try-on, AI skin analysis, personalized product recommendations, gen AI text-to-image creation, fashion visualization), Crusoe Cloud Managed Inference API (for interacting with Hermes/NemoClaw agents running Nemotron), TrueFoundry AI Gateway (for LLM routing and resilience testing), OpenAI API / Claude API (accessed via TrueFoundry AI Gateway for general LLM capabilities) |
| Deployment | Vercel (for Next.js frontend), Docker (for Python backend/agents), Crusoe Cloud Managed Inference (for Nvidia Nemotron agents) |

## 🤖 Agent Architecture

### PersonaBuilder Agent (NemoClaw)
- **Role:** Deep user persona and style/beauty needs understanding, leveraging Nemotron for nuanced NLP.
- **Inputs:** Conversational text input from user, uploaded style inspiration images, demographic data.
- **Outputs:** Comprehensive user profile: extracted style keywords, color palette, preferred brands, occasion needs, inferred body shape, skin concerns, historical preferences.

### FashionGen Agent (NemoClaw)
- **Role:** Creative generation and visualization of fashion concepts, orchestrating Perfect Corp's gen AI.
- **Inputs:** Persona profile from PersonaBuilder, user text prompts ('show me a bohemian summer dress'), specific item requests, trend data.
- **Outputs:** Text-to-image generation prompts for Perfect Corp API, visual mood boards, AR try-on activation commands for generated/selected items, outfit composition details.

### ProductMatch Agent (Hermes)
- **Role:** Intelligent product sourcing and recommendation based on structured criteria and persona.
- **Inputs:** Persona profile, fashion concepts from FashionGen, skin analysis from BeautyScan, real-time (simulated) inventory data, user feedback.
- **Outputs:** Curated lists of fashion/beauty products, detailed product information, direct links for virtual try-on via Perfect Corp API, price comparisons, alternative suggestions.

### BeautyScan Agent (Hermes)
- **Role:** AI Skin Analysis and personalized beauty product recommendation.
- **Inputs:** User selfie (sent to Perfect Corp API for analysis), reported skin concerns, PersonaBuilder's beauty preferences.
- **Outputs:** Detailed skin analysis report, personalized skincare routine, makeup product recommendations, triggers Perfect Corp virtual try-on for makeup products.

## 🖥️ UI Pages

### Landing Page
**Purpose:** Captivate users and explain AuraStyle AI's value proposition. Visually stunning.
**Components:** Hero Section (dynamic AR/AI visual showcasing virtual try-on/gen AI) · Problem/Solution explanation with statistics on returns/personalization gap · Key Features Showcase (e.g., 'Virtual Try-On,' 'AI Style Generation,' 'Skin Analysis') · Sponsor Logos (Crusoe, Perfect Corp, TrueFoundry) · Call-to-Action: 'Start Your Style Journey'

### AuraStyle Studio (Application Dashboard)
**Purpose:** The core interactive workspace where users engage with the AI agents and visualize results.
**Components:** Persona Builder Chat Interface (for PersonaBuilder Agent, with image upload for inspiration) · AuraVision Canvas (main display for FashionGen's text-to-image output, virtual try-on, 3D fashion visualization from Perfect Corp) · Beauty Lab Panel (for BeautyScan Agent, with 'Upload Selfie for Skin Analysis' button, detailed report display, makeup try-on widget) · Curated Boutique Sidebar (dynamic grid of recommended products from ProductMatch Agent, filter/sort options) · AI Activity Log (HUD-like display showing real-time agent collaboration, inputs, and outputs for transparency and 'wow' factor)

## 🚀 Getting Started

```bash
npm install
cp .env.example .env
# Add your API keys to .env
npm run dev
```

## 🎬 Demo Flow

1. Step 1: Landing Page - Highlight the pervasive problem of generic online shopping and introduce AuraStyle AI's innovative, holistic solution with a visually compelling hero.
2. Step 2: AuraStyle Studio (Persona Builder) - User initiates interaction via chat, providing style preferences and uploading an 'inspiration' image. Show the PersonaBuilder Agent processing this via Nemotron and updating the user's profile.
3. Step 3: AuraStyle Studio (Beauty Lab) - User uploads a selfie for AI Skin Analysis. The BeautyScan Agent, leveraging Perfect Corp's API, provides a detailed skin report and recommends specific skincare/makeup products, demonstrating virtual makeup try-on.
4. Step 4: AuraStyle Studio (Action & Reasoning) - User prompts the FashionGen Agent: 'Design a chic, sustainable business casual outfit for a spring conference.' The 'AI Activity Log' visibly shows agents (FashionGen, ProductMatch) collaborating, processing the prompt with Nemotron via Crusoe Cloud and fetching product details.
5. Step 5: AuraStyle Studio (Result & Visual WOW) - The AuraVision Canvas updates, displaying a stunning, AI-generated visual mockup of the outfit (Perfect Corp's gen AI). User then virtually 'tries on' individual garments and accessories using Perfect Corp's AR. The Curated Boutique sidebar populates with actual product links.
6. Step 6: Holistic Experience Summary - Conclude by emphasizing how AuraStyle AI transforms the shopping experience, demonstrating unparalleled personalization, reduction of returns, and clear business viability, all powered by the sponsors' cutting-edge technologies.

## 📊 Scoring Strategy
AuraStyle AI targets an 11/10 in Innovation and User Impact by directly addressing the high return rates and personalization void in online fashion/beauty, a multi-billion dollar problem. It innovates by: 1) **Deep Integration:** Seamlessly blending Perfect Corp's multi-modal AI/AR (virtual try-on, gen AI text-to-image, skin analysis) with Crusoe's high-performance Nemotron agents (Hermes/NemoClaw) for complex reasoning, all orchestrated through TrueFoundry's robust AI Gateway. 2) **Holistic Personalization:** Moving beyond simple recommendations to co-create entire outfits and beauty routines based on an evolving user persona, body shape, skin analysis, and real-time visualization. 3) **Business Feasibility:** Demonstrating a clear path to market as a premium styling platform, reducing customer churn, increasing conversion for e-commerce, and offering potential SaaS models for brands. 4) **Visual Storytelling:** A state-of-the-art UI with live agent activity logs provides transparent, captivating insight into the AI's intelligent workflow, creating a 'wow' factor and showcasing technical depth that judges will remember.

---

*Generated by [Agents Assemble](https://github.com/QuisTech/agents-assemble) — The Hackathon Co-Founder Meta-System*
