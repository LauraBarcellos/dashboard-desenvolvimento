import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ padding: 40 }}>{children}</main>
      <Footer />
    </>
  );
}
