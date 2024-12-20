import { pipeline } from '@xenova/transformers';

let model: any = null;

export async function initializeLLM() {
  if (!model) {
    model = await pipeline('text2text-generation', 'Xenova/T5-small');
  }
  return model;
}

export async function generateResponse(
  query: string,
  relevantChunks: string[]
): Promise<string> {
  const model = await initializeLLM();
  
  const context = relevantChunks.join('\n\n');
  const prompt = `
    Context: ${context}
    
    Question: ${query}
    
    Answer the question based on the context provided. If the answer cannot be found in the context, say "I cannot answer this question based on the available information."
    
    Answer:
  `;

  const output = await model(prompt, {
    max_length: 150,
    temperature: 0.7,
  });

  return output[0].generated_text;
}