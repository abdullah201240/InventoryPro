# Centralized Alert System

This is a centralized alert system built with shadcn/ui components that provides consistent alert notifications across your entire application.

## Features

- 🎯 **Centralized Management**: All alerts are managed from a single context
- 🎨 **Consistent Styling**: Uses shadcn/ui components for consistent design
- ⚡ **Easy to Use**: Simple hook-based API
- 🎭 **Smooth Animations**: Built-in Framer Motion animations
- 🔧 **Customizable**: Configurable position, duration, and styling
- 📱 **Responsive**: Works on all screen sizes
- 🎪 **Multiple Types**: Success, Error, Warning, and Info alerts
- 🕐 **Auto-dismiss**: Configurable auto-dismiss timing
- 🖱️ **Dismissible**: Click to dismiss alerts
- 📍 **Positionable**: Choose from 6 different positions

## Quick Start

### 1. Setup Provider

The `AlertProvider` is already set up in your `layout.tsx`:

```tsx
import { AlertProvider } from "@/components/alert-system"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AlertProvider position="top-right" maxAlerts={5}>
          {children}
        </AlertProvider>
      </body>
    </html>
  )
}
```

### 2. Use in Components

```tsx
import { useAlertSystem } from "@/components/alert-system"

function MyComponent() {
  const { 
    success, 
    error, 
    warning, 
    info,
    loginSuccess,
    loginFailed,
    serverError,
    // ... and many more helpers
  } = useAlertSystem()

  const handleSubmit = async () => {
    try {
      await saveData()
      success("Saved!", "Data saved successfully! ✅")
    } catch (err) {
      error("Error", "Failed to save data 😞")
    }
  }

  return (
    <button onClick={handleSubmit}>
      Save Data
    </button>
  )
}
```

## API Reference

### useAlertSystem Hook

The main hook that provides all alert functionality:

```tsx
const {
  // Basic functions
  showAlert,
  hideAlert,
  clearAllAlerts,
  alerts,
  
  // Type-specific functions
  success,
  error,
  warning,
  info,
  
  // Predefined helpers
  loginSuccess,
  loginFailed,
  serverError,
  networkError,
  validationError,
  unauthorized,
  notFound,
  saveSuccess,
  updateSuccess,
  deleteSuccess,
  uploadSuccess,
  emailSent,
  recaptchaRequired,
  unsavedChanges,
  confirmDelete,
  sessionExpired,
  
  // Utility functions
  showCustomAlert,
  handleApiSuccess,
  handleApiError,
  showValidationError,
  showLoading,
  hideLoading,
  showConfirmation,
  showToast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
} = useAlertSystem()
```

### AlertProvider Props

```tsx
<AlertProvider
  position="top-right" // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxAlerts={5} // Maximum number of alerts to show at once
>
  {children}
</AlertProvider>
```

## Usage Examples

### Basic Alerts

```tsx
const { success, error, warning, info } = useAlertSystem()

// Success alert
success("Success!", "Operation completed successfully! ✅")

// Error alert
error("Error", "Something went wrong! 😞")

// Warning alert
warning("Warning", "Please check your input! ⚠️")

// Info alert
info("Info", "Here's some information! ℹ️")
```

### Predefined Helpers

```tsx
const { 
  loginSuccess, 
  loginFailed, 
  serverError,
  saveSuccess,
  validationError 
} = useAlertSystem()

// Login scenarios
loginSuccess() // Shows: "Welcome Back!" with success message
loginFailed()  // Shows: "Login Failed" with error message

// API error handling
serverError()  // Shows: "Server Error" with error message

// Form validation
validationError() // Shows: "Validation Error" with error message
```

### Custom Alerts

```tsx
const { showCustomAlert } = useAlertSystem()

// Custom alert with options
showCustomAlert('success', 'Custom Title', 'Custom message', {
  duration: 3000,    // Auto-dismiss after 3 seconds
  dismissible: true   // Allow manual dismissal
})

// Persistent alert (no auto-dismiss)
showCustomAlert('info', 'Important', 'This will stay until dismissed', {
  duration: 0,
  dismissible: true
})
```

### API Response Handling

```tsx
const { handleApiSuccess, handleApiError } = useAlertSystem()

const handleApiCall = async () => {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    
    if (response.ok) {
      handleApiSuccess('Data fetched successfully!')
    } else {
      handleApiError(response, 'Failed to fetch data')
    }
  } catch (error) {
    handleApiError(error)
  }
}
```

### Toast-style Alerts

```tsx
const { 
  showSuccessToast, 
  showErrorToast, 
  showWarningToast, 
  showInfoToast 
} = useAlertSystem()

// Short-duration toast alerts
showSuccessToast("Quick success message!")
showErrorToast("Quick error message!")
showWarningToast("Quick warning message!")
showInfoToast("Quick info message!")
```

### Loading States

```tsx
const { showLoading, hideLoading } = useAlertSystem()

const handleAsyncOperation = async () => {
  showLoading("Processing your request...")
  
  try {
    await someAsyncOperation()
    hideLoading()
    success("Done!", "Operation completed!")
  } catch (error) {
    hideLoading()
    error("Failed", "Operation failed!")
  }
}
```

## Alert Types

### Success Alerts
- Green background with checkmark icon
- Used for successful operations
- Auto-dismisses after 5 seconds

### Error Alerts
- Red background with alert icon
- Used for errors and failures
- Auto-dismisses after 5 seconds

### Warning Alerts
- Amber background with warning icon
- Used for warnings and confirmations
- Auto-dismisses after 5 seconds

### Info Alerts
- Blue background with info icon
- Used for informational messages
- Auto-dismisses after 5 seconds

## Positioning

The alert system supports 6 different positions:

- `top-right` (default)
- `top-left`
- `bottom-right`
- `bottom-left`
- `top-center`
- `bottom-center`

## Customization

### Styling

The alert system uses Tailwind CSS classes and can be customized by modifying the `getAlertVariant` function in `alert-context.tsx`.

### Messages

Common alert messages are defined in `alert-utils.tsx` and can be easily modified or extended.

### Icons

Icons are from Lucide React and can be changed in the `getAlertIcon` function in `alert-context.tsx`.

## Best Practices

1. **Use predefined helpers** when possible for consistency
2. **Keep messages concise** and user-friendly
3. **Use appropriate alert types** for different scenarios
4. **Handle API errors** with the built-in error handlers
5. **Test alert positioning** on different screen sizes
6. **Don't overuse alerts** - use them for important messages only

## Migration from Local Alert State

If you have existing local alert state in your components, you can easily migrate:

**Before:**
```tsx
const [alerts, setAlerts] = useState([])

const showAlert = (type, title, message) => {
  // Local alert logic
}
```

**After:**
```tsx
const { success, error, warning, info } = useAlertSystem()

// Use the appropriate helper function
success(title, message)
```

## Troubleshooting

### Alerts not showing?
- Make sure `AlertProvider` is wrapped around your app
- Check that you're using the hook within a component tree

### Alerts in wrong position?
- Check the `position` prop in `AlertProvider`
- Verify the positioning classes are correct

### Alerts not dismissing?
- Check the `duration` option (0 = no auto-dismiss)
- Verify the `dismissible` option is set correctly

### Performance issues?
- Reduce `maxAlerts` in the provider
- Use `duration: 0` for persistent alerts sparingly 