import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configuramos las fuentes para que Tailwind las agarre con las variables
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "HospiCasa — Portal Médico",
  description:
    "Completá tu perfil médico y conectá tu agenda para recibir turnos.",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Cambié a lang="es" porque el producto apunta acá
    <html lang="es" className="bg-slate-50">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        {/* --- NAVBAR GLOBAL --- 
            Esto es fijo. Si el médico navega del registro al dashboard, 
            esta barra de arriba NO parpadea ni se recarga. 
        */}
        <header className="bg-white border-b border-slate-200 p-4 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
            <div className="font-bold text-xl text-blue-600">
              HospiCasa

            </div>
            <nav className="text-sm font-medium text-slate-500">
              {/* Cuando conectes Supabase, acá pones el botón de Cerrar Sesión */}
              Portal Profesional
            </nav>
          </div>
        </header>

        {/* --- CONTENIDO DINÁMICO ---
            Acá es donde Next.js escupe tu page.tsx (el formulario o el dashboard).
            Le puse un max-w-7xl para que no se estire al infinito en monitores grandes.
        */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>


      </body>
    </html>
  );
}
