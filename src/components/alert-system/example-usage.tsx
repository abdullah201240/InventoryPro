"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAlertSystem } from "./use-alert-system"

export function AlertSystemExample() {
  const {
    success,
    error,
    warning,
    info,
    loginSuccess,
    loginFailed,
    serverError,
    saveSuccess,
    validationError,
    showCustomAlert,
    handleApiSuccess,
    handleApiError,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    showLoading,
    clearAllAlerts
  } = useAlertSystem()

  const handleBasicAlerts = () => {
    success("Success!", "This is a success message! ✅")
    setTimeout(() => error("Error", "This is an error message! 😞"), 1000)
    setTimeout(() => warning("Warning", "This is a warning message! ⚠️"), 2000)
    setTimeout(() => info("Info", "This is an info message! ℹ️"), 3000)
  }

  const handlePredefinedHelpers = () => {
    loginSuccess()
    setTimeout(() => loginFailed(), 2000)
    setTimeout(() => serverError(), 4000)
    setTimeout(() => saveSuccess(), 6000)
    setTimeout(() => validationError(), 8000)
  }

  const handleCustomAlerts = () => {
    // Custom alert with short duration
    showCustomAlert('success', 'Custom Success', 'This alert will dismiss in 3 seconds', {
      duration: 3000,
      dismissible: true
    })

    // Persistent alert (no auto-dismiss)
    setTimeout(() => {
      showCustomAlert('info', 'Important Notice', 'This alert will stay until you dismiss it', {
        duration: 0,
        dismissible: true
      })
    }, 1000)
  }

  const handleApiSimulation = () => {
    // Simulate API success
    setTimeout(() => {
      handleApiSuccess('Data saved successfully!')
    }, 1000)

    // Simulate API error
    setTimeout(() => {
      const mockError = { response: { status: 401 }, message: 'Unauthorized access' }
      handleApiError(mockError, 'Failed to authenticate')
    }, 3000)
  }

  const handleToastAlerts = () => {
    showSuccessToast("Quick success toast!")
    setTimeout(() => showErrorToast("Quick error toast!"), 1000)
    setTimeout(() => showWarningToast("Quick warning toast!"), 2000)
    setTimeout(() => showInfoToast("Quick info toast!"), 3000)
  }

  const handleLoadingState = () => {
    showLoading("Processing your request...")
    
    // Simulate async operation
    setTimeout(() => {
      success("Done!", "Operation completed successfully!")
    }, 3000)
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alert System Examples</CardTitle>
          <CardDescription>
            Click the buttons below to see different types of alerts in action
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={handleBasicAlerts} variant="default">
              Basic Alerts
            </Button>
            
            <Button onClick={handlePredefinedHelpers} variant="secondary">
              Predefined Helpers
            </Button>
            
            <Button onClick={handleCustomAlerts} variant="outline">
              Custom Alerts
            </Button>
            
            <Button onClick={handleApiSimulation} variant="destructive">
              API Simulation
            </Button>
            
            <Button onClick={handleToastAlerts} variant="ghost">
              Toast Alerts
            </Button>
            
            <Button onClick={handleLoadingState} variant="default">
              Loading State
            </Button>
            
            <Button onClick={clearAllAlerts} variant="outline" className="md:col-span-2">
              Clear All Alerts
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Basic Alerts:</strong> Shows success, error, warning, and info alerts in sequence</p>
          <p><strong>Predefined Helpers:</strong> Demonstrates common alert patterns like login success/failure</p>
          <p><strong>Custom Alerts:</strong> Shows alerts with custom duration and dismissible options</p>
          <p><strong>API Simulation:</strong> Simulates API success and error scenarios</p>
          <p><strong>Toast Alerts:</strong> Shows short-duration toast-style alerts</p>
          <p><strong>Loading State:</strong> Demonstrates loading alert with success follow-up</p>
          <p><strong>Clear All:</strong> Removes all currently visible alerts</p>
        </CardContent>
      </Card>
    </div>
  )
} 