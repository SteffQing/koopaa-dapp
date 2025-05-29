"use client";

import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { useAuthUser } from "./useUser";
import { toast } from "sonner";

interface UserSettings {
  notificationsEnabled: boolean;
  showBalances: boolean;
  interestEnabled: boolean;
  emergencyExit: boolean;
}

const STORAGE_KEY = "koopaa_user_settings";

const defaultSettings: UserSettings = {
  notificationsEnabled: false,
  showBalances: false,
  interestEnabled: false,
  emergencyExit: false,
};

export const useUserSettings = () => {
  const { user } = useAuthUser();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadSettings = (): UserSettings => {
    if (typeof window === "undefined") return defaultSettings;
    if (!user?.address) return defaultSettings;

    try {
      const allSettings = localStorage.getItem(STORAGE_KEY);
      if (!allSettings) return defaultSettings;

      const parsedSettings = JSON.parse(allSettings);
      return parsedSettings[user.address] || defaultSettings;
    } catch (error) {
      console.error("Error reading user settings:", error);
      return defaultSettings;
    }
  };

  const saveSettings = (newSettings: UserSettings): void => {
    if (typeof window === "undefined") return;
    if (!user?.address) return;

    const userId = user.address;

    try {
      const allSettings = localStorage.getItem(STORAGE_KEY);
      const parsedSettings = allSettings ? JSON.parse(allSettings) : {};

      parsedSettings[userId] = newSettings;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedSettings));
    } catch (error) {
      console.error("Error saving user settings:", error);
    }
  };

  // Initialize on mount
  useEffect(() => {
    const userSettings = loadSettings();
    setSettings(userSettings);
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.address]);

  // Generic update function
  const updateSetting = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Helper function to resolve SetStateAction
  const resolveSetStateAction = (
    action: SetStateAction<boolean>,
    currentValue: boolean
  ): boolean => {
    return typeof action === "function" ? action(currentValue) : action;
  };

  // Individual setting states and setters with toast notifications
  const notificationsEnabled = settings.notificationsEnabled;
  const setNotificationsEnabled: Dispatch<SetStateAction<boolean>> = (
    action
  ) => {
    const value = resolveSetStateAction(action, notificationsEnabled);
    updateSetting("notificationsEnabled", value);
    toast.success(
      value ? "🔔 Notifications enabled" : "🔕 Notifications disabled",
      {
        description: value
          ? "You'll receive important updates and alerts"
          : "You won't receive any notifications",
      }
    );
  };

  const showBalances = settings.showBalances;
  const setShowBalances: Dispatch<SetStateAction<boolean>> = (action) => {
    const value = resolveSetStateAction(action, notificationsEnabled);

    updateSetting("showBalances", value);
    toast.success(
      value ? "👁️ Dashboard balances shown" : "🙈 Dashboard balances hidden",
      {
        description: value
          ? "Your account balances are now visible on the dashboard"
          : "Your account balances are now hidden from the dashboard",
      }
    );
  };

  const interestEnabled = settings.interestEnabled;
  const setInterestEnabled: Dispatch<SetStateAction<boolean>> = (action) => {
    const value = resolveSetStateAction(action, notificationsEnabled);

    updateSetting("interestEnabled", value);
    toast.success(
      value
        ? "💰 DEFI yield interest enabled"
        : "⏸️ DEFI yield interest disabled",
      {
        description: value
          ? "You'll now earn interest on your Ajo Savings"
          : "Interest earning on Ajo Savings is paused",
      }
    );
  };

  const emergencyExit = settings.emergencyExit;
  const setEmergencyExit: Dispatch<SetStateAction<boolean>> = (action) => {
    const value = resolveSetStateAction(action, notificationsEnabled);

    updateSetting("emergencyExit", value);
    toast.success(
      value ? "🚨 Emergency exit enabled" : "🔒 Emergency exit disabled",
      {
        description: value
          ? "Quick exit option is now available for emergencies"
          : "Emergency exit option has been disabled",
      }
    );
  };

  // Export individual settings as objects for easier destructuring
  const notificationsEnabledState = {
    state: notificationsEnabled,
    setState: setNotificationsEnabled,
  };

  const showBalancesState = {
    state: showBalances,
    setState: setShowBalances,
  };

  const interestEnabledState = {
    state: interestEnabled,
    setState: setInterestEnabled,
  };

  const emergencyExitState = {
    state: emergencyExit,
    setState: setEmergencyExit,
  };

  return {
    // Original exports
    settings,
    isLoaded,

    // State objects for easier destructuring
    notificationsEnabledState,
    showBalancesState,
    interestEnabledState,
    emergencyExitState,
  };
};
