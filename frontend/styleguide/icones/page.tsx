import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Activity,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  FileQuestion,
  FileText,
  Filter,
  FolderKanban,
  HelpCircle,
  Home,
  ImageIcon,
  Key,
  Laptop,
  LayoutDashboard,
  LinkIcon,
  Loader2,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Navigation,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Search,
  Send,
  Sun,
  Trash2,
  TrendingUp,
  Upload,
  User,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";

const icons = [
  { name: "Plus", Icon: Plus },
  { name: "X", Icon: X },
  { name: "Check", Icon: Check },
  { name: "Search", Icon: Search },
  { name: "Filter", Icon: Filter },
  { name: "Edit", Icon: Edit },
  { name: "Trash2", Icon: Trash2 },
  { name: "Save", Icon: Save },
  { name: "Copy", Icon: Copy },
  { name: "Download", Icon: Download },
  { name: "Upload", Icon: Upload },
  { name: "Send", Icon: Send },
  { name: "ArrowLeft", Icon: ArrowLeft },
  { name: "ArrowRight", Icon: ArrowRight },
  { name: "ChevronRight", Icon: ChevronRight },
  { name: "Home", Icon: Home },
  { name: "LayoutDashboard", Icon: LayoutDashboard },
  { name: "Users", Icon: Users },
  { name: "User", Icon: User },
  { name: "UserCheck", Icon: UserCheck },
  { name: "UserX", Icon: UserX },
  { name: "Building2", Icon: Building2 },
  { name: "Calendar", Icon: Calendar },
  { name: "Clock", Icon: Clock },
  { name: "Mail", Icon: Mail },
  { name: "Phone", Icon: Phone },
  { name: "MapPin", Icon: MapPin },
  { name: "FileText", Icon: FileText },
  { name: "FileQuestion", Icon: FileQuestion },
  { name: "FolderKanban", Icon: FolderKanban },
  { name: "MessageSquare", Icon: MessageSquare },
  { name: "AlertCircle", Icon: AlertCircle },
  { name: "CheckCircle2", Icon: CheckCircle2 },
  { name: "TrendingUp", Icon: TrendingUp },
  { name: "Activity", Icon: Activity },
  { name: "Eye", Icon: Eye },
  { name: "EyeOff", Icon: EyeOff },
  { name: "Lock", Icon: Lock },
  { name: "LogIn", Icon: LogIn },
  { name: "LogOut", Icon: LogOut },
  { name: "Loader2", Icon: Loader2 },
  { name: "RefreshCw", Icon: RefreshCw },
  { name: "MoreVertical", Icon: MoreVertical },
  { name: "MoreHorizontal", Icon: MoreHorizontal },
  { name: "ExternalLink", Icon: ExternalLink },
  { name: "LinkIcon", Icon: LinkIcon },
  { name: "Navigation", Icon: Navigation },
  { name: "ImageIcon", Icon: ImageIcon },
  { name: "Laptop", Icon: Laptop },
  { name: "Key", Icon: Key },
  { name: "HelpCircle", Icon: HelpCircle },
  { name: "Moon", Icon: Moon },
  { name: "Sun", Icon: Sun },
];

export default function IconesPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Ícones</h1>
        <p className="mt-1 text-muted-foreground">
          Lucide React — {icons.length} ícones usados no projeto. Tamanho padrão: size-4 (16px).
          Stroke width: 2.
        </p>
      </div>

      <ShowcaseSection
        title="Ícones Usados no Projeto"
        description="Todos os ícones efetivamente importados nas features e componentes"
      >
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8">
          {icons.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-md p-3 hover:bg-accent"
            >
              <Icon className="size-5" />
              <span className="text-[10px] text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tamanhos">
        <div className="flex items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Home className="size-3" />
            <span className="text-xs text-muted-foreground">size-3 (12px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Home className="size-4" />
            <span className="text-xs text-muted-foreground">size-4 (16px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Home className="size-5" />
            <span className="text-xs text-muted-foreground">size-5 (20px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Home className="size-6" />
            <span className="text-xs text-muted-foreground">size-6 (24px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Home className="size-8" />
            <span className="text-xs text-muted-foreground">size-8 (32px)</span>
          </div>
        </div>
      </ShowcaseSection>
    </>
  );
}
