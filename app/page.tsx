'use client'

import { useState } from 'react'
import Link from "next/link";
import Header from "@/app/components/Header";

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "What is STEPTIONS?",
      answer: "STEPTIONS is a decentralized options trading platform offering advanced features for trading, liquidity provision, and portfolio management."
    },
    {
      question: "How do I earn rewards?",
      answer: "You can earn rewards by providing liquidity to options markets. Rewards are based on the APY and lockup period of the liquidity pools."
    },
    {
      question: "What assets are supported?",
      answer: "STEPTIONS supports leading cryptocurrencies such as Bitcoin, Ethereum, and more."
    },
    {
      question: "Is STEPTIONS secure?",
      answer: "Yes, STEPTIONS uses advanced security protocols and smart contract audits to ensure the safety of your funds and trading activities."
    },
    {
      question: "How do I get started?",
      answer: "Simply click 'Open App' in the header, connect your wallet, and start trading options or providing liquidity to earn rewards."
    }
  ]

  return (
    <div className="bg-white text-gray-900 font-sans">
      <Header />
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-blue-600 to-orange-500 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Welcome to STEPTIONS</h1>
        <p className="text-lg md:text-xl font-medium max-w-3xl mx-auto mb-8">
          Revolutionizing options trading with advanced liquidity solutions and professional portfolio management.
        </p>
        <div className="space-y-4">
          <p className="text-xl font-bold">Ready to start trading options?</p>
          <p className="text-lg">Join thousands of traders already using STEPTIONS for professional options trading.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">About STEPTIONS</h2>
          <p className="text-lg text-gray-700 mb-8">
            STEPTIONS is a decentralized options trading platform designed for traders of all levels. We offer seamless trading, reward-driven liquidity pools, and powerful portfolio tools to help you manage your investments professionally.
          </p>
          <img
            src="/examples.png"
            alt="Trading illustration"
            className="rounded-lg shadow-md mx-auto"
          />
        </div>
      </section>

      {/* What Options Are */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">What Are Options?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Options are financial instruments that give you the right to buy or sell an asset at a predetermined price before a specific date. With STEPTIONS, trade call and put options on leading cryptocurrencies and maximize your trading potential.
          </p>
          <img
            src="/how-option.png"
            alt="Trading illustration"
            className="rounded-lg shadow-md mx-auto"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-4">Step 1: Trade Options</h3>
              <p className="text-gray-700">Choose call or put options and customize trading parameters to suit your strategy.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-4">Step 2: Provide Liquidity</h3>
              <p className="text-gray-700">Earn rewards by providing liquidity to options markets with flexible lockup periods.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-4">Step 3: Manage Portfolio</h3>
              <p className="text-gray-700">Track positions, monitor P&L, and optimize your investments with professional tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-700 mb-8">STEPTIONS is built by a team of experienced developers, traders, and blockchain enthusiasts committed to revolutionizing options trading.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <img
                src="/team/romi.jpg"
                alt="Romi"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Romi</h3>
              <p className="text-gray-700">Web3 Specialist</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <img
                src="/team/murphy.jpeg"
                alt="Murphy"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Murphy</h3>
              <p className="text-gray-700">Fronted Developer</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <img
                src="/team/filip.jpeg"
                alt="Filip"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Filip</h3>
              <p className="text-gray-700">Smart Contract Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bug Bounty */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Join Our Bug Bounty Program</h2>
          <p className="text-lg text-gray-700 mb-8">Help us maintain the security and integrity of STEPTIONS. Earn rewards for identifying and reporting vulnerabilities.</p>
          <button className="btn-primary px-8 py-4 font-bold text-lg rounded-lg hover:shadow-lg transition-all">
            Learn More
          </button>
        </div>
      </section>

      {/* Newsletter & Socials */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Stay Updated</h2>
          <p className="text-lg text-gray-700 mb-8">Subscribe to our newsletter and follow us on social media for the latest updates and news.</p>
          <div className="space-y-4">
            <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="btn-primary px-8 py-4 font-bold text-lg rounded-lg hover:shadow-lg transition-all">
              Subscribe
            </button>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.59-2.47.69.89-.53 1.57-1.37 1.89-2.37-.83.49-1.75.85-2.73 1.05A4.92 4.92 0 0016.1 4c-2.73 0-4.94 2.21-4.94 4.92 0 .39.04.77.12 1.13C7.69 9.86 5.1 8.2 3.59 5.91c-.43.74-.67 1.59-.67 2.5 0 1.73.88 3.26 2.22 4.15-.82-.03-1.58-.25-2.26-.63v.06c0 2.42 1.72 4.44 4 4.9-.42.12-.86.18-1.31.18-.32 0-.63-.03-.93-.08.63 1.97 2.45 3.41 4.6 3.45-1.69 1.33-3.81 2.13-6.13 2.13-.4 0-.79-.02-1.18-.07 2.18 1.4 4.76 2.21 7.54 2.21 9.05 0 14-7.5 14-13.99 0-.21 0-.42-.01-.63.95-.69 1.76-1.56 2.41-2.55z" />
              </svg>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c5.52 0 10 4.48 10 10 0 5.52-4.48 10-10 10-5.52 0-10-4.48-10-10 0-5.52 4.48-10 10-10zm0 1.92c-.28 0-.56.02-.83.05-.61.07-1.22.21-1.8.41-.58.2-1.14.47-1.67.77-.53.3-1.03.67-1.51 1.13-.48.46-.91.98-1.29 1.54-.38.56-.71 1.17-.98 2.02-.27.64-.47 1.32-.62 2.02-.14.7-.21 1.42-.21 2.15 0 .73.07 1.45.21 2.15.15.7.35 1.38.62 2.02.27.64.6 1.25.98 1.81.38.56.81 1.08 1.29 1.54.48.46.98.83 1.51 1.13.53.3 1.09.57 1.67.77.58.2 1.19.34 1.8.41.27.03.55.05.83.05.76 0 1.52-.13 2.25-.38.73-.25 1.42-.6 2.07-1.06.65-.46 1.26-1.01 1.81-1.64.55-.63 1.03-1.31 1.44-2.03.41-.72.76-1.47 1.06-2.25.3-.78.54-1.58.71-2.4.17-.82.25-1.66.25-2.52 0-.86-.08-1.7-.25-2.52-.17-.82-.41-1.62-.71-2.4-.3-.78-.65-1.53-1.06-2.25-.41-.72-.89-1.4-1.44-2.03-.55-.63-1.16-1.18-1.81-1.64-.65-.46-1.34-.81-2.07-1.06-.73-.25-1.49-.38-2.25-.38zm0 3.65c2.51 0 4.55 2.04 4.55 4.55 0 2.51-2.04 4.55-4.55 4.55-2.51 0-4.55-2.04-4.55-4.55 0-2.51 2.04-4.55 4.55-4.55zm0 1.92c-1.45 0-2.63 1.18-2.63 2.63 0 1.45 1.18 2.63 2.63 2.63 1.45 0 2.63-1.18 2.63-2.63 0-1.45-1.18-2.63-2.63-2.63zm5.55-.94c-.48 0-.87.39-.87.87 0 .48.39.87.87.87.48 0 .87-.39.87-.87 0-.48-.39-.87-.87-.87z" />
              </svg>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2c1.79 0 3.25 1.46 3.25 3.25S9.54 8.5 7.75 8.5 4.5 7.04 4.5 5.25 5.96 2 7.75 2zm-3.5 8c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25v-8c0-.69-.56-1.25-1.25-1.25H4.25zm3.5 0c.69 0 1.25.56 1.25 1.25v8c0 .69-.56 1.25-1.25 1.25H4.25c-.69 0-1.25-.56-1.25-1.25v-8c0-.69.56-1.25 1.25-1.25h3.5z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}