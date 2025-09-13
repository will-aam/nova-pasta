"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Bell, AudioLines } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function Navbar() {
  const [loading, setLoading] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const avatarRef = useRef<HTMLButtonElement>(null)

  // URL do avatar padrão para usuários deslogados
  const defaultAvatarUrl = "https://api.dicebear.com/9.x/thumbs/svg?seed=Destiny"

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-white dark:bg-black/30 dark:backdrop-blur-md px-4 sm:px-6">
      <Link href="/">
        <div className="flex items-center gap-4">
          <AudioLines className="h-6 w-6" />
        </div>
      </Link>
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar episódios..."
          className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>

        {loading ? (
          <Skeleton className="h-8 w-8 rounded-full" />
        ) : (
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                ref={avatarRef}
                variant="ghost"
                size="icon"
                className="rounded-full"
                onMouseEnter={() => setPopoverOpen(true)}
                onMouseLeave={() => setPopoverOpen(false)}
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={defaultAvatarUrl || "/placeholder.svg"} alt="Avatar Padrão" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-48 p-2 bg-background shadow-lg border rounded-md"
              onMouseEnter={() => setPopoverOpen(true)}
              onMouseLeave={() => setPopoverOpen(false)}
            >
              <div className="flex flex-col gap-1">
                <Link href="/login" className="hover:bg-accent rounded px-3 py-2 text-sm">
                  Login
                </Link>
                <Link href="/signup" className="hover:bg-accent rounded px-3 py-2 text-sm">
                  Cadastro
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  )
}
