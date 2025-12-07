'use server';

import { HfInference } from '@huggingface/inference';
import { createClient } from '@supabase/supabase-js';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function generateLandingPage(formData: FormData) {
    const businessName = formData.get('businessName') as string;
    const industry = formData.get('industry') as string;
    const audience = formData.get('audience') as string;
    const keywords = formData.get('keywords') as string;
    const tone = formData.get('tone') as string;
    const layout = formData.get('layout') as string || 'Modern';
    const color_theme = formData.get('color_theme') as string || 'Blue';

    // Enforce mode based on layout
    // Bold -> Light Mode
    // Modern, Minimal -> Dark Mode
    const mode = layout === 'Bold' ? 'Light' : 'Dark';

    const prompt = `
    You are an expert copywriter and SEO specialist. Create a landing page content for a business with the following details:
    Business Name: ${businessName}
    Industry: ${industry}
    Target Audience: ${audience}
    Keywords: ${keywords}
    Tone of Voice: ${tone}

    Return ONLY a JSON object with the following structure:
    {
      "hero_headline": "H1 headline",
      "sub_headline": "H2 headline",
      "cta_text": "Call to action text",
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "seo_meta_description": "SEO description"
    }
  `;

    try {
        const response = await hf.chatCompletion({
            model: 'meta-llama/Meta-Llama-3-8B-Instruct',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that outputs ONLY JSON.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 300,
            temperature: 0.7,
        });

        const generatedText = response.choices[0].message.content;

        if (!generatedText) {
            throw new Error('Failed to generate text');
        }

        console.log('Generated Text:', generatedText);

        // Clean up markdown code blocks if present
        const cleanText = generatedText.replace(/```json\n?|\n?```/g, '').trim();

        const jsonStart = cleanText.indexOf('{');
        const jsonEnd = cleanText.lastIndexOf('}');

        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error('Failed to generate valid JSON');
        }

        const jsonString = cleanText.substring(jsonStart, jsonEnd + 1);
        const content = JSON.parse(jsonString);

        const { data, error } = await supabase
            .from('projects')
            .insert([
                {
                    business_name: businessName,
                    industry,
                    audience,
                    keywords,
                    tone,
                    layout,
                    color_theme,
                    mode,
                    content,
                },
            ])
            .select()
            .single();

        if (error) throw error;

        return { success: true, projectId: data.id };
    } catch (error: unknown) {
        console.error('Error generating landing page:', error);
        // Log the full error object to see the API response body
        console.error('Full Error Object:', JSON.stringify(error, null, 2));
        return { success: false, error: 'Failed to generate landing page' };
    }
}
