"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "./src/components/Navigation";

export default function Home() {
  const [typingText, setTypingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const words = ["Modern", "Efficient", "Smart", "Advanced"];
  const typingSpeed = 150;
  const pauseDuration = 2000;

  useEffect(() => {
    const typeText = () => {
      const currentWord = words[currentIndex];
      if (typingText.length < currentWord.length) {
        setTypingText(currentWord.slice(0, typingText.length + 1));
      } else {
        setTimeout(() => {
          setTypingText("");
          setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, pauseDuration);
      }
    };

    const timer = setTimeout(typeText, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, currentIndex]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
            Translation Manager
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--text-muted)]">
            A <span className="text-[var(--primary)]">{typingText}</span>
            <span className="animate-pulse"> |</span> Solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)] after:rounded">
              About the Project
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              A powerful translation management system designed to streamline
              your localization workflow. Manage multiple languages, track
              changes, and maintain consistency across your applications.
            </p>
          </div>

          <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)] after:rounded">
              Key Features
            </h2>
            <ul className="space-y-3 text-[var(--text-muted)]">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-3"></span>
                Write end to end test
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-3"></span>
                Real-time updates
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-3"></span>
                Drag-and-drop interface
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-3"></span>
                Version control
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-3"></span>
                Multi-language support
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 mb-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)] after:rounded">
            Technical Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((tech) => (
              <div
                key={tech}
                className="bg-[var(--secondary)] border border-[var(--border)] rounded-lg p-4 text-center transition-all hover:border-[var(--primary)]"
              >
                <p className="text-[var(--foreground)] font-medium">{tech}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-block bg-[var(--primary)] text-[var(--background)] px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:bg-[var(--primary-light)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50"
          >
            Launch Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
