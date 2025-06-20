const NOVU_SECRET_KEY = process.env.NOVU_SECRET_KEY;

export default async function NovuWelcome(address: string) {
  const url = "https://api.novu.co/v1/events/trigger";

  const options = {
    method: "POST",
    headers: {
      Authorization: "ApiKey " + NOVU_SECRET_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "welcome",
      to: {
        subscriberId: address,
      },
      payload: {},
    }),
  };

  await fetch(url, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
