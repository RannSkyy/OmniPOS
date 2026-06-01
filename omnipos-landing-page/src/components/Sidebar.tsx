import React from 'react';
import {
  Home,
  Users,
  Box,
  Ticket,
  Clock,
  UserPlus,
  Link2,
  ShieldCheck,
  HelpCircle,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  // Sidebar items corresponding to the screenshot icons
  const sidebarItems = [
    { id: 'pos', icon: Users, label: 'Create Transaction' },
    { id: 'dashboard', icon: Home, label: 'Dashboard Overview' },
    { id: 'inventory', icon: Box, label: 'Inventory list' },
    { id: 'promos', icon: Ticket, label: 'Loyalty & Coupons' },
    { id: 'history', icon: Clock, label: 'Transaction History' },
    { id: 'customers', icon: UserPlus, label: 'Staff Management' },
    { id: 'integrations', icon: Link2, label: 'Third Party Sync' },
    { id: 'security', icon: ShieldCheck, label: 'Compliance & Safety' },
    { id: 'help', icon: HelpCircle, label: 'Knowledge Base' }
  ];

  return (
    <>
      {/* Desktop Sidebar (Left of the workspace) */}
      <aside
        id="pos-desktop-sidebar"
        className="hidden lg:flex flex-col items-center justify-between py-6 px-4 w-20 bg-neutral-950 border-r border-neutral-800 shrink-0 h-full select-none"
      >
        {/* Brand Rounded Logo */}
        <div id="sidebar-logo" className="flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:border-neutral-700 transition-colors group cursor-pointer">
            <TrendingUp className="w-6 h-6 text-neon-green transition-transform duration-300 group-hover:rotate-12" />
          </div>
        </div>

        {/* Action / Navigation Buttons block */}
        <nav id="sidebar-navigation" className="flex flex-col gap-3 py-6 my-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group ${
                  isActive
                    ? 'bg-neon-green text-black font-semibold shadow-[0_0_12px_rgba(180,249,60,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                <Icon className="w-5.5 h-5.5" />
                
                {/* Tooltip on Hover */}
                <div className="absolute left-16 hidden group-hover:flex items-center z-30">
                  <div className="bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl">
                    {item.label}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer static placeholder help button */}
        <div className="flex flex-col gap-3">
          <div className="w-10 h-0.5 bg-neutral-800 rounded"></div>
          <button
            title="Sistem Beroperasi Normal"
            className="w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>
        </div>
      </aside>

      {/* Responsive Tablet/Mobile Horizontal Bar at Bottom of POS Card */}
      <div
        id="pos-mobile-bottom-nav"
        className="lg:hidden flex justify-around items-center py-2 px-3 bg-neutral-950 border-t border-neutral-800 w-full select-none"
      >
        {sidebarItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-mob-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive ? 'text-neon-green font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-5.5 h-5.5" />
              <span className="text-[9px] uppercase tracking-wider">{item.id === 'pos' ? 'Trans' : item.id}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
