"use server";

const BOT_TOKEN = process.env.BOT_TOKEN;

async function sendTelegramMessage(text: string, to: string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({
    chat_id: to,
    text: text,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  }).then((res) => res.json());

  return response;
  // Need to throw response if it fails to deliver
}

async function sendWhatsappMessage(text: string, to: string) {
  console.log(text, to)
}

export default async function sendExternalMessage(text: string, to: string) {
  try {
    await sendTelegramMessage(text, to);
  } catch (error) {
    console.error(error)
    await sendWhatsappMessage(text, to);
  }
}
