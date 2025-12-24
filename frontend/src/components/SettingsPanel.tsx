import { Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ThemeToggle from "./ui/ThemeToggle";

export function SettingsPanel() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ThemeToggle></ThemeToggle>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
