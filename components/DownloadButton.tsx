"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import UpgradeModal from "./UpgradeModal";

interface DownloadButtonProps {
  exampleSlug: string;
}

export default function DownloadButton({ exampleSlug }: DownloadButtonProps) {
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState("");
  const [requiresUpgrade, setRequiresUpgrade] = useState(false);

  const handleDownload = async () => {
    if (!user) {
      setUpgradeMessage("Please sign in to download examples");
      setRequiresUpgrade(false);
      setShowUpgradeModal(true);
      return;
    }

    setDownloading(true);
    try {
      const response = await fetch(`/api/examples/${exampleSlug}/download`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setUpgradeMessage(data.message || "Please sign in to download");
          setRequiresUpgrade(false);
          setShowUpgradeModal(true);
        } else if (response.status === 403) {
          setUpgradeMessage(data.message || "This feature requires an upgrade");
          setRequiresUpgrade(data.requiresUpgrade || false);
          setShowUpgradeModal(true);
        }
      } else {
        // Trigger download
        if (data.downloadUrl) {
          const link = document.createElement("a");
          link.href = data.downloadUrl;
          link.download = `${data.example.title}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {
      console.error("Error downloading:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        message={upgradeMessage}
        requiresUpgrade={requiresUpgrade}
      />
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
      >
        {downloading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download Example</span>
          </>
        )}
      </button>
    </>
  );
}


