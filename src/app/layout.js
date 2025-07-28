import "./globals.css";
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: "MIPP +",
  description: "Su sistema de confianza",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
