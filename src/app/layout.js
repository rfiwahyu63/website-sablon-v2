import "./globals.css";
import { Poppins, Montserrat } from "next/font/google";
import Navbar from "./component/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "RFI Sablon Digital",
  description: "Jasa Sablon Digital Berkualitas",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} antialiased`}
    >
      <body className="min-h-full flex gap-2">
        <Navbar />
        <main className="flex-1">
        {children}
        </main>
      </body>
    </html>
  );
}
