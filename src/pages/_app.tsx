import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Martian_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const martianMono = Martian_Mono({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        * {
          font-family: ${inter.style.fontFamily};
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${martianMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
