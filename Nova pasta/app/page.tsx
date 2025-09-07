"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, MoreHorizontal, Eye, Copy, Archive, Trash2, Edit } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data for demonstration
const mockEpisodes = [
  {
    id: 1,
    title: "Introdução ao React Server Components",
    category: "Tecnologia",
    subcategory: "Frontend",
    tags: ["React", "SSR", "Next.js"],
    status: "published",
    publishDate: "2024-01-15",
    views: 1250,
  },
  {
    id: 2,
    title: "Como criar APIs escaláveis",
    category: "Tecnologia",
    subcategory: "Backend",
    tags: ["API", "Node.js", "Escalabilidade"],
    status: "draft",
    publishDate: null,
    views: 0,
  },
  {
    id: 3,
    title: "Design System na prática",
    category: "Design",
    subcategory: "UI/UX",
    tags: ["Design System", "Figma", "Components"],
    status: "scheduled",
    publishDate: "2024-02-01",
    views: 0,
  },
  {
    id: 4,
    title: "Otimização de performance web",
    category: "Tecnologia",
    subcategory: "Performance",
    tags: ["Performance", "Web Vitals", "Otimização"],
    status: "archived",
    publishDate: "2023-12-10",
    views: 890,
  },
]

const statusConfig = {
  published: { label: "Publicado", color: "bg-green-500", icon: "🟢" },
  draft: { label: "Rascunho", color: "bg-gray-500", icon: "⚪" },
  scheduled: { label: "Agendado", color: "bg-yellow-500", icon: "🟡" },
  archived: { label: "Arquivado", color: "bg-gray-800", icon: "⚫" },
}

export default function EpisodeManager() {
  const [episodes] = useState(mockEpisodes)
  const [selectedEpisodes, setSelectedEpisodes] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const stats = {
    total: episodes.length,
    published: episodes.filter((e) => e.status === "published").length,
    draft: episodes.filter((e) => e.status === "draft").length,
    scheduled: episodes.filter((e) => e.status === "scheduled").length,
  }

  const filteredEpisodes = episodes.filter((episode) => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || episode.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEpisodes(filteredEpisodes.map((e) => e.id))
    } else {
      setSelectedEpisodes([])
    }
  }

  const handleSelectEpisode = (episodeId: number, checked: boolean) => {
    if (checked) {
      setSelectedEpisodes([...selectedEpisodes, episodeId])
    } else {
      setSelectedEpisodes(selectedEpisodes.filter((id) => id !== episodeId))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Gerenciador de Episódios</h1>
            <p className="text-muted-foreground mt-1">Centro de comando para gerenciar todo seu conteúdo</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Fazer Novo Upload
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total de Episódios</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Publicados</CardDescription>
              <CardTitle className="text-2xl text-green-600">{stats.published}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Rascunhos</CardDescription>
              <CardTitle className="text-2xl text-gray-600">{stats.draft}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Agendados</CardDescription>
              <CardTitle className="text-2xl text-yellow-600">{stats.scheduled}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ferramentas de Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="published">Publicados</SelectItem>
                  <SelectItem value="draft">Rascunhos</SelectItem>
                  <SelectItem value="scheduled">Agendados</SelectItem>
                  <SelectItem value="archived">Arquivados</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Mais Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedEpisodes.length > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{selectedEpisodes.length} episódio(s) selecionado(s)</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Publicar Selecionados
                  </Button>
                  <Button size="sm" variant="outline">
                    Mudar Categoria
                  </Button>
                  <Button size="sm" variant="outline">
                    Adicionar Tags
                  </Button>
                  <Button size="sm" variant="outline">
                    Arquivar
                  </Button>
                  <Button size="sm" variant="destructive">
                    Deletar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Episodes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Episódios ({filteredEpisodes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedEpisodes.length === filteredEpisodes.length && filteredEpisodes.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Data de Publicação</TableHead>
                  <TableHead className="w-12">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEpisodes.map((episode) => (
                  <TableRow key={episode.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedEpisodes.includes(episode.id)}
                        onCheckedChange={(checked) => handleSelectEpisode(episode.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${statusConfig[episode.status as keyof typeof statusConfig].color} text-white`}
                      >
                        {statusConfig[episode.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{episode.title}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{episode.category}</div>
                        <div className="text-xs text-muted-foreground">{episode.subcategory}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {episode.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {episode.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{episode.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {episode.publishDate ? (
                        <div className="text-sm">{new Date(episode.publishDate).toLocaleDateString("pt-BR")}</div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            Ver na Plataforma
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Copy className="h-4 w-4" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Archive className="h-4 w-4" />
                            Arquivar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
