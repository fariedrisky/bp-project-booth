import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

export interface VacancyType {
  id: string;
  title: string;
  employmentType?: string; // e.g. "Freelance", "Full-time"
  qualifications: string[];
}

interface VacancyCardProps {
  vacancy: VacancyType;
  className?: string;
  onApply: (vacancy: VacancyType) => void;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({
  vacancy,
  className = "",
  onApply,
}) => {
  return (
    <Card
      className={cn(
        "mx-auto flex h-full max-w-[480px] flex-col overflow-hidden shadow-sm transition-all hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="p-4 pb-0 sm:p-6 sm:pb-0">
        {vacancy.employmentType && (
          <span className="mb-2 inline-block w-fit rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            {vacancy.employmentType}
          </span>
        )}
        <h3 className="font-serif text-lg font-semibold sm:text-2xl">
          {vacancy.title}
        </h3>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col p-4 pt-3 sm:p-6 sm:pt-4">
        <Separator className="mb-3 bg-gray-200 sm:mb-4" />

        <h4 className="text-left text-sm font-medium text-gray-600 sm:text-base">
          Kualifikasi:
        </h4>
        <ul className="mt-2 space-y-2 text-left">
          {vacancy.qualifications.map((qualification, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm leading-relaxed text-gray-600"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span className="flex-1 text-left">{qualification}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="border-t bg-gray-50 p-4 sm:p-6">
        <Button
          type="button"
          variant="default"
          className="h-10 w-full px-6 font-medium shadow-sm !transition-colors !duration-300 hover:bg-accent/90"
          onClick={() => onApply(vacancy)}
        >
          Daftar Sekarang
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VacancyCard;
