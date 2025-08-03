"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface AlertState {
  id: string
  type: AlertType
  title: string
  message: string
  show: boolean
  duration?: number
  dismissible?: boolean
}

interface AlertContextType {
  alerts: AlertState[]
  showAlert: (type: AlertType, title: string, message: string, options?: {
    duration?: number
    dismissible?: boolean
  }) => void
  hideAlert: (id: string) => void
  clearAllAlerts: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}

interface AlertProviderProps {
  children: React.ReactNode
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxAlerts?: number
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ 
  children, 
  position = 'top-right',
  maxAlerts = 5 
}) => {
  const [alerts, setAlerts] = useState<AlertState[]>([])

  const hideAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, show: false } : alert
    ))
    
    // Remove from DOM after animation
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id))
    }, 300)
  }, [])

  const showAlert = useCallback((
    type: AlertType, 
    title: string, 
    message: string, 
    options: { duration?: number; dismissible?: boolean } = {}
  ) => {
    const id = Math.random().toString(36).substr(2, 9)
    const { duration = 5000, dismissible = true } = options
    
    const newAlert: AlertState = { 
      id, 
      type, 
      title, 
      message, 
      show: true,
      duration,
      dismissible
    }
    
    setAlerts(prev => {
      const updated = [...prev, newAlert]
      // Keep only the latest alerts up to maxAlerts
      return updated.slice(-maxAlerts)
    })
    
    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(() => {
        hideAlert(id)
      }, duration)
    }
  }, [hideAlert, maxAlerts])

  const clearAllAlerts = useCallback(() => {
    setAlerts([])
  }, [])

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4" />
      case 'error':
        return <AlertCircle className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'info':
        return <Info className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getAlertVariant = (type: AlertType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4'
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2'
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'top-right':
      default:
        return 'top-4 right-4'
    }
  }

  return (
    <AlertContext.Provider value={{ alerts, showAlert, hideAlert, clearAllAlerts }}>
      {children}
      
      {/* Alert Container */}
      <div className={`fixed z-50 space-y-2 w-80 ${getPositionClasses()}`}>
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: position.includes('right') ? 300 : -300, y: position.includes('bottom') ? 20 : -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: position.includes('right') ? 300 : -300, y: position.includes('bottom') ? 20 : -20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="cursor-pointer"
              onClick={() => alert.dismissible && hideAlert(alert.id)}
            >
              <Alert className={`${getAlertVariant(alert.type)} border shadow-lg relative`}>
                {alert.dismissible && (
                  <button
                    title="Close"
                    onClick={(e) => {
                      e.stopPropagation()
                      hideAlert(alert.id)
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <div className="flex items-center space-x-2 pr-6">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <AlertTitle className="font-medium">{alert.title}</AlertTitle>
                    <AlertDescription className="text-sm">
                      {alert.message}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  )
} 