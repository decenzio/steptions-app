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

          {/* Newsletter Subscription */}
          <div className="max-w-md mx-auto mb-12">
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full btn-primary px-8 py-4 font-bold text-lg rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 text-white hover:shadow-lg transition-all">
                Subscribe to Newsletter
              </button>
            </div>
          </div>

          {/* Contact & Social Media */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">

              {/* Email Contact */}
              <a
                href="mailto:hello@steptions.com"
                className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all group"
              >
                <div className="bg-gray-100 p-3 rounded-full group-hover:bg-gray-200 transition-colors">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Email Us</div>
                  <div className="text-sm text-gray-600">hello@steptions.com</div>
                </div>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/steptions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all group"
              >
                <div className="bg-black p-3 rounded-full group-hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Follow on X</div>
                  <div className="text-sm text-gray-600">@steptions</div>
                </div>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/steptions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all group"
              >
                <div className="bg-blue-500 p-3 rounded-full group-hover:bg-blue-600 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Join Telegram</div>
                  <div className="text-sm text-gray-600">@steptions</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}