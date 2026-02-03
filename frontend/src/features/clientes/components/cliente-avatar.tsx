"use client";

import { memo, useState } from "react";
import { Building2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Cliente } from "../types";

interface ClienteAvatarProps {
  cliente: Cliente;
  size?: number;
  className?: string;
}

/**
 * Helper function to determine if cliente is a company (empresa) or person
 */
function isEmpresa(cliente: Cliente): boolean {
  // Check if documento contains "/" (CNPJ format) or nome contains common company suffixes
  const hasCNPJ = cliente.documento?.includes("/");
  const hasCompanySuffix = /(Ltda|S\.A\.|EIRELI|ME|S\.A|S\/A|Comércio|Indústria|Serviços|Construção|Construtora|Farmácia|Restaurante|Logística|Autopeças|Comercial|Atacado|Varejo)/i.test(
    cliente.nome
  );
  return hasCNPJ || hasCompanySuffix;
}

/**
 * Get avatar URL based on cliente type
 * Uses DiceBear API - reliable and free service
 * Docs: https://www.dicebear.com/
 */
function getAvatarUrl(cliente: Cliente, isCompany: boolean): string {
  // Create a seed based on cliente ID or name for consistent avatars
  const seed = cliente.id || cliente.nome.toLowerCase().replace(/\s+/g, '-');
  
  if (isCompany) {
    // For companies: use "shapes" style (geometric shapes) with brand colors
    // Using PNG format for better compatibility
    return `https://api.dicebear.com/7.x/shapes/png?seed=${encodeURIComponent(seed)}&size=128&backgroundColor=8b5cf6,ec4899,6366f1&shape1Color=ffffff&shape2Color=ffffff&shape3Color=ffffff`;
  } else {
    // For people: use "avataaars" style (cartoon avatars) - very popular and reliable
    // Using PNG format for better compatibility
    return `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(seed)}&size=128`;
  }
}

/**
 * Cliente Avatar Component
 * Shows company logos or person avatars with fallback to initials
 */
export const ClienteAvatar = memo(function ClienteAvatar({
  cliente,
  size = 32,
  className,
}: ClienteAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const isCompany = isEmpresa(cliente);
  const avatarUrl = getAvatarUrl(cliente, isCompany);
  const initials = cliente.nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Fallback: show initials with icon if image fails
  if (imageError) {
    return (
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:scale-110 transition-all duration-300",
          className
        )}
        style={{ width: size, height: size }}
      >
        {isCompany ? (
          <Building2 className="h-4 w-4 text-primary" />
        ) : (
          <span className="text-xs font-bold text-primary">{initials[0] || cliente.nome.charAt(0).toUpperCase()}</span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:scale-110 transition-all duration-300 overflow-hidden",
        className
      )}
      style={{ width: size, height: size }}
    >
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 z-10">
          {isCompany ? (
            <Building2 className="h-4 w-4 text-primary/50" />
          ) : (
            <User className="h-4 w-4 text-primary/50" />
          )}
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarUrl}
        alt={cliente.nome}
        width={size}
        height={size}
        className={cn(
          "object-cover rounded-lg transition-opacity duration-200 w-full h-full",
          imageLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        ref={(img) => {
          // Fix: If image is already loaded from cache, onLoad won't fire
          // Check if image is complete and update state accordingly
          if (img?.complete && imageLoading) {
            setImageLoading(false);
          }
        }}
      />
    </div>
  );
});

