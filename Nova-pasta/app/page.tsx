import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { UpcomingEpisodesCarousel } from "@/components/upcoming-episodes-carousel"
import { ExploreCategories } from "@/components/explore-categories"
import { PdfInfoSection } from "@/components/pdf-info-section"
import { ListeningStatistics } from "@/components/listening-statistics"
import { PremiumPlans } from "@/components/premium-plans"
import { Button } from "@/components/ui/button"
import { Play, Headphones } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Descubra podcasts <span className="text-primary">incríveis</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Sua porta de entrada para conteúdo de áudio ilimitado. Ouça, aprenda e se inspire com criadores do mundo
                todo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6 gap-2">
                <Play className="w-5 h-5" />
                Começar a ouvir
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 gap-2 bg-transparent">
                <Headphones className="w-5 h-5" />
                Explorar categorias
              </Button>
            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                Mais de <span className="font-semibold text-primary">10.000+</span> episódios disponíveis
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
      </section>

      <UpcomingEpisodesCarousel />
      <ExploreCategories />
      <PdfInfoSection />
      <ListeningStatistics />

      <PremiumPlans />

      <Footer />
    </div>
  )
}
