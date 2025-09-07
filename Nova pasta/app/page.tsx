import { ThemeToggle } from "@/components/theme-toggle"
import { UserManagement } from "@/components/user-management"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sistema de Gerenciamento</h1>
            <p className="text-sm text-muted-foreground">Administração de usuários</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <UserManagement />
      </main>
    </div>
  )
}
