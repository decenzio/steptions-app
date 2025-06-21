import Header from "@/app/components/Header";
import WelcomeSection from "@/app/components/WelcomeSection";
import DashboardGrid from "@/app/components/DashboardGrid";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #eff6ff, #fff7ed)' }}>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <WelcomeSection />
        <DashboardGrid />
      </main>
    </div>
  )
}