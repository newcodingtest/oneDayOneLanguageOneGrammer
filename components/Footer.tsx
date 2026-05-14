// components/Footer.tsx

import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-10 lg:mt-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-5 lg:py-6 text-center text-gray-600 text-xs sm:text-sm">
        <p>매일 하나씩 영어 문법을 마스터하세요 📚</p>

        <nav className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
          <Link href="/about" className="hover:text-gray-800 hover:underline">
            About
          </Link>
          <Link href="/privacy" className="hover:text-gray-800 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-gray-800 hover:underline">
            Contact
          </Link>
        </nav>

        <p className="text-xs text-gray-500 mt-3">Powered by Grammar</p>
      </div>
    </footer>
  );
}