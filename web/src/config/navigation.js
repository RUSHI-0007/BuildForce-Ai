/**
 * @file navigation.js
 * Central navigation configuration for BuildForce.
 * Defines the 13 application views, icons, routes, and sections.
 */

export const NAVIGATION_SECTIONS = [
  {
    id: 'site_operations',
    title: 'Site Operations',
    items: [
      { id: 'site_dashboard', label: 'Site Overview', icon: 'LayoutDashboard', scope: 'project' },
      { id: 'tasks', label: 'Tasks & CPM', icon: 'CheckSquare', scope: 'project' },
      { id: 'issues', label: 'Site Snags & Issues', icon: 'AlertCircle', scope: 'project' },
      { id: 'payments', label: 'Site Payments', icon: 'CreditCard', scope: 'project' },
      { id: 'drive', label: 'Drawings & Drive', icon: 'Folder', scope: 'project' }
    ]
  },
  {
    id: 'organization',
    title: 'Enterprise & Resources',
    items: [
      { id: 'sites', label: 'All Projects', icon: 'Building2', scope: 'org' },
      { id: 'materials', label: 'Materials & Stock', icon: 'Boxes', scope: 'org' },
      { id: 'labour', label: 'Labour Muster', icon: 'Users', scope: 'org' },
      { id: 'cashflow', label: 'Cashflow Runway', icon: 'BadgeIndianRupee', scope: 'org' },
      { id: 'library', label: 'Rates Library', icon: 'BookOpen', scope: 'org' },
      { id: 'reports', label: 'Executive Reports', icon: 'FileText', scope: 'org' },
      { id: 'settings', label: 'Workspace Settings', icon: 'Settings', scope: 'org' }
    ]
  },
  {
    id: 'ai_workforce',
    title: 'AI Workforce',
    items: [
      { id: 'agents', label: 'Agent Team Hub', icon: 'Sparkles', scope: 'global' }
    ]
  }
];

export const ALL_VIEW_IDS = [
  'sites',
  'site_dashboard',
  'tasks',
  'issues',
  'materials',
  'labour',
  'payments',
  'drive',
  'cashflow',
  'library',
  'reports',
  'settings',
  'agents'
];
