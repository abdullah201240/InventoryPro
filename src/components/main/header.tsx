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
  Activity,
  CheckCircle,
  Loader2,
  Clock,
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

// Enhanced products for search with more fields
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  sku: string;
  location: string;
  description?: string;
  supplier?: string;
  lastUpdated?: string;
}

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

// Enhanced quick actions with violations and better categorization
const quickActions = [
  {
    name: "Critical Violations",
    icon: AlertTriangle,
    description: "High priority issues",
    color: "text-red-600",
    bgColor: "bg-red-50",
    count: 5,
    severity: "critical",
    action: () => console.log("Showing critical violations...")
  },
  {
    name: "Stock Violations",
    icon: Package,
    description: "Low stock alerts",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    count: 12,
    severity: "warning",
    action: () => console.log("Showing stock violations...")
  },
  {
    name: "Quality Violations",
    icon: CheckCircle,
    description: "Quality control issues",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    count: 3,
    severity: "warning",
    action: () => console.log("Showing quality violations...")
  },
  {
    name: "Compliance Violations",
    icon: FileDown,
    description: "Regulatory issues",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    count: 2,
    severity: "critical",
    action: () => console.log("Showing compliance violations...")
  },
  {
    name: "System Status",
    icon: Activity,
    description: "System health check",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    count: 0,
    severity: "info",
    action: () => console.log("Checking system status...")
  },
  {
    name: "Recent Activity",
    icon: History,
    description: "View audit log",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    count: 0,
    severity: "info",
    action: () => console.log("Showing activity...")
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
  const [searchResults, setSearchResults] = React.useState<Product[]>([])
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [isSearchLoading, setIsSearchLoading] = React.useState(false)
  const [searchHistory, setSearchHistory] = React.useState<string[]>([])
  const [selectedResultIndex, setSelectedResultIndex] = React.useState(-1)
  const { showAlert } = useAlert();
  const alert = createAlertHelpers(showAlert);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const unreadCount = notificationsList.filter(n => !n.read).length

  // Simulated API call for search
  const searchProducts = async (query: string): Promise<Product[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock API response - replace with actual API call
    const mockProducts: Product[] = [
      { id: 1, name: "Wireless Keyboard", category: "Electronics", price: "$59.99", stock: 23, sku: "WK-2023", location: "Warehouse A", description: "Ergonomic wireless keyboard", supplier: "TechCorp", lastUpdated: "2024-01-15" },
      { id: 2, name: "Ergonomic Mouse", category: "Electronics", price: "$39.99", stock: 15, sku: "EM-2023", location: "Warehouse B", description: "Comfortable ergonomic mouse", supplier: "TechCorp", lastUpdated: "2024-01-14" },
      { id: 3, name: "Monitor Stand", category: "Furniture", price: "$89.99", stock: 7, sku: "MS-2023", location: "Warehouse A", description: "Adjustable monitor stand", supplier: "FurniTech", lastUpdated: "2024-01-13" },
      { id: 4, name: "USB-C Cable", category: "Electronics", price: "$12.99", stock: 45, sku: "UC-2023", location: "Warehouse C", description: "High-speed USB-C cable", supplier: "CablePro", lastUpdated: "2024-01-12" },
      { id: 5, name: "Desk Lamp", category: "Furniture", price: "$29.99", stock: 12, sku: "DL-2023", location: "Warehouse B", description: "LED desk lamp", supplier: "LightTech", lastUpdated: "2024-01-11" },
    ];

    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.location.toLowerCase().includes(query.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setSelectedResultIndex(-1);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim()) {
      // Add to search history
      if (!searchHistory.includes(query)) {
        setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
      }

      // Debounce search
      searchTimeoutRef.current = setTimeout(async () => {
        setIsSearchLoading(true);
        try {
          const results = await searchProducts(query);
          setSearchResults(results);
        } catch  {
          showAlert('error', 'Search Error', 'Failed to search products. Please try again.');
          setSearchResults([]);
        } finally {
          setIsSearchLoading(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchFocused || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedResultIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedResultIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedResultIndex >= 0 && selectedResultIndex < searchResults.length) {
          handleResultClick(searchResults[selectedResultIndex]);
        }
        break;
      case 'Escape':
        setIsSearchFocused(false);
        setSearchResults([]);
        setSelectedResultIndex(-1);
        break;
    }
  };

  const handleResultClick = (product: Product) => {
    // Handle product selection - you can navigate to product details or perform other actions
    showAlert('success', 'Product Selected', `Selected: ${product.name}`);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
    setSelectedResultIndex(-1);
  };

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedResultIndex(-1);
  };

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
    <header className="sticky top-0 z-50 w-full bg-blue-50 border-b border-blue-200">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Side - Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden h-9 w-9 p-0 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-4 relative">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              type="text"
              placeholder="Search products, SKUs, locations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
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
                  onClick={clearSearch}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Search Results Dropdown */}
          {isSearchFocused && (searchResults.length > 0 || isSearchLoading || (searchQuery && searchHistory.length > 0)) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg  z-50 max-h-80 overflow-y-auto">
              {isSearchLoading ? (
                <div className="p-4 text-center">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Products ({searchResults.length})</p>
                  </div>
                  {searchResults.map((product, index) => (
                    <div
                      key={product.id}
                      className={`flex items-center justify-between p-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                        index === selectedResultIndex ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleResultClick(product)}
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
                            <p className="text-xs text-gray-500">{product.category}</p>
                            <span className="text-xs text-gray-400">•</span>
                            <p className="text-xs text-gray-500">{product.location}</p>
                          </div>
                          {product.description && (
                            <p className="text-xs text-gray-600 mt-1">{product.description}</p>
                          )}
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
                </>
              ) : searchQuery && searchHistory.length > 0 ? (
                <>
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Searches</p>
                  </div>
                  {searchHistory.map((query, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      onClick={() => handleHistoryClick(query)}
                    >
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{query}</span>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Actions */}
          <DropdownMenu open={isQuickActionsOpen} onOpenChange={setIsQuickActionsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative h-9 px-2 sm:px-3 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Zap className="h-4 w-4 mr-1 sm:mr-2 text-blue-600" />
                <span className="text-sm font-medium hidden sm:inline">Quick</span>
                {quickActions.filter(a => a.count > 0).length > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 border-2 border-white flex items-center justify-center font-bold"
                    variant="destructive"
                  >
                    {quickActions.filter(a => a.count > 0).length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-100 mt-2 bg-white border border-gray-200 rounded-xl max-h-[80vh] overflow-y-auto"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="text-base font-semibold text-gray-900">Quick Actions</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {quickActions.filter(a => a.count > 0).length} active
                  </Badge>
                </div>
              </DropdownMenuLabel>
              
              {/* Critical Violations Section */}
              <div className="p-3">
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">Critical Violations</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickActions.filter(action => action.severity === "critical").map((action, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="flex flex-col items-start p-3 h-auto hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                        onClick={action.action}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <div className={`p-2 ${action.bgColor} rounded-lg`}>
                            <action.icon className={`h-4 w-4 ${action.color}`} />
                          </div>
                          {action.count > 0 && (
                            <Badge variant="destructive" className="text-xs font-bold">
                              {action.count}
                            </Badge>
                          )}
                        </div>
                        <div className="text-left w-full">
                          <div className="text-sm font-semibold text-gray-900">{action.name}</div>
                          <div className="text-xs text-gray-600">{action.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Warning Violations Section */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">Warning Violations</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickActions.filter(action => action.severity === "warning").map((action, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="flex flex-col items-start p-3 h-auto hover:bg-orange-50 rounded-lg transition-colors border border-orange-100"
                        onClick={action.action}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <div className={`p-2 ${action.bgColor} rounded-lg`}>
                            <action.icon className={`h-4 w-4 ${action.color}`} />
                          </div>
                          {action.count > 0 && (
                            <Badge className="text-xs font-bold bg-orange-100 text-orange-700 border-orange-200">
                              {action.count}
                            </Badge>
                          )}
                        </div>
                        <div className="text-left w-full">
                          <div className="text-sm font-semibold text-gray-900">{action.name}</div>
                          <div className="text-xs text-gray-600">{action.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Info Actions Section */}
                <div>
                  <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">System Actions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickActions.filter(action => action.severity === "info").map((action, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="flex flex-col items-start p-3 h-auto hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                        onClick={action.action}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <div className={`p-2 ${action.bgColor} rounded-lg`}>
                            <action.icon className={`h-4 w-4 ${action.color}`} />
                          </div>
                          {action.count > 0 && (
                            <Badge className="text-xs font-bold bg-blue-100 text-blue-700 border-blue-200">
                              {action.count}
                            </Badge>
                          )}
                        </div>
                        <div className="text-left w-full">
                          <div className="text-sm font-semibold text-gray-900">{action.name}</div>
                          <div className="text-xs text-gray-600">{action.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add Options Dropdown */}
          <DropdownMenu open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="h-9 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg  transition-all duration-200 "
              >
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-100 mt-2 bg-white border border-gray-200 rounded-xl max-h-[80vh] overflow-y-auto"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <span className="text-base font-semibold text-gray-900">Create New</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {addOptions.length} options
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <div className="p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {addOptions.map((option, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="flex flex-col items-start p-3 h-auto hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={`p-2 ${option.bgColor} rounded-lg`}>
                          <option.icon className={`h-4 w-4 ${option.color}`} />
                        </div>
                        <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-xs text-gray-500">
                          {option.shortcut}
                        </kbd>
                      </div>
                      <div className="text-left w-full">
                        <div className="text-sm font-semibold text-gray-900">{option.name}</div>
                        <div className="text-xs text-gray-600">{option.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative h-9 px-2 sm:px-3 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Bell className="h-4 w-4 mr-1 sm:mr-2 text-blue-600" />
                <span className="text-sm font-medium hidden sm:inline">Notifications</span>
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
              className="w-100 mt-2 bg-white border border-gray-200 rounded-xl max-h-[80vh] overflow-y-auto"
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
                className="h-9 px-2 sm:px-3 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Avatar className="h-6 w-6 mr-1 sm:mr-2">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">JD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-blue-700 hidden sm:inline">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 mt-2 bg-white border border-gray-200 rounded-lg max-h-[80vh] overflow-y-auto"
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