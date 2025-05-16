"use client";
import { Input } from "@/components/ui/input";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface EditFieldProps {
  label: string;
  value: string;
  onSave: (value: string) => Promise<void>;
  disabled?: boolean;
}

export function EditField({
  label,
  value,
  onSave,
  disabled = false,
}: EditFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (inputValue === value) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(inputValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save:", error);
      setInputValue(value);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  return (
    <div className="py-4 border-b border-[#C4C4C4] flex justify-between items-center">
      <p className="text-[#121212] font-medium text-xs">{label}</p>

      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-8 text-xs w-[150px] focus-visible:ring-0"
            autoFocus
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isLoading}
            className="text-green-600"
          >
            <Check size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            disabled={isLoading}
            className="text-red-600"
          >
            <X size={16} />
          </motion.button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <p className="font-normal text-[#4C4C4C] text-xs">{value}</p>
          {!disabled && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="text-[#9D6D4C]"
            >
              <Pencil size={14} />
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
