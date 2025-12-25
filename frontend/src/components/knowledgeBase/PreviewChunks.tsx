"use client";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

export function PreviewChunks() {
  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-sm font-medium">Preview Document</h3>

      <Accordion type="single" collapsible>
        <AccordionItem value="settings">
          <AccordionTrigger className="py-2">
            Advanced Settings
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Chunk Size</Label>
                <Input type="number" defaultValue={1000} className="h-8" />
              </div>
              <div>
                <Label className="text-xs">Chunk Overlap</Label>
                <Input type="number" defaultValue={200} className="h-8" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="h-[200px] border rounded-md p-2 space-y-1.5 overflow-y-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-2 rounded bg-muted text-xs leading-relaxed">
            Chunk {i}: Lorem ipsum dolor sit amet...
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1 h-9">
          Preview
        </Button>
        <Button className="flex-1 h-9">Continue</Button>
      </div>
    </Card>
  );
}
