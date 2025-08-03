"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  User,
  LogOut,
  Search,
  Plus,
  Package,
  X,
  Menu,
  ShoppingCart,
  AlertTriangle,
  Settings,
  Truck,
  Zap,
  CreditCard,
  History,
  LayoutDashboard,
  FileDown,
  FileUp,
  Activity,
  CheckCircle,
} from "lucide-react"
import { useAlert } from "@/components/alert-system/alert-context";
import { createAlertHelpers } from "@/components/alert-system/alert-utils";

// Enhanced notifications data
const notifications = [
  {
    id: 1,
    type: "success",
    title: "System Status",
    message: "All systems operational and running smoothly",
    time: "2 minutes ago",
    read: false,
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "warning",
    title: "Low Stock Alert",
    message: "5 products have stock levels below minimum threshold",
    time: "15 minutes ago",
    read: false,
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "info",
    title: "New Feature Available",
    message: "Try the new advanced reporting dashboard",
    time: "1 hour ago",
    read: true,
    icon: LayoutDashboard,
  },
  {
    id: 4,
    type: "warning",
    title: "Pending Approvals",
    message: "3 purchase orders awaiting your approval",
    time: "3 hours ago",
    read: false,
    icon: ShoppingCart,
  }
]

// Enhanced products for search
const demoProducts = [
  { id: 1, name: "Wireless Keyboard", category: "Electronics", price: "$59.99", stock: 23, sku: "WK-2023", location: "Warehouse A" },
  { id: 2, name: "Ergonomic Mouse", category: "Electronics", price: "$39.99", stock: 15, sku: "EM-2023", location: "Warehouse B" },
  { id: 3, name: "Monitor Stand", category: "Furniture", price: "$89.99", stock: 7, sku: "MS-2023", location: "Warehouse A" },
]

// Enhanced add options
const addOptions = [
  {
    name: "Quick Product",
    icon: Package,
    description: "Add a single product",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    shortcut: "⌘P"
  },
  {
    name: "Bulk Import",
    icon: FileDown,
    description: "Import from CSV/Excel",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    shortcut: "⌘I"
  },
  {
    name: "Purchase Order",
    icon: ShoppingCart,
    description: "Create new PO",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    shortcut: "⌘O"
  },
  {
    name: "Stock Transfer",
    icon: Truck,
    description: "Move between locations",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    shortcut: "⌘T"
  }
]

// Enhanced quick actions
const quickActions = [
  {
    name: "Low Stock",
    icon: AlertTriangle,
    description: "View critical items",
    color: "text-red-600",
    bgColor: "bg-red-50",
    action: () => console.log("Showing low stock...")
  },
  {
    name: "Recent Activity",
    icon: History,
    description: "View audit log",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    action: () => console.log("Showing activity...")
  },
  {
    name: "Export Data",
    icon: FileUp,
    description: "Export to CSV",
    color: "text-green-600",
    bgColor: "bg-green-50",
    action: () => console.log("Exporting data...")
  },
  {
    name: "System Status",
    icon: Activity,
    description: "Check system health",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    action: () => console.log("Checking system status...")
  }
]

interface HeaderProps {
  isMobileMenuOpen?: boolean
  setIsMobileMenuOpen?: (open: boolean) => void
  onViewModeChange?: (mode: 'grid' | 'list') => void
  onSortChange?: (sort: string) => void
  onExport?: () => void
}

export function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const [notificationsList, setNotificationsList] = React.useState(notifications)
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false)
  const [isAddMenuOpen, setIsAddMenuOpen] = React.useState(false)
  const [isQuickActionsOpen, setIsQuickActionsOpen] = React.useState(false)
  const [isProfileOpen, setIsProfileOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<typeof demoProducts>([])
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const { showAlert } = useAlert();
  const alert = createAlertHelpers(showAlert);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const unreadCount = notificationsList.filter(n => !n.read).length

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const filtered = demoProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const markAsRead = (id: number) => {
    setNotificationsList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotificationsList(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      alert.logoutSuccess();
    } catch {
      showAlert('error', 'Logout Failed', 'An error occurred during logout.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Side - Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden h-9 w-9 p-0 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-2xl mx-4 relative">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              type="text"
              placeholder="Search products, SKUs, locations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="pl-10 pr-12 h-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-sm transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-xs text-gray-500">
                ⌘K
              </kbd>
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Search Results Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              <div className="p-2 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Products ({searchResults.length})</p>
              </div>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                      <div className="flex gap-2 flex-wrap">
                        <p className="text-xs text-gray-500">{product.sku}</p>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-gray-500">{product.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <div className={`w-2 h-2 rounded-full ${product.stock > 20 ? 'bg-green-500' : product.stock > 10 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="text-xs text-gray-500">{product.stock} in stock</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <DropdownMenu open={isQuickActionsOpen} onOpenChange={setIsQuickActionsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Zap className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal p-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900">Quick Actions</span>
                </div>
              </DropdownMenuLabel>
              <div className="p-2 grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="flex flex-col items-start p-3 h-auto hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={action.action}
                  >
                    <div className={`p-2 ${action.bgColor} rounded-lg mb-2`}>
                      <action.icon className={`h-4 w-4 ${action.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">{action.name}</div>
                      <div className="text-xs text-gray-600">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add Options Dropdown */}
          <DropdownMenu open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="h-9 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal p-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">Create New</span>
                </div>
              </DropdownMenuLabel>
              <div className="p-2 grid grid-cols-2 gap-2">
                {addOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="flex flex-col items-start p-3 h-auto hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className={`p-2 ${option.bgColor} rounded-lg mb-2`}>
                      <option.icon className={`h-4 w-4 ${option.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">{option.name}</div>
                      <div className="text-xs text-gray-600">{option.description}</div>
                    </div>
                    <kbd className="mt-2 inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-xs text-gray-500">
                      {option.shortcut}
                    </kbd>
                  </Button>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative h-9 w-9 p-0 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 border-2 border-white flex items-center justify-center font-bold"
                    variant="destructive"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-96 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg max-h-[28rem] overflow-hidden"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal p-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">Notifications</span>
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 h-auto rounded transition-colors"
                    >
                      Mark all read
                    </Button>
                  )}
                </div>
              </DropdownMenuLabel>

              {notificationsList.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 max-h-[24rem] overflow-y-auto">
                  {notificationsList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'success' ? 'bg-green-100 text-green-600' :
                          notification.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <notification.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-6 w-6 p-0 text-gray-400 hover:text-blue-600 rounded transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500">{notification.time}</p>
                            {!notification.read && (
                              <span className="inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 w-9 p-0 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarFallback className="bg-blue-600 text-white font-semibold">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-600">Inventory Manager</p>
                    <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <div className="py-1">
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg mx-1 transition-colors">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg mx-1 transition-colors">
                  <Settings className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg mx-1 transition-colors">
                  <CreditCard className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Billing</span>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="bg-gray-200 mx-2" />

              <div className="py-1">
                <DropdownMenuItem
                  className="flex items-center gap-3 p-3 hover:bg-red-50 cursor-pointer text-red-600 hover:text-red-700 rounded-lg mx-1 transition-colors"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}