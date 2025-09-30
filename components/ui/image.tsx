"use client"

import NextImage from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  aspectRatio?: 'square' | 'photo' | 'hero' | 'portrait'
  priority?: boolean
  fill?: boolean
  sizes?: string
  onClick?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  aspectRatio,
  priority = false,
  fill = false,
  sizes,
  onClick
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const aspectRatioClasses = {
    square: 'aspect-square',
    photo: 'aspect-photo',
    hero: 'aspect-hero',
    portrait: 'aspect-portrait'
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400",
          aspectRatio && aspectRatioClasses[aspectRatio],
          className
        )}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatio && aspectRatioClasses[aspectRatio],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-800",
            aspectRatio && aspectRatioClasses[aspectRatio]
          )}
        />
      )}
      <NextImage
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

// Placeholder component for missing images during development
export function ImagePlaceholder({
  aspectRatio = 'photo',
  className,
  title = 'Image placeholder'
}: {
  aspectRatio?: OptimizedImageProps['aspectRatio']
  className?: string
  title?: string
}) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    photo: 'aspect-photo',
    hero: 'aspect-hero',
    portrait: 'aspect-portrait'
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg",
        aspectRatio && aspectRatioClasses[aspectRatio],
        className
      )}
    >
      <svg
        className="w-12 h-12 mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs opacity-60">Add image here</span>
    </div>
  )
}