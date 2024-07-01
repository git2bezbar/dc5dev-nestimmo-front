import type { Metadata } from "next";
import { DM_Sans} from "next/font/google";
import "./globals.css";
import QueryClientProviderCustom from "@/providers/QueryClientProvider";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nest Immo | Dashboard",
  description: "Nest Immo Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <QueryClientProviderCustom>
        <body className={`${dmSans.className} tracking-tight grid grid-cols-dashboard grid-rows-1 h-screen`}>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </QueryClientProviderCustom>
    </html>
  );
}
