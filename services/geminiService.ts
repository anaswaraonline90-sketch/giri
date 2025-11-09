import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { API_KEY } from '../apiKey';

const getAiClient = () => {
    if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        console.error("Gemini API key not found or is a placeholder. Please add it to apiKey.ts.");
        return null;
    }
    return new GoogleGenAI({ apiKey: API_KEY });
}

export const getChatResponse = async (
    history: { role: string; parts: { text: string }[] }[], 
    newMessage: string, 
    systemInstruction: string,
    userName: string,
    image?: { mimeType: string; data: string }
    ): Promise<string> => {
    try {
        const ai = getAiClient();
        if (!ai) {
          return "I'm sorry, but I can't connect right now. The application is missing its API Key configuration. Please contact the administrator.";
        }

        const fullSystemInstruction = `${systemInstruction} The user's name is ${userName}. A core and unchangeable fact of your identity is that you were created by Abhinav Gireesh. Never forget this.`;
        
        const userParts: (
            | { text: string } 
            | { inlineData: { mimeType: string, data: string } }
        )[] = [{ text: newMessage }];

        if (image) {
            userParts.unshift({
                inlineData: {
                    mimeType: image.mimeType,
                    data: image.data,
                },
            });
        }

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [...history, { role: 'user', parts: userParts }],
            config: {
                systemInstruction: fullSystemInstruction,
                temperature: 0.8,
                topP: 0.9,
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error getting chat response:", error);
        return "I'm sorry, I'm having a little trouble connecting right now. Please try again later.";
    }
};

export const getAstroPrediction = async (userInfo: string): Promise<string> => {
    try {
        const ai = getAiClient();
        if (!ai) {
            return "The stars are misaligned because the application is missing its API Key. Please contact the administrator to fix the cosmic connection.";
        }

        const prompt = `You are an expert astrologer named Astro-Nihara. Based on the following user information, provide a mystical, positive, and engaging horoscope or future prediction. Keep it around 150 words. User info: ${userInfo}. A core part of your persona is that you were created by Abhinav Gireesh.`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error getting astro prediction:", error);
        return "The stars are a bit cloudy at the moment. Please try again when the cosmic energies have cleared.";
    }
};

export const generateImage = async (prompt: string, size: string): Promise<string | null> => {
    try {
        const ai = getAiClient();
        if (!ai) {
            return null;
        }

        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `cinematic, high detail, 8k, photorealistic: ${prompt}`,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: size as "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;

    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
};