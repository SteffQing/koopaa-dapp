import { useState, useEffect } from "react";
import { User } from "../../prisma-client";
import { toast } from "sonner";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.ok && res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const updateUserProfile = async (updates: Partial<User>) => {
    try {
      setPending(true);
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
      toast.success("Profile updated successfully");
      return updatedUser;
    } catch (error) {
      toast.error("Failed to update profile");
      throw error;
    } finally {
      setPending(false);
    }
  };

  return { user, loading, updateUserProfile, pending };
}
