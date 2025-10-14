import "./globals.css";
import { ToastProvider } from "./components/Toast";

export const metadata = {
  title: "Get-GSA UI",
  description: "Government Contract Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
