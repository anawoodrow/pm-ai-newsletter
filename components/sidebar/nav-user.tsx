/*
<ai_context>
This client component provides a user button for the sidebar via Clerk.
</ai_context>
*/

"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function NavUser() {
  return (
    <Button variant="ghost" className="w-full justify-start">
      <Avatar className="h-5 w-5">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span className="ml-2">User</span>
    </Button>
  )
}
