
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ToastContainer } from 'react-toastify';



export const metadata = {
  title: "MIPP +",
  description: "Su sistema de confianza",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        
          <ThemeProvider attribute={'class'}>
            {children}
            <ToastContainer position="bottom-right" />
          </ThemeProvider>

      </body>
    </html>
  );
}
