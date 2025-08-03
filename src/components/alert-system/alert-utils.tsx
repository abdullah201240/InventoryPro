import { AlertType } from './alert-context'

// Define alert options interface
interface AlertOptions {
  duration?: number
  dismissible?: boolean
}

// Common alert messages and titles
export const ALERT_MESSAGES = {
  // Success messages
  LOGIN_SUCCESS: 'Successfully logged in. Redirecting... 🎉',
  LOGOUT_SUCCESS: 'Successfully logged out. See you soon! 👋',
  SAVE_SUCCESS: 'Data saved successfully! ✅',
  UPDATE_SUCCESS: 'Data updated successfully! ✅',
  DELETE_SUCCESS: 'Item deleted successfully! ✅',
  UPLOAD_SUCCESS: 'File uploaded successfully! 📁',
  EMAIL_SENT: 'Email sent successfully! 📧',
  PASSWORD_RESET: 'Password reset email sent! 🔐',
  
  // Error messages
  LOGIN_FAILED: 'Invalid email or password. Please try again. 😞',
  NETWORK_ERROR: 'Network error. Please check your connection. 🌐',
  SERVER_ERROR: 'Server error. Please try again later. 🔧',
  VALIDATION_ERROR: 'Please check your input and try again. 📝',
  UNAUTHORIZED: 'You are not authorized to perform this action. 🚫',
  NOT_FOUND: 'The requested resource was not found. 🔍',
  UPLOAD_FAILED: 'File upload failed. Please try again. 📁',
  EMAIL_FAILED: 'Failed to send email. Please try again. 📧',
  
  // Warning messages
  UNSAVED_CHANGES: 'You have unsaved changes. Are you sure you want to leave? ⚠️',
  CONFIRM_DELETE: 'Are you sure you want to delete this item? 🗑️',
  SESSION_EXPIRED: 'Your session has expired. Please log in again. ⏰',
  RECAPTCHA_REQUIRED: 'Please verify that you are not a robot! 🤖',
  
  // Info messages
  LOADING: 'Please wait while we process your request... ⏳',
  REDIRECTING: 'Redirecting to the requested page... 🔄',
  PROCESSING: 'Processing your request... ⚙️',
} as const

export const ALERT_TITLES = {
  // Success titles
  SUCCESS: 'Success!',
  WELCOME: 'Welcome Back!',
  SAVED: 'Saved!',
  UPDATED: 'Updated!',
  DELETED: 'Deleted!',
  UPLOADED: 'Uploaded!',
  SENT: 'Sent!',
  
  // Error titles
  ERROR: 'Error',
  FAILED: 'Failed',
  NETWORK_ERROR: 'Network Error',
  SERVER_ERROR: 'Server Error',
  VALIDATION_ERROR: 'Validation Error',
  UNAUTHORIZED: 'Unauthorized',
  NOT_FOUND: 'Not Found',
  
  // Warning titles
  WARNING: 'Warning',
  CONFIRMATION: 'Confirmation Required',
  SESSION_EXPIRED: 'Session Expired',
  VERIFICATION_REQUIRED: 'Verification Required',
  
  // Info titles
  INFO: 'Information',
  LOADING: 'Loading',
  PROCESSING: 'Processing',
} as const

// Utility functions for common alert patterns
export const createAlertHelpers = (showAlert: (type: AlertType, title: string, message: string, options?: AlertOptions) => void) => {
  return {
    // Success alerts
    success: (title: string, message: string, options?: AlertOptions) => 
      showAlert('success', title, message, options),
    
    error: (title: string, message: string, options?: AlertOptions) => 
      showAlert('error', title, message, options),
    
    warning: (title: string, message: string, options?: AlertOptions) => 
      showAlert('warning', title, message, options),
    
    info: (title: string, message: string, options?: AlertOptions) => 
      showAlert('info', title, message, options),
    
    // Common success patterns
    loginSuccess: () => 
      showAlert('success', ALERT_TITLES.WELCOME, ALERT_MESSAGES.LOGIN_SUCCESS),
    
    logoutSuccess: () => 
      showAlert('success', 'Goodbye!', ALERT_MESSAGES.LOGOUT_SUCCESS),
    
    saveSuccess: () => 
      showAlert('success', ALERT_TITLES.SAVED, ALERT_MESSAGES.SAVE_SUCCESS),
    
    updateSuccess: () => 
      showAlert('success', ALERT_TITLES.UPDATED, ALERT_MESSAGES.UPDATE_SUCCESS),
    
    deleteSuccess: () => 
      showAlert('success', ALERT_TITLES.DELETED, ALERT_MESSAGES.DELETE_SUCCESS),
    
    uploadSuccess: () => 
      showAlert('success', ALERT_TITLES.UPLOADED, ALERT_MESSAGES.UPLOAD_SUCCESS),
    
    emailSent: () => 
      showAlert('success', ALERT_TITLES.SENT, ALERT_MESSAGES.EMAIL_SENT),
    
    // Common error patterns
    loginFailed: () => 
      showAlert('error', 'Login Failed', ALERT_MESSAGES.LOGIN_FAILED),
    
    networkError: () => 
      showAlert('error', ALERT_TITLES.NETWORK_ERROR, ALERT_MESSAGES.NETWORK_ERROR),
    
    serverError: () => 
      showAlert('error', ALERT_TITLES.SERVER_ERROR, ALERT_MESSAGES.SERVER_ERROR),
    
    validationError: () => 
      showAlert('error', ALERT_TITLES.VALIDATION_ERROR, ALERT_MESSAGES.VALIDATION_ERROR),
    
    unauthorized: () => 
      showAlert('error', ALERT_TITLES.UNAUTHORIZED, ALERT_MESSAGES.UNAUTHORIZED),
    
    notFound: () => 
      showAlert('error', ALERT_TITLES.NOT_FOUND, ALERT_MESSAGES.NOT_FOUND),
    
    uploadFailed: () => 
      showAlert('error', 'Upload Failed', ALERT_MESSAGES.UPLOAD_FAILED),
    
    emailFailed: () => 
      showAlert('error', 'Email Failed', ALERT_MESSAGES.EMAIL_FAILED),
    
    // Common warning patterns
    unsavedChanges: () => 
      showAlert('warning', ALERT_TITLES.WARNING, ALERT_MESSAGES.UNSAVED_CHANGES),
    
    confirmDelete: () => 
      showAlert('warning', ALERT_TITLES.CONFIRMATION, ALERT_MESSAGES.CONFIRM_DELETE),
    
    sessionExpired: () => 
      showAlert('warning', ALERT_TITLES.SESSION_EXPIRED, ALERT_MESSAGES.SESSION_EXPIRED),
    
    recaptchaRequired: () => 
      showAlert('warning', ALERT_TITLES.VERIFICATION_REQUIRED, ALERT_MESSAGES.RECAPTCHA_REQUIRED),
    
    // Common info patterns
    loading: () => 
      showAlert('info', ALERT_TITLES.LOADING, ALERT_MESSAGES.LOADING, { duration: 0 }),
    
    processing: () => 
      showAlert('info', ALERT_TITLES.PROCESSING, ALERT_MESSAGES.PROCESSING, { duration: 0 }),
    
    redirecting: () => 
      showAlert('info', 'Redirecting', ALERT_MESSAGES.REDIRECTING),
  }
}

// Type for the alert helpers
export type AlertHelpers = ReturnType<typeof createAlertHelpers> 