"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = (props: BackButtonProps) => {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link href={props.href}>{props.label}</Link>
    </Button>
  );
};
