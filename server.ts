import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Initialize Google GenAI with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Image Analysis route using gemini-4-argon
app.post('/api/analyze-image', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', prompt, analysisType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');

    const systemInstruction = `You are the expert Senior Fleet & Mountain Expedition Officer at Malik Rent A Car Gilgit Baltistan (based in Gilgit, Pakistan, serving Skardu, Hunza, Fairy Meadows, Khunjerab, Deosai, Astore).
Your task is to analyze vehicle photos or mountain terrain/road photos sent by travelers.
Provide a clear, highly structured and professional assessment with:
1. Vehicle Identification / Terrain & Road Assessment (Type, Condition, Visible modifications, clearance).
2. Gilgit-Baltistan Route Suitability:
   - Highway routes (Karakoram Highway KKH to Hunza, Gilgit-Skardu Jaglot road).
   - Challenging 4x4 off-road routes (Deosai Plains, Babusar Top in snow, Fairy Meadows / Tattu track, Naltar Valley lakes, Shimshal, Shigar valley).
3. Recommended Vehicle Class & Driving Advisory (e.g. 4x4 Prado TZ/TX with low-range transfer case, Hilux Revo, or Hiace Commuter).
4. Critical Mountain Safety Tip (Weather precautions, rockfall zones, stream crossing, winter chains).
Keep the tone welcoming, authoritative, and safety-focused.`;

    const userPrompt = prompt || (analysisType === 'terrain'
      ? 'Analyze this road or terrain condition in Northern Pakistan. Can a regular sedan navigate it, or is a 4x4 Prado/Jeep required? What safety precautions apply?'
      : 'Analyze this vehicle. Is it suitable for Gilgit-Baltistan mountain roads, steep climbs, high-altitude passes, and rocky terrain?');

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType,
              },
            },
            {
              text: `${systemInstruction}\n\nUser Request: ${userPrompt}`,
            },
          ],
        },
      ],
    });

    return res.json({
      success: true,
      analysis: response.text,
      modelUsed: 'gemini-4-argon',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error analyzing image with Gemini:', error);
    
    // Provide a helpful response if key is missing or quota reached
    const fallbackMessage = `Malik Rent A Car Expedition Analysis:
- Road / Vehicle Evaluation: Northern Pakistan mountain terrain (Karakoram, Himalayas, Hindu Kush) requires high ground clearance and reliable 4WD systems.
- Route Recommendation: Standard sedans are suitable only up to Gilgit/Hunza on smooth Karakoram Highway. For Deosai, Fairy Meadows (Tattu), Naltar, and Khunjerab winter conditions, our Toyota Prado TZ/TX 4x4 or Hilux 4x4 with low-range gear is strongly recommended.
- Driver Tip: Always travel with local mountain drivers who know unpredictable weather, water crossings, and high-altitude engine tuning.
(Note: Real-time AI analysis service returned: ${error.message || 'Verification Mode'})`;

    return res.status(200).json({
      success: true,
      analysis: fallbackMessage,
      modelUsed: 'gemini-4-argon (local advisory fallback)',
      isFallback: true,
      errorDetail: error.message,
    });
  }
});

// Booking Inquiry API endpoint
app.post('/api/inquiries', (req, res) => {
  const inquiry = req.body;
  const inquiryId = 'MRAC-' + Math.floor(100000 + Math.random() * 900000);
  
  // Format WhatsApp message
  const text = `*New Booking Inquiry #${inquiryId} - Malik Rent A Car*\n` +
    `👤 Name: ${inquiry.name || 'Valued Guest'}\n` +
    `📞 Phone: ${inquiry.phone || 'N/A'}\n` +
    `🚘 Car: ${inquiry.carName || 'Custom Request'}\n` +
    `📍 Pick-up: ${inquiry.pickupLocation || 'Gilgit'}\n` +
    `🏁 Drop-off: ${inquiry.dropoffLocation || 'Gilgit'}\n` +
    `📅 Dates: ${inquiry.startDate || 'TBD'} to ${inquiry.endDate || 'TBD'}\n` +
    `👨‍✈️ Driver: ${inquiry.withDriver ? 'With Professional Driver' : 'Self-Drive'}\n` +
    `👥 Passengers: ${inquiry.passengers || '1-4'}\n` +
    `💬 Notes: ${inquiry.message || 'Please confirm availability and best package price.'}`;

  const whatsappUrl = `https://wa.me/923179236600?text=${encodeURIComponent(text)}`;

  return res.json({
    success: true,
    inquiryId,
    receivedAt: new Date().toISOString(),
    whatsappUrl,
    message: 'Inquiry registered successfully. Connecting to WhatsApp...',
  });
});

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Malik Rent A Car server running on port ${PORT}`);
  });
}

startServer();
