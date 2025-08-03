"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'
import { FullScreenLoading } from '@/components/ui/loading'

interface LoadingContextType {
  isLoading: boolean
  loadingText: string
  showLoading: (text?: string) => void
  hideLoading: () => void
  setLoadingText: (text: string) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("Loading...")

  const showLoading = useCallback((text: string = "Loading...") => {
    setLoadingText(text)
    setIsLoading(true)
  }, [])

  const hideLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const setLoadingTextHandler = useCallback((text: string) => {
    setLoadingText(text)
  }, [])

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingText,
        showLoading,
        hideLoading,
        setLoadingText: setLoadingTextHandler,
      }}
    >
      {children}
      {isLoading && (
        <FullScreenLoading 
          text={loadingText}
          variant="spinner"
          background="blur"
        />
      )}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
} 