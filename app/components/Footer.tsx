import React from "react";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="flex flex-col items-center justify-center bg-blue-900 py-12">
        <div className="container">
          <div className="w-full border-slate-700">
            <p className="font-medium text-sm text-slate-300 text-center mb-4">
                © Copyright 2025. All rights reserved.
            </p>
            <p className="font-medium text-xs text-slate-200 text-center">
              Made by{" "}
              <a
                href="https://www.instagram.com/jessen_/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary"
              >
                Jessen
              </a>
              , using{" "}
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 font-bold"
              >
                Next.js
              </a>{" "}
              and{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 font-bold"
              >
                Tailwind CSS
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
