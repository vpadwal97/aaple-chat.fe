import { Suspense } from "react";

import ChatContent from "@/components/random/ChatContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Chat with Strangers - Aaple Chat",

  description:
    "Start anonymous real-time conversations with strangers who share your interests.",
};

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}