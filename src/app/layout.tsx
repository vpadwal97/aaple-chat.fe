import "./globals.css";

import Providers from "./providers";

export const metadata = {
  title: "Omegle Clone",
  description:
    "Random chat with interest matching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
