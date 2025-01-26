"use client";

import React, { useState } from "react";
import { ToggleButton } from "@/components/ToggleButton";
import Image from "next/image";
import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="flex h-screen w-screen overflow-hidden relative flex-col bg-white rounded-xl">
      <div className="flex w-full h-full max-md:flex-col max-md:overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <Image
            loading="lazy"
            src="/images/suomaya.avif"
            height={1000}
            width={1000}
            alt="Login background"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col items-center justify-center p-12 bg-white max-md:px-5 max-md:flex-1">
          <div className="flex flex-col w-full max-w-md">
            <div className="flex gap-10 items-center justify-between w-full text-xs font-medium tracking-wide leading-loose text-center">
              <Image
                loading="lazy"
                src="/images/itransition_logo.svg"
                height={1000}
                width={100}
                alt="Itransition logo"
                className="object-contain shrink-0 self-stretch"
              />
              <div className="flex items-start self-stretch p-0.5 my-auto rounded-lg border-solid bg-neutral-200 border-[0.5px] border-stone-300 border-opacity-30">
                <ToggleButton
                  text="Sign in"
                  isActive={activeTab === "signin"}
                  onClick={() => setActiveTab("signin")}
                />
                <ToggleButton
                  text="Sign up"
                  isActive={activeTab === "signup"}
                  onClick={() => setActiveTab("signup")}
                />
              </div>
            </div>

            {activeTab === "signin" ? <SignInForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-12 z-0 h-4 text-xs tracking-tight leading-none text-white underline decoration-auto decoration-solid underline-offset-auto">
        <span className="text-white">Photo by </span>
        <a
          href="https://unsplash.com/@yulissatagle"
          className="text-white underline"
          rel="noopener noreferrer"
        >
          Yulissa Tagle
        </a>
      </div>
    </div>
  );
}
