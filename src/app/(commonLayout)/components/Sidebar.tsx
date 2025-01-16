'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import {
  Home,
  Laptop,
  Newspaper,
  BookOpen,
  Users,
  Star,
  Settings,
  Menu,
  X,
  NotebookTabs,
  Store
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Laptop, label: 'Tech Reviews', href: '/reviews' },
  { icon: Newspaper, label: 'Latest News', href: '/news' },
  { icon: BookOpen, label: 'Tutorials', href: '/tutorials' },
  { icon: Users, label: 'Community', href: '/community' },
  { icon: Star, label: 'Premium', href: '/subscription' },
  { icon: Store, label: 'About Us', href: '/about-us' },
  { icon: NotebookTabs, label: 'Contact Us', href: '/contact-us' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-content1 h-screen sticky top-0 border-r transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <Link href={"/"}>
          <h1 className="text-xl font-bold">TechNest</h1>
          </Link>
        )}
        <Button
          isIconOnly
          variant="light"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <nav className="p-2 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-default-100"
          >
            <item.icon size={20} className="mr-3" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <Button
          variant="flat"
          className={`w-full justify-start ${collapsed ? 'justify-center' : ''}`}
        >
          <Settings size={20} className={collapsed ? '' : 'mr-2'} />
          {!collapsed && 'Settings'}
        </Button>
      </div>
    </div>
  );
}