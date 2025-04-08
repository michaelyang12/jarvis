import readline from "readline";
import { Responder } from "./core/responder/responder.ts";
import { TextToSpeech } from "./core/tts/tts.ts";

const run = async () => {
  const rl = readline.createInterface({
    input: process.stdin as any,
    output: process.stdout as any,
  });

  while (true) {
    const ask = (question: string) =>
      new Promise((resolve) => rl.question(question, resolve));

    const prompt: string = await ask("> ");

    if (prompt.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      break; // Exit the loop and close the interface
    }

    console.log(`You asked: ${prompt}`);
    const textResponse = await new Responder().GenerateResponse(prompt);
    console.log("Response: ", textResponse);
    await new TextToSpeech().GenerateResponse(textResponse);
  }
};

run();
