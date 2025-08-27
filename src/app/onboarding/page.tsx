"use client";
import React, { useState } from "react";
import AnimatedLogo from "../components/ui/AnimatedLogo";
import LikesForm from "../components/onboarding/LikesForm";
import DislikesForm from "../components/onboarding/DislikesForm";
import AccountForm from "../components/onboarding/AccountForm";

export default function OnboardingPage() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [currStep, setCurrStep] = useState(0);
  return (
    <div className="flex items-center justify-center min-h-screen">
      {showAnimation ? (
        <AnimatedLogo onComplete={() => setShowAnimation(false)} />
      ) : (
        <>
          {currStep === 0 && <LikesForm setCurrStep={setCurrStep} />}
          {currStep === 1 && <DislikesForm setCurrStep={setCurrStep} />}
          {currStep === 2 && <AccountForm setCurrStep={setCurrStep} />}
        </>
      )}
    </div>
  );
}
