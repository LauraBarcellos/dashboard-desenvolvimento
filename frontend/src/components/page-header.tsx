"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  avatar?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  showBackButton = false,
  onBack,
  avatar,
  className,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className={cn("sticky top-0 z-10 border-b border-border bg-card", className)}>
      <div className="px-4 sm:px-6 py-4 w-full max-w-full overflow-x-hidden">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-3" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {item.href ? (
                    <Link href={item.href} className="hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{item.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Separator */}
        {(breadcrumbs?.length || 0) > 0 && <Separator className="mb-4 bg-border/50" />}

        {/* Title, Avatar and Actions */}
        <div className="flex items-start gap-3 w-full">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              aria-label="Voltar"
              className="shrink-0 mt-0.5"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}

          {avatar && <div className="shrink-0 mt-0.5">{avatar}</div>}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full min-w-0 flex-1">
            <div className="min-w-0 flex-1 overflow-hidden">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground truncate">
                {title}
              </h1>
              {description && (
                <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</div>
              )}
            </div>
            {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
