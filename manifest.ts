import { Manifest } from "deno-slack-sdk/mod.ts";
import { ChatGPTPromptDefinition } from "./functions/chatgpt_prompt.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "ChatGPT Function",
  description: "Send a prompt to OpenAI ChatGPT",
  icon: "assets/openai-logo.png",
  workflows: [],
  functions: [ChatGPTPromptDefinition],
  outgoingDomains: ["api.openai.com"],
  datastores: [],
  botScopes: [
    "datastore:read",
    "datastore:write",
  ],
});
