import "next/server";

declare module "next/server" {
  interface NextRequest {
    user?: {
      address: string;
      [key: string]: any;
    };
  }
}
