"use client";

import query from "@/lib/fetch";
import { useState, useEffect } from "react";

export function useSession() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [session, setSession] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      try {
        const { error, data } = await query.get<string>("auth");

        setSignedIn(error === null);
        setSession(data ?? null);
      } catch (error) {
        console.error("Session fetching error", error);
      } finally {
        setIsLoaded(true);
      }
    }
    fetchSession();
  }, []);

  return { isSignedIn, isLoaded, session };
}
