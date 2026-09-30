import { Header } from "@/components/Header";
import Demo from "@/components/ui/demo";
import { ClientsSection } from "@/components/ClientsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { FaqSection } from "@/components/FaqSection";
import { InquirySection } from "@/components/InquirySection";
import { ServiceProvider } from "@/components/ServiceContext";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <ServiceProvider>
      <div className="flex min-h-screen flex-col bg-warm-white text-ink antialiased">
        <Header variant="overlay" />
        <main className="flex-1">
          <Demo word="GROWTH" />
          <ClientsSection />
          <ServicesSection />
          <ProcessSection />
          <FaqSection />
          <InquirySection />
        </main>
        <Footer />
      </div>
    </ServiceProvider>
  );
}
