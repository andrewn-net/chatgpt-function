import {
  DefineDatastore,
  DefineFunction,
  Schema,
  SlackFunction,
} from "deno-slack-sdk/mod.ts";

// Define the datastore
export const ResponsesDatastore = DefineDatastore({
  name: "responses",
  primary_key: "id",
  attributes: {
    id: { type: Schema.types.string },
    prompt: { type: Schema.types.string },
    response: { type: Schema.types.string },
  },
});

export const ChatGPTPromptDefinition = DefineFunction({
  callback_id: "chatgpt_prompt",
  title: "Send prompt to ChatGPT",
  description: "Send a prompt to OpenAI ChatGPT",
  source_file: "functions/chatgpt_prompt.ts",
  input_parameters: {
    properties: {
      apiKey: {
        type: Schema.types.string,
        description: "OpenAI API key",
      },
      promptText: {
        type: Schema.types.string,
        description: "Prompt to be sent",
      },
    },
    required: ["apiKey", "promptText"],
  },
  output_parameters: {
    properties: {
      responseText: {
        type: Schema.types.string,
        description: "Response text from OpenAI",
      },
    },
    required: ["responseText"],
  },
});

export default SlackFunction(
  ChatGPTPromptDefinition,
  async ({ inputs, client }) => {
    try {
      const apiKey = inputs.apiKey;
      const promptText = inputs.promptText;

      const openAIResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: promptText }],
            max_tokens: 50,
          }),
        },
      );

      if (!openAIResponse.ok) {
        throw new Error(
          `Failed to call OpenAI API. Status Code: ${openAIResponse.status}`,
        );
      }

      const responseData = await openAIResponse.json();
      const completionMessage = responseData.choices[0].message.content;
      console.log(`Completion: ${completionMessage}`);

      // Store the response in the datastore
      const responseId = crypto.randomUUID();
      await client.apps.datastore.put({
        datastore: ResponsesDatastore.name,
        item: {
          id: responseId,
          prompt: promptText,
          response: completionMessage,
        },
      });

      // Return the actual response content
      return { outputs: { responseText: completionMessage } };
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  },
);
