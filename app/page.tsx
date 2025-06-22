"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is STEPTIONS?",
      answer:
        "STEPTIONS is a decentralized options trading platform offering advanced features for trading, liquidity provision, and portfolio management.",
    },
    {
      question: "How do I earn rewards?",
      answer:
        "You can earn rewards by providing liquidity to options markets. Rewards are based on the APY and lockup period of the liquidity pools.",
    },
    {
      question: "What assets are supported?",
      answer:
        "STEPTIONS supports leading cryptocurrencies such as Bitcoin, Ethereum, and more.",
    },
    {
      question: "Is STEPTIONS secure?",
      answer:
        "Yes, STEPTIONS uses advanced security protocols and smart contract audits to ensure the safety of your funds and trading activities.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply click 'Open App' in the header, connect your wallet, and start trading options or providing liquidity to earn rewards.",
    },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      <Header />
      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-br from-blue-600 to-orange-500 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Welcome to STEPTIONS
          </h1>
          <p className="text-lg md:text-xl font-normal mb-8 max-w-4xl mx-auto leading-relaxed">
            The First Options Protocol on Stellar. Insure any asset. Hedge price
            risk. Earn yield.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            About STEPTIONS
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            STEPTIONS, a decentralized options platform built for beginners and
            pros alike. Enjoy smooth trading, earn from liquidity pools, and
            manage your portfolio with confidence.
          </p>
          <img
            src="/examples.png"
            alt="Trading illustration"
            className="border-2 border-gray-500 rounded-xl shadow-lg mx-auto max-w-full"
          />
        </div>
      </section>

      {/* What Options Are */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            What Are Options?
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Options are financial instruments that give you the right to buy or
            sell an asset at a predetermined price before a specific date. With
            STEPTIONS, trade call and put options on leading assets.
          </p>
          <img
            src="/how-option.png"
            alt="Trading illustration"
            className="border-2 border-gray-500 rounded-xl shadow-lg mx-auto max-w-full"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-500 p-6 rounded-xl shadow-md  bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="mb-4 text-xl">
                  Step 1: Trade Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-base leading-relaxed">
                  Choose call or put options and customize trading parameters to
                  suit your strategy.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-500 p-6 rounded-xl shadow-md  bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="mb-4 text-xl">
                  Step 2: Provide Liquidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-base leading-relaxed">
                  Earn rewards by providing liquidity to options markets with
                  flexible lockup periods.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-500 p-6 rounded-xl shadow-md  bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="mb-4 text-xl">
                  Step 3: Manage Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-base leading-relaxed">
                  Track positions, monitor P&L, and optimize your investments
                  with professional tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-2 border-gray-500 bg-white rounded-xl shadow-md  px-6 py-2"
              >
                <AccordionTrigger className=" text-lg font-semibold text-gray-900 hover:text-blue-600 py-4 focus:outline-none">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Meet Our Team</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            STEPTIONS is built by a team of experienced developers, traders, and
            blockchain enthusiasts committed to revolutionizing options trading.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center rounded-xl shadow-md border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent>
                <img
                  src="/team/romi.jpg"
                  alt="Romi"
                  className="rounded-full mx-auto mb-6 w-32 h-32 object-cover shadow-md"
                />
                <h3 className="text-xl font-bold mb-2">Romi</h3>
                <p className="text-gray-700 text-base">Web3 Specialist</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center rounded-xl shadow-md border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent>
                <img
                  src="/team/murphy.jpeg"
                  alt="Murphy"
                  className="rounded-full mx-auto mb-6 w-32 h-32 object-cover shadow-md"
                />
                <h3 className="text-xl font-bold mb-2">Murphy</h3>
                <p className="text-gray-700 text-base">Frontend Developer</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center rounded-xl shadow-md border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent>
                <img
                  src="/team/filip.jpeg"
                  alt="Filip"
                  className="rounded-full mx-auto mb-6 w-32 h-32 object-cover shadow-md"
                />
                <h3 className="text-xl font-bold mb-2">Filip</h3>
                <p className="text-gray-700 text-base">
                  Smart Contract Developer
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bug Bounty */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Join Our Bug Bounty Program
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Help us maintain the security and integrity of STEPTIONS. Earn
            rewards for identifying and reporting vulnerabilities.
          </p>
          <Button size="lg" className="text-base px-8 py-3">
            Learn More
          </Button>
        </div>
      </section>

      {/* Newsletter & Socials */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Stay Updated</h2>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Subscribe to our newsletter and follow us on social media for the
            latest updates and news.
          </p>

          {/* Newsletter Subscription */}
          <div className="max-w-lg mx-auto mb-16">
            <div className="space-y-6">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full text-base py-3 px-4 rounded-lg"
              />
              <Button size="lg" className="w-full text-base py-3">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>

          {/* Contact & Social Media */}
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-bold mb-12">Connect With Us</h3>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Email Contact */}
              <Card className="p-6 hover:shadow-lg transition-all group cursor-pointer rounded-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <a
                  href="mailto:hello@steptions.com"
                  className="flex items-center space-x-4"
                >
                  <div className="bg-gray-100 p-4 rounded-full group-hover:bg-gray-200 transition-colors">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-base">
                      Email Us
                    </div>
                    <div className="text-gray-600 text-sm">
                      hello@steptions.com
                    </div>
                  </div>
                </a>
              </Card>

              {/* X (Twitter) */}
              <Card className="p-6 hover:shadow-lg transition-all group cursor-pointer rounded-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <a
                  href="https://x.com/steptions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4"
                >
                  <div className="bg-black p-4 rounded-full group-hover:bg-gray-800 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-base">
                      Follow on X
                    </div>
                    <div className="text-gray-600 text-sm">@steptions</div>
                  </div>
                </a>
              </Card>

              {/* Telegram */}
              <Card className="p-6 hover:shadow-lg transition-all group cursor-pointer rounded-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <a
                  href="https://t.me/steptions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4"
                >
                  <div className="bg-blue-500 p-4 rounded-full group-hover:bg-blue-600 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-base">
                      Join Telegram
                    </div>
                    <div className="text-gray-600 text-sm">@steptions</div>
                  </div>
                </a>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
