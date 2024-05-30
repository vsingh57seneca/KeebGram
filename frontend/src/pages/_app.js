import "@/styles/globals.css";
import toast, { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-white text-black ">
      <Toaster />
      <Component {...pageProps} />
    </div>
  );
}
