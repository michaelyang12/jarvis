import OpenAI from "openai";
import { playAudio } from "openai/helpers/audio.mjs";
import { API_KEY } from "../../constants.ts";

interface TextToSpeechOptions {
  model?: string;
  voice?: "alloy" | "ash" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
  instructions?: string;
  response_format?: "wav" | "mp3" | "opus" | "aac" | "flac" | "pcm" | undefined;
}

export class TextToSpeech {
  private readonly openai: OpenAI;
  private readonly options: Required<TextToSpeechOptions>;

  constructor(options: TextToSpeechOptions = {}) {
    this.openai = new OpenAI({ apiKey: API_KEY });
    this.options = {
      model: "gpt-4o-mini-tts",
      voice: "ash",
      instructions:
        "Speak like Jarvis from the Iron Man and Marvel movies. Keep your tone extremely chill and casual. Speak quickly though.",
      response_format: "wav",
      ...options,
    };
  }

  /**
   * Reads input text as speech using specific model and instructions
   * @param text <string> - The input text to convert to speech
   * @returns void
   */
  async GenerateResponse(text: string): Promise<void> {
    // Ensure speechResponse type is inferred correctly
    const speechResponse = await this.openai.audio.speech.create({
      model: this.options.model,
      voice: this.options.voice,
      input: text,
      instructions: this.options.instructions,
      response_format: this.options.response_format,
    });

    // Assuming playAudio accepts the correct type
    await playAudio(speechResponse);
  }
}
