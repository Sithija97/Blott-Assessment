import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const albra = localFont({
  src: "../public/fonts/Albra-Light.woff",
  variable: "--font-albra",
  weight: "300",
});

const helveticaNow = localFont({
  src: "../public/fonts/HelveticaNowDisplay-Regular.woff",
  variable: "--font-helvetica-now",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Blott News App",
  description: "Stay updated with the latest market news and trends.",
  icons: {
    icon: "https://media.licdn.com/dms/image/v2/D560BAQEUHmJv77uZHQ/company-logo_200_200/company-logo_200_200/0/1737118537355/blott_logo?e=1770249600&v=beta&t=KDNHaQqs45misd4nw--TNdQhPCYejQrnhq2bXxQa3w8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable}  ${albra.variable} ${
          helveticaNow.variable
        } antialiased ${
          process.env.ENV === "development" ? "debug-screens" : ""
        }`}
      >
        {children}
      </body>
    </html>
  );
}
