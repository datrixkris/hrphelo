import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import ClientThemeWrapper from "./context/ClientThemeWrapper";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HRPhelo",
  description: "Your HR Management solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} `}>
        <ThemeProvider>
          <ClientThemeWrapper>
            <ReactQueryProvider>
              <div className="bg-base-200">{children}</div>
            </ReactQueryProvider>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
