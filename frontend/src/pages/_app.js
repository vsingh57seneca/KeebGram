import "@/styles/globals.css";
import toast, { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-white text-black min-h-screen">
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: '#fff',
            },
          },
          error: {
            style: {
              background: "red",
              color: '#fff',
            },
          },
        }}
      />
      <Component {...pageProps} />
    </div>
  );
}
