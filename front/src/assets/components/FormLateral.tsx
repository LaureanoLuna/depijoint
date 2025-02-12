"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

export function FormLateral({ title, descripcion, formChild, tituloAbrir }: {
  title: string,
  descripcion: string,
  formChild: React.ReactNode,
  tituloAbrir: string,
}) {


  return (

    <Sheet >
      <SheetTrigger asChild>
        <Button variant="outline">{tituloAbrir}</Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="min-h-screen">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="hidden md:block">
            {descripcion}
          </SheetDescription>
        </SheetHeader>
        {formChild}
        <SheetFooter>

        </SheetFooter>
      </SheetContent>
    </Sheet>


  );
}
