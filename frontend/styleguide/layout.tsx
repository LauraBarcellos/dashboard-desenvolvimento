import { StyleguideHeader } from "@/features/styleguide/components/styleguide-header";
import { StyleguideNav } from "@/features/styleguide/components/styleguide-nav";

export default function StyleguideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <StyleguideHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-56 shrink-0 overflow-y-auto border-r bg-card p-4 md:block">
          <StyleguideNav />
        </aside>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-4xl space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
