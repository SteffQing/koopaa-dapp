import { WhatsAppClient } from "whatsapp-client-sdk";

const client = new WhatsAppClient({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!,
  webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_TOKEN,
});

async function verifySetup() {
  try {
    const isConnected = await client.testConnection();

    if (isConnected) {
      console.log("✅ WhatsApp API connection successful");

      const config = client.getConfig();
      console.log("📋 Configuration:", config);
    } else {
      console.log("❌ WhatsApp API connection failed");
    }
  } catch (error) {
    console.error("🚨 Setup error:", (error as Error).message);
  }
}

const testNumber = "2349033367605";
async function sendTestMessage() {
  try {
    const response = await client.sendText(testNumber, "🎉 Hello from WhatsApp Client SDK!");
    console.log("✅ Test message sent:", response);
  } catch (error) {
    console.error("❌ Failed to send test message:", (error as Error).message);
  }
}

async function sendTestMessageWithButtons() {
  try {
    const buttonResponse = await client.sendButtons(
      testNumber,
      "Welcome to the WhatsApp Client SDK! What would you like to explore?",
      [
        { id: "docs", title: "📚 Documentation" },
        { id: "examples", title: "💡 Examples" },
        { id: "support", title: "🛟 Support" },
      ],
      {
        header: { type: "text", text: "🚀 Getting Started" },
        footer: "Choose an option to continue",
      }
    );

    console.log("🔘 Button message sent:", buttonResponse.messageId);
  } catch (error) {
    console.error(error);
  }
}

async function sendTestImage() {
  try {
    const imageResponse = await client.sendImage(testNumber, {
      link: "https://via.placeholder.com/400x300/25D366/FFFFFF?text=WhatsApp+SDK",
      caption: "📸 This image was sent using the WhatsApp Client SDK!",
    });

    console.log("🖼️ Image message sent:", imageResponse.messageId);
  } catch (error) {
    console.error(error);
  }
}

async function sendTestMessageWithList() {
  try {
    await client.sendList(testNumber, "Select a category:", "View Options", [
      {
        title: "Main Category",
        rows: [
          { id: "item1", title: "Item 1", description: "First item" },
          { id: "item2", title: "Item 2", description: "Second item" },
        ],
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}

export default client;

(async () => {
  await verifySetup();
  await sendTestImage();
  await sendTestMessageWithList();
  await sendTestMessageWithButtons();
  await sendTestMessage();
})();
