"use server";

const TG_CHAT = process.env.TG_CHAT;
const BOT_TOKEN = process.env.BOT_TOKEN;

export default function sendMessage(text: string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({
    chat_id: TG_CHAT,
    text: text,
  });

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
}
