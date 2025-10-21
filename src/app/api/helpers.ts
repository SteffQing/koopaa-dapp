async function generateShortCode(url: string, length = 10): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64 = btoa(String.fromCharCode(...hashArray)).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  return base64.slice(0, length);
}

const TTL = 7 * 24 * 60 * 60;

export { generateShortCode, TTL };
