"use client"

import { useAlert } from './alert-context'
import { createAlertHelpers, ALERT_MESSAGES, ALERT_TITLES } from './alert-utils'
import { AlertType } from './alert-context'

// Define a proper error type
interface ApiError {
  message?: string
  response?: {
    status?: number
    data?: unknown
  }
}

export const useAlertSystem = () => {
  const { showAlert, hideAlert, clearAllAlerts, alerts } = useAlert()
  
  // Create helper functions
  const helpers = createAlertHelpers(showAlert)
  
  return {
    // Basic alert functions
    showAlert,
    hideAlert,
    clearAllAlerts,
    alerts,
    
    // Helper functions for common patterns
    ...helpers,
    
    // Additional utility functions
    showCustomAlert: (
      type: AlertType, 
      title: string, 
      message: string, 
      options?: { duration?: number; dismissible?: boolean }
    ) => {
      showAlert(type, title, message, options)
    },
    
    // API response handlers
    handleApiSuccess: (message?: string) => {
      helpers.success(ALERT_TITLES.SUCCESS, message || ALERT_MESSAGES.SAVE_SUCCESS)
    },
    
    handleApiError: (error: ApiError, customMessage?: string) => {
      let title: string = ALERT_TITLES.ERROR
      let message = customMessage || ALERT_MESSAGES.SERVER_ERROR
      
      if (error?.response?.status === 401) {
        title = ALERT_TITLES.UNAUTHORIZED
        message = ALERT_MESSAGES.UNAUTHORIZED
      } else if (error?.response?.status === 404) {
        title = ALERT_TITLES.NOT_FOUND
        message = ALERT_MESSAGES.NOT_FOUND
      } else if (error?.response?.status === 422) {
        title = ALERT_TITLES.VALIDATION_ERROR
        message = ALERT_MESSAGES.VALIDATION_ERROR
      } else if (error?.message) {
        message = error.message
      }
      
      helpers.error(title, message)
    },
    
    // Form validation helpers
    showValidationError: (fieldName?: string) => {
      const message = fieldName 
        ? `Please check the ${fieldName} field and try again. 📝`
        : ALERT_MESSAGES.VALIDATION_ERROR
      helpers.error(ALERT_TITLES.VALIDATION_ERROR, message)
    },
    
    // Loading state helpers
    showLoading: (message?: string) => {
      helpers.info(ALERT_TITLES.LOADING, message || ALERT_MESSAGES.LOADING, { duration: 0 })
    },
    
    hideLoading: () => {
      // This will be handled by the alert system automatically
      // You can call clearAllAlerts() if needed
    },
    
    // Confirmation helpers
    showConfirmation: (message: string) => {
      // For now, we'll show a warning alert
      // In a real implementation, you might want to use a modal or dialog
      helpers.warning(ALERT_TITLES.CONFIRMATION, message)
      // You could implement a confirmation dialog here
    },
    
    // Toast-style alerts (shorter duration)
    showToast: (type: AlertType, message: string) => {
      const titles = {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Info'
      }
      showAlert(type, titles[type], message, { duration: 3000 })
    },
    
    // Success toast
    showSuccessToast: (message: string) => {
      showAlert('success', 'Success', message, { duration: 3000 })
    },
    
    // Error toast
    showErrorToast: (message: string) => {
      showAlert('error', 'Error', message, { duration: 3000 })
    },
    
    // Warning toast
    showWarningToast: (message: string) => {
      showAlert('warning', 'Warning', message, { duration: 3000 })
    },
    
    // Info toast
    showInfoToast: (message: string) => {
      showAlert('info', 'Info', message, { duration: 3000 })
    }
  }
} 