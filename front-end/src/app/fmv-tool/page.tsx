"use client";

import React, { useState } from "react";
import { Dropdown } from "@/components"; // For Dropdown component
import { Button, Text } from "@/components"; // Namespace imports for Button and Text
import { FMV } from "@/api"; // API function for FMV calculation

const FMVToolPage = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [tiering, setTiering] = useState<string>("");
  const [fmv, setFMV] = useState<number | null>(null); // FMV result state
  const [error, setError] = useState<string | null>(null); // Error state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleGetFMV = async () => {
    // Validate required fields
    if (!country || !jobPosition || !tiering) {
      setError("Please fill out all fields before submitting.");
      return;
    }
    setError(null); // Clear previous errors
    setIsLoading(true);

    try {
      const response = await FMV.calculateFMV({
        country,
        jobPosition,
        tiering,
      });
      setFMV(response.fmv);
    } catch (err) {
      setError("Failed to calculate FMV. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    // Resetting to initial state
    setCountry(null);
    setJobPosition("");
    setTiering("");
    setFMV(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Centered Title */}
      <h1 className="text-2xl font-bold text-black text-center mb-6">FMV Tool</h1>

      <div className="space-y-6">
        {/* Country Dropdown */}
        <Dropdown
          text={country || "Select a Country"}
          className="w-full text-black" // Dropdown text is black
          svgLeft={null}
          options={["USA", "Canada", "Mexico"]}
          onSelect={(value) => setCountry(value)}
        />

        {/* Input for Job Position */}
        <div>
          <label htmlFor="job" className="block text-sm font-medium text-black mb-2">
            Write a Job Position
          </label>
          <input
            id="job"
            type="text"
            value={jobPosition}
            onChange={(e) => setJobPosition(e.target.value)}
            placeholder="Enter job position"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-black"
          />
        </div>

        {/* Tiering Dropdown */}
        <Dropdown
          text={tiering || "Select a Tier"}
          className="w-full text-black" // Dropdown text is black
          svgLeft={null}
          options={["1", "2", "3"]}
          onSelect={(value) => setTiering(value)}
        />

        {/* Buttons */}
        <div className="flex space-x-4">
          <Button.PrimaryBig className="px-6" onClick={handleGetFMV} disabled={isLoading}>
            {isLoading ? "Loading..." : "Get FMV"}
          </Button.PrimaryBig>
          <Button.SecondarySmall className="px-4" onClick={handleReset}>
            Reset
          </Button.SecondarySmall>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* FMV Result */}
      {fmv !== null && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-50 text-center">
          <p className="text-2xl font-bold text-green-600">${fmv.toFixed(2)}</p>
          <p className="text-sm text-gray-600">
            Range: ${((fmv - fmv * 0.1).toFixed(2)).toLocaleString()} - ${((fmv + fmv * 0.1).toFixed(2)).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default FMVToolPage;
