import OpenAI from "openai";
import { API_KEY } from "../../constants.ts";

interface ResponderOptions {
  model?: "gpt-4o" | "gpt-3.5-turbo";
  instructions?: string;
}

export class Responder {
  private readonly openai: OpenAI;
  private readonly options: Required<ResponderOptions>;

  constructor(options: ResponderOptions = {}) {
    // console.log("key", API_KEY);
    this.openai = new OpenAI({ apiKey: API_KEY });
    this.options = {
      model: "gpt-4o",
      instructions:
        "You are heavily inspired by Jarvis from Iron Man, embodying an intelligent, helpful, playful, and sharp personality with a decent amount of wit, maintaining a dry sense of humor while avoiding being too formal or robotic. Keep responses very concise and conversational as they will be spoken aloud. Don't bother writing out any formatting since everything is purely conversational. The user will never see anything you write down.",
      ...options,
    };
  }

  /**
   * Generates response text from input text
   * @param {*} query <string>
   * @returns <string>
   */
  async GenerateResponse(query: string) {
    try {
      const response = await this.openai.responses.create({
        model: this.options.model,
        instructions: this.options.instructions,
        input: query,
      });
      return response.output_text;
    } catch (error) {
      console.error("Error calling ChatGPT:", error);
      return "I'm sorry, I'm having trouble connecting to my systems right now.";
    }
  }
}
