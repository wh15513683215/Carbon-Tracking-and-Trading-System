import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateReportContent = async (input) => {
  const gptResponse = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert in generating carbon emission reports.",
      },
      {
        role: "user",
        content: `Generate a detailed carbon emission report based on the following input data: ${input}`,
      },
    ],
  });

  return gptResponse.data.choices[0].message.content;
};
