import { Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function SettingsPanel() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>topK</DropdownMenuItem>
          <DropdownMenuItem>minScore</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>onTopKChange</DropdownMenuItem>
          <DropdownMenuItem>onMinScoreChange</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>darkMode</DropdownMenuItem>
          <DropdownMenuItem>onDarkModeToggle</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
