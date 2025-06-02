import "./globals.css";

export const metadata = {
  title: "MIPP +",
  description: "Su sistema de confianza",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
