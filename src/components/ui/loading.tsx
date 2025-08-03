"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "spinner" | "dots" | "pulse" | "bars" | "ripple"
  className?: string
  text?: string
  showText?: boolean
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8", 
  lg: "w-12 h-12",
  xl: "w-16 h-16"
}

export function Loading({ 
  size = "md", 
  variant = "spinner", 
  className,
  text = "Loading...",
  showText = true
}: LoadingProps) {
  const renderSpinner = () => (
    <motion.div
      className={cn(
        "border-2 border-gray-200 border-t-blue-600 rounded-full",
        sizeClasses[size]
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "bg-blue-600 rounded-full",
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-4 h-4"
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <motion.div
      className={cn(
        "bg-blue-600 rounded-full",
        sizeClasses[size]
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )

  const renderBars = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "bg-blue-600 rounded-sm",
            size === "sm" ? "w-1 h-3" : size === "md" ? "w-1 h-6" : size === "lg" ? "w-2 h-8" : "w-2 h-12"
          )}
          animate={{
            scaleY: [1, 2, 1]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  )

  const renderRipple = () => (
    <div className="relative">
      <motion.div
        className={cn(
          "bg-blue-600 rounded-full absolute",
          sizeClasses[size]
        )}
        animate={{
          scale: [0, 1],
          opacity: [1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      <motion.div
        className={cn(
          "bg-blue-600 rounded-full absolute",
          sizeClasses[size]
        )}
        animate={{
          scale: [0, 1],
          opacity: [1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.5,
          ease: "easeOut"
        }}
      />
    </div>
  )

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots()
      case "pulse":
        return renderPulse()
      case "bars":
        return renderBars()
      case "ripple":
        return renderRipple()
      default:
        return renderSpinner()
    }
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-3", className)}>
      {renderLoader()}
      {showText && (
        <motion.p
          className="text-sm text-gray-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Full screen loading component
interface FullScreenLoadingProps {
  text?: string
  variant?: "spinner" | "dots" | "pulse" | "bars" | "ripple"
  background?: "blur" | "overlay" | "none"
}

export function FullScreenLoading({ 
  text = "Loading...", 
  variant = "spinner",
  background = "blur"
}: FullScreenLoadingProps) {
  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        background === "blur" && "backdrop-blur-sm bg-white/50",
        background === "overlay" && "bg-white/90",
        background === "none" && "bg-transparent"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Loading 
          size="lg" 
          variant={variant} 
          text={text}
          showText={true}
        />
      </motion.div>
    </motion.div>
  )
}

// Page loading component
interface PageLoadingProps {
  text?: string
  variant?: "spinner" | "dots" | "pulse" | "bars" | "ripple"
}

export function PageLoading({ 
  text = "Loading page...", 
  variant = "spinner" 
}: PageLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-6">
        <Loading size="xl" variant={variant} showText={false} />
        <motion.h2
          className="text-xl font-semibold text-gray-800"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.h2>
        <motion.p
          className="text-sm text-gray-500"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Please wait while we prepare everything for you
        </motion.p>
      </div>
    </div>
  )
}

// Inline loading component
interface InlineLoadingProps {
  text?: string
  variant?: "spinner" | "dots" | "pulse" | "bars" | "ripple"
}

export function InlineLoading({ 
  text = "Loading...", 
  variant = "dots" 
}: InlineLoadingProps) {
  return (
    <div className="inline-flex items-center space-x-2">
      <Loading size="sm" variant={variant} showText={false} />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  )
} 