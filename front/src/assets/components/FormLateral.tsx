"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function FormLateral({
  title,
  descripcion,
  formChild,
  tituloAbrir,
}: {
  title: string;
  descripcion: string;
  formChild: React.ReactNode;
  tituloAbrir: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{tituloAbrir}</Button>
      </SheetTrigger>
      <ScrollArea className="max-h-52">
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className="hidden md:block">
              {descripcion}
            </SheetDescription>
          </SheetHeader>
          {formChild}
          <SheetFooter></SheetFooter>
        </SheetContent>
      </ScrollArea>
    </Sheet>
  );
}
