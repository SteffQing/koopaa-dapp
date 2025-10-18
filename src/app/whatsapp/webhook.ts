import { ProcessedIncomingMessage } from "whatsapp-client-sdk";
import client from "./client";

const webhookProcessor = client.createWebhookProcessor({
  onTextMessage: async (message) => {
    const { text, from, id } = message as ProcessedIncomingMessage;
    console.log(message, "MSG");

    await client.sendText(from, `Echo: ${text}`);
    await client.markMessageAsRead(id);
  },

  onError: async (error) => {
    console.error("Webhook error:", error);
  },

  onButtonClick: async (message) => {
    const { from, interactive } = message as ProcessedIncomingMessage;
    console.log(message, "BTN MSG");
    await client.sendText(from, `Button received: ${interactive?.button_id}`);
  },
});

export default webhookProcessor;
