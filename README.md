# AuraStyle AI

> Intelligent Personalization Platform for Fashion and Beauty E-Commerce

## 🎯 Problem Statement
Online fashion and beauty retail suffers from poor personalization, leading to decision paralysis, high return rates (averaging 30%), and suboptimal customer experiences. Consumers lack intelligent tools to bridge the gap between digital shopping and personalized styling guidance.

Traditional e-commerce relies on generic recommendations. We built AuraStyle to give fashion and beauty retailers production-grade personalization infrastructure powered by advanced vision analysis and LLM-driven styling intelligence.

## 💡 Solution
AuraStyle AI is a comprehensive personalization platform leveraging Perfect Corp's advanced AR/AI capabilities for virtual try-on and skin analysis, combined with Nvidia Nemotron for nuanced natural language understanding. The system orchestrates multi-agent pipelines that analyze user preferences, generate fashion concepts, match products, and recommend beauty routines—all integrated into a seamless e-commerce experience.

## 🏗️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, Tailwind CSS, Framer Motion, Lucide React |
| Backend | Python (agent orchestration, Perfect Corp API integration, recommendation engine), Node.js (optional backend-for-frontend for data transformation) |
| APIs | Perfect Corp API (AR try-on, skin analysis, generative imagery), Crusoe Cloud Managed Inference (Nvidia Nemotron models) |
| Deployment | Vercel (Next.js frontend), Docker (Python backend), Crusoe Cloud Managed Inference (model serving) |

## 🏛️ System Architecture

### Persona Analysis Service (Nemotron-powered)
- **Function:** Comprehensive user profile extraction and preference modeling
- **Inputs:** User conversational input, style inspiration images, demographic data
- **Outputs:** Persona profile with extracted style keywords, color palette, brand preferences, body type inference, skin concerns, preference history

### Fashion Generation & Visualization Service
- **Function:** Creative fashion concept generation and visual composition
- **Inputs:** Persona profiles, user prompts, trend data
- **Outputs:** Text-to-image generation requests, mood boards, AR try-on activation commands, outfit composition details

### Product Discovery & Matching Service
- **Function:** Intelligent product sourcing and recommendation matching
- **Inputs:** Persona profiles, fashion concepts, beauty analysis data, inventory
- **Outputs:** Curated product lists, product details, virtual try-on links, price comparisons, alternative suggestions

### Skin Analysis & Beauty Recommendation Service
- **Function:** Vision-based skin analysis and beauty product personalization
- **Inputs:** User facial imagery, reported skin concerns, beauty preferences
- **Outputs:** Skin analysis reports, personalized skincare routines, makeup recommendations, virtual try-on triggers

## 🖥️ UI Pages

### Landing Page
**Purpose:** Value proposition presentation and problem-solution positioning
**Components:** Hero Section (AR/AI visualization) · Problem Statement (Returns, Personalization Gap) · Feature Showcase · Value Metrics

### AuraStyle Studio (Main Application)
**Purpose:** Core interactive workspace for multi-agent styling and product discovery
**Components:** Persona Builder Chat (User preference collection) · Skin Analysis Lab (Facial imaging) · Fashion Generation Canvas (Visual output) · Product Discovery Panel (Recommendations) · Activity Log (Real-time system reasoning)

## 🚀 Getting Started

```bash
npm install
cp .env.example .env
# Add your API keys to .env
npm run dev
```

## 🎬 Demonstration Flow

1. **Landing Page:** Present the e-commerce personalization challenge and platform capabilities
2. **Persona Collection:** User provides style preferences and uploads inspiration images
3. **Skin Analysis:** User uploads selfie for AI-powered skin analysis and beauty profiling
4. **Fashion Generation:** Request outfit generation (e.g., "sustainable business casual for spring conference")
5. **Visual Results:** Display AI-generated outfit visualization from Perfect Corp
6. **Virtual Try-On:** Enable AR try-on for generated and recommended items
7. **Product Recommendations:** Show curated product matches with pricing and alternatives
8. **Impact Summary:** Demonstrate personalization depth and return rate reduction

## 📊 Technical Implementation

AuraStyle AI addresses the multi-billion dollar e-commerce personalization market through production-grade infrastructure:

1. **Multi-Agent Orchestration:** Structured pipeline architecture separating persona analysis, fashion generation, product discovery, and beauty recommendation concerns
2. **Vision-Language Integration:** Combines advanced vision models (skin analysis) with LLM reasoning (Nemotron) for holistic personalization
3. **AR/AI Integration:** Seamless Perfect Corp API integration for virtual try-on and generative styling
4. **Real-Time Recommendations:** Dynamic product matching and discovery based on real-time user interaction and inventory state

---

*Developed by [QuisTech](https://github.com/QuisTech) — Building intelligent personalization systems*
