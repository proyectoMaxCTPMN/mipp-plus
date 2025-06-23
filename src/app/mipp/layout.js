import "../globals.css";
import Navbar from './components/nav/Navbar'
export default function MippLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
