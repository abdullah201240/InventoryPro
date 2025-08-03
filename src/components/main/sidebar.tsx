"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Package, 
  ShoppingCart, 
  Settings, 
  BarChart3, 

  X,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean
  setIsCollapsed?: (collapsed: boolean) => void
  isMobileMenuOpen?: boolean
  setIsMobileMenuOpen?: (open: boolean) => void
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Purchase Management",
    icon: ShoppingCart,
    items: [
      {
        title: "Purchase Report",
        href: "/purchase/report",
      },
      {
        title: "Purchase Entry",
        href: "/purchase/entry",
      },
      {
        title: "Purchase Return",
        href: "/purchase/return-report",
      },
      {
        title: "Return Entry",
        href: "/purchase/return-entry",
      },
      {
        title: "Accounts Payable",
        href: "/purchase/accounts-payable",
      },
      {
        title: "Payment Report",
        href: "/purchase/payment-report",
      },
      {
        title: "Payment Entry",
        href: "/purchase/payment-entry",
      },
      {
        title: "Supplier List",
        href: "/purchase/suppliers",
      },
      {
        title: "Add Supplier",
        href: "/purchase/add-supplier",
      },
    ],
  },
  {
    title: "Sales Management",
    icon: Package,
    items: [
      {
        title: "Sales Report",
        href: "/sales/report",
      },
      {
        title: "Sales Entry",
        href: "/sales/entry",
      },
      {
        title: "Sales Return",
        href: "/sales/return-entry",
      },
      {
        title: "Customer Sample",
        href: "/sales/customer-sample-entry",
      },
      {
        title: "Sample Return",
        href: "/sales/customer-sample-return",
      },
      {
        title: "Accounts Receivable",
        href: "/sales/accounts-receivable",
      },
      {
        title: "Payment Entry",
        href: "/sales/payment-entry",
      },
      {
        title: "Customer List",
        href: "/sales/customers",
      },
      {
        title: "Add Customer",
        href: "/sales/add-customer",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      {
        title: "Add Category",
        href: "/settings/add-category",
      },
      {
        title: "Add Sub-Category",
        href: "/settings/add-subcategory",
      },
      {
        title: "Add Unit",
        href: "/settings/add-unit",
      },
    ],
  },
  {
    title: "Products",
    icon: Package,
    items: [
      {
        title: "Product List",
        href: "/products",
      },
      {
        title: "Add Product",
        href: "/products/add",
      },
      {
        title: "Update Price",
        href: "/products/update-price",
      },
    ],
  },
]

export function Sidebar({ className, isCollapsed = false, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname()
  const [openSubmenus, setOpenSubmenus] = React.useState<{ [key: number]: boolean }>({})

  // Auto-open submenu if current path is inside it
  React.useEffect(() => {
    const newOpenSubmenus: { [key: number]: boolean } = {}
    navigationItems.forEach((item, index) => {
      if (item.items) {
        const hasActiveChild = item.items.some(subItem => pathname === subItem.href)
        if (hasActiveChild) {
          newOpenSubmenus[index] = true
        }
      }
    })
    setOpenSubmenus(prev => ({ ...prev, ...newOpenSubmenus }))
  }, [pathname])

  const toggleSubmenu = (index: number) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const SidebarContent = () => (
    <div className={cn("flex h-full flex-col bg-white", className)}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-lg shadow-md">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <h1 className="text-gray-900 font-semibold text-sm truncate">Inventory System</h1>
                <p className="text-gray-600 text-xs truncate">Management Portal</p>
              </div>
            )}
          </div>
        
        {/* Desktop collapse/expand button */}
        {setIsCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-8 w-8 p-0 text-blue-600 hover:bg-blue-100 transition-all duration-200 flex-shrink-0"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
        
        {/* Mobile close button */}
        {setIsMobileMenuOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden h-8 w-8 p-0 text-blue-600 hover:bg-blue-100 transition-all duration-200 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea 
          className="h-full w-full"
          style={{ 
            height: 'calc(100vh - 4rem)',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="px-3 py-4">
            <nav className="space-y-1">
              {navigationItems.map((item, index) => (
                <div key={index} className="group">
                  {item.href ? (
                    // Single menu item
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen?.(false)}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-gray-100",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                          : "text-gray-700 hover:text-gray-900"
                      )}
                    >
                      <div className={cn(
                        "p-1.5 rounded-md transition-all duration-200 flex-shrink-0",
                        pathname === item.href
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-500 group-hover:text-gray-700"
                      )}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      {!isCollapsed && (
                        <span className="transition-all duration-200 break-words flex-1 leading-tight">{item.title}</span>
                      )}
                    </Link>
                  ) : (
                    // Parent menu item with submenu
                    <Collapsible 
                      open={!isCollapsed && openSubmenus[index]} 
                      onOpenChange={() => !isCollapsed && toggleSubmenu(index)}
                    >
                      <CollapsibleTrigger asChild>
                        <div
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-100",
                            openSubmenus[index] && !isCollapsed ? "bg-gray-100" : ""
                          )}
                          onClick={() => isCollapsed && setIsCollapsed?.(false)}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="p-1.5 rounded-md text-gray-500 flex-shrink-0">
                              <item.icon className="h-4 w-4" />
                            </div>
                            {!isCollapsed && (
                              <span className="text-gray-700 break-words flex-1 leading-tight">{item.title}</span>
                            )}
                          </div>
                          {!isCollapsed && item.items && (
                            <ChevronDown 
                              className={cn(
                                "h-4 w-4 text-gray-500 transition-all duration-200 flex-shrink-0",
                                openSubmenus[index] ? "rotate-180" : ""
                              )} 
                            />
                          )}
                        </div>
                      </CollapsibleTrigger>
                      
                      {!isCollapsed && item.items && (
                        <CollapsibleContent className="space-y-1 mt-1">
                          <div className="ml-4 pl-4 border-l border-gray-200 space-y-0.5">
                            {item.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen?.(false)}
                                className={cn(
                                  "group relative flex items-center gap-2 px-2 py-1 text-sm transition-all duration-200 hover:text-gray-900",
                                  pathname === subItem.href
                                    ? "text-blue-700 font-medium"
                                    : "text-gray-600"
                                )}
                              >
                                <div className={cn(
                                  "flex-shrink-0 w-1 h-1 rounded-full",
                                  pathname === subItem.href
                                    ? "bg-blue-700"
                                    : "bg-gray-400"
                                )} />
                                <span className="transition-all duration-200 flex-1 leading-tight break-words">{subItem.title}</span>
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>

      {/* Collapsed tooltip hint */}
      {isCollapsed && (
        <div className="hidden lg:block px-3 py-2 text-center">
          <div className="text-xs text-gray-600 bg-gray-100 rounded-md py-1 px-2">
            Expand sidebar
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex relative z-30">
        <div className={cn(
          "flex flex-col border-r border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}>
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent 
          side="left" 
          className="w-72 p-0 bg-white border-0 shadow-xl"
          onInteractOutside={() => setIsMobileMenuOpen?.(false)}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

     
    </>
  )
}