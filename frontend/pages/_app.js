import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReduxProvider from "../Providers/ReduxProvider";
import { usePathname } from "next/navigation";
export default function App({ Component, pageProps }) {
  const pathname = usePathname();
  const hideNavigation = pathname.startsWith("/dashboard");
  return (
    <>
      <ReduxProvider>
        {hideNavigation ? null : <Navbar />}
        <Component {...pageProps} />
        {hideNavigation ? null : <Footer />}
      </ReduxProvider>
    </>
  );
}
