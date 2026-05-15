import Link from "next/link";

import { websiteJsonLd } from "@/seo/jsonld";

export default function LandingPage() {
  return (
    <>
      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            websiteJsonLd
          ),
        }}
      />

      <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
        {/* ========================= */}
        {/* HERO */}
        {/* ========================= */}
        <section className="relative px-6 pt-28 pb-24">
          {/* Gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-3xl rounded-full"></div>

          <div className="relative max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

              <span className="text-sm text-slate-300">
                Anonymous & Real-Time
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              Meet Strangers
              <br />

              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                With Shared Interests
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-10">
              A modern anonymous chat platform where
              you instantly connect with random people
              based on common interests like anime,
              coding, gaming, movies, music, and more.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/chat"
                className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/20"
              >
                Start Chatting
              </Link>

              <a
                href="#features"
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all px-8 py-4 rounded-2xl font-semibold text-lg"
              >
                Explore Features
              </a>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20">
              {[
                "Real-Time Matching",
                "Interest Based",
                "Anonymous Chat",
                "Modern UI",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5"
                >
                  <p className="text-slate-300 text-sm md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= */}
        {/* FEATURES */}
        {/* ========================= */}
        <section
          id="features"
          className="px-6 py-24 border-t border-slate-900"
        >
          <div className="max-w-6xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-5">
                Why Use Aaple Chat?
              </h2>

              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Designed for meaningful random
                conversations with fast matching and a
                clean modern experience.
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title:
                    "Interest Matching",

                  desc:
                    "Get paired with strangers who share your hobbies and interests.",
                },

                {
                  title:
                    "Anonymous Chat",

                  desc:
                    "No signup required. Start chatting instantly with complete privacy.",
                },

                {
                  title:
                    "Real-Time Messaging",

                  desc:
                    "Fast Socket.io powered chat with live typing and instant matching.",
                },

                {
                  title:
                    "Smart Matchmaking",

                  desc:
                    "Priority-based matching using shared interests and skip prevention.",
                },

                {
                  title:
                    "Modern Experience",

                  desc:
                    "Mobile responsive dark UI inspired by modern chat platforms.",
                },

                {
                  title:
                    "Instant Reconnect",

                  desc:
                    "Automatic searching and smooth partner transitions.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/40 transition-all"
                >
                  <h3 className="text-2xl font-bold mb-4">
                    {card.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= */}
        {/* CTA */}
        {/* ========================= */}
        <section className="px-6 py-28 border-t border-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-8">
              Ready to Meet Someone New?
            </h2>

            <p className="text-slate-400 text-xl mb-10">
              Start chatting anonymously in seconds.
            </p>

            <Link
              href="/chat"
              className="inline-block bg-green-600 hover:bg-green-700 transition-all px-10 py-5 rounded-2xl font-bold text-xl shadow-lg shadow-green-500/20"
            >
              Start Chatting Now
            </Link>
          </div>
        </section>

        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}
        <footer className="border-t border-slate-900 px-6 py-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-bold">
              Aaple Chat
            </h3>

            <p className="text-slate-500 text-sm text-center">
              Built with Next.js, Socket.io, MongoDB &
              Tailwind CSS.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}