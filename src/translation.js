import axios from 'axios';

export async function translateText(text, sourceLang, targetLang) {
  try {
    const response = await axios.post('http://localhost:5000/translate', {
      q: text,          // Text to translate
      source: sourceLang, // Source language (e.g., 'en')
      target: targetLang, // Target language (e.g., 'ar')
      format: 'text',    // Format of the text
    });
    return response.data.translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
}
