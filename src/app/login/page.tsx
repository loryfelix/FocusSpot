import Footer from "@/src/components/navigation/Footer";
import FormLogin from "@/src/components/user/FormLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accedi - FocusSpot",
  description: "FocusSpot è l'app che ti aiuta a scoprire i migliori spazi di studio e lavoro condivisi nella tua città. Che tu stia cercando una biblioteca silenziosa per concentrarti sui tuoi esami, un caffè accogliente per lavorare al tuo progetto, o uno spazio di coworking dove incontrare altre persone motivate, FocusSpot ti guida verso il luogo perfetto per te.",
};

export default function Terms() {
  return (
    <section>
      <FormLogin />
      <Footer />
    </section>
  );
}