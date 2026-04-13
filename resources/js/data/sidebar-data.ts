import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react"

export const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Admin",
      url: "#",
      icon: User,
      isActive: false,
      items: [
        {
          title: "Users",
          url: route('admin.users.index'),
        },
        {
          title: "Admins",
          url: route('admin.admins.index'),
        },
        {
          title: "Roles",
          url: route('admin.roles.index'),
        },
        {
          title: "Categories",
          url: route('admin.categories.index'),
        },
        {
          title: "Blogs",
          url: route('admin.blogs.index'),
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    }
  ],
  projects: [
    {
      name: "Dashboard",
      url: route('dashboard'),
      icon: Frame,
    },
    {
      name: "Races",
      url: route('admin.races.index'),
      icon: Frame,
    }
  ],
}
