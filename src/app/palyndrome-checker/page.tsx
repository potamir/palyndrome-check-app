"use client";
import { defaultWord } from "@/helpers/constant";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PalyndromeChecker() {
  const [paragraph, setParagraph] = useState<string>("");
  const [listOfPalyndrome, setListOfPalyndrome] = useState<string[]>([]);

  const extractPalindromes = (paragraph: string) => {
    function isPalindrome(str: string) {
      /* Remove non alphanumeric before checking the palyndrome */
      const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
      return cleaned === cleaned.split("").reverse().join("");
    }
    /* REGEX: Replace new line with space */
    const cleanedParagraph = paragraph.replace(/\n/g, " ");
    /* REGEX: Find word and phrases then put it on array */
    const wordsAndPhrases = cleanedParagraph.match(/[\w']+|".+?"/g) || [];
    const palindromes: Array<string> = [];
    //
    for (const text of wordsAndPhrases) {
      if (text?.length > 1) {
        /* REGEX: Remove string quootation from the wording or pharases */
        const cleanedText = text.replace(/['"]+/g, "");
        if (isPalindrome(cleanedText)) {
          palindromes.push(cleanedText);
        }
      }
    }
    setListOfPalyndrome(palindromes);
  };

  const checkPalyndrome = () => {
    extractPalindromes(paragraph);
  };

  const checkWithTestCase = () => {
    extractPalindromes(defaultWord);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/palyndrome-checker"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Palyndrome Checker
        </Link>
        <Link
          href="/stock"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Stock
        </Link>
        <Link
          href="/my-orders"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          My Orders
        </Link>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-start sm:items-start">
        <textarea
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          rows={5}
          placeholder="Enter your text here..."
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        />
        <button
          className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={checkPalyndrome}
        >
          Check
        </button>
        <button
          className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={checkWithTestCase}
        >
          Check With Test Case
        </button>
        {listOfPalyndrome?.length > 0 ? (
          <div>
            <h5>List of Palyndrome Words/Pharases:</h5>
            <ul className="marker:text-white list-disc">
              {listOfPalyndrome.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}