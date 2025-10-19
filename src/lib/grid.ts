import { GridClient } from "@sqds/grid";

const gridClient = new GridClient({
  environment: "sandbox",
  apiKey: process.env.GRID_SANDBOX_KEY!,
  baseUrl: "https://grid.squads.xyz",
});
