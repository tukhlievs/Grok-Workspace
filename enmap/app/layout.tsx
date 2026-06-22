import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enmap — ИИ-агент для эстетичных съемок",
  description: "Находит уникальные места для фото и видео на основе вашего местоположения. Material You 3 дизайн. Персональные рекомендации с высокой эстетикой.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
        {children}
        <Toaster position="top-center" richColors closeButton className="sonner-toast" />
      </body>
    </html>
  );
}