"use client"

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { OptimizedImage } from './image'
import { cn } from '@/lib/utils'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious
}: LightboxProps) {
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Move focus into the dialog on open; restore it to the trigger on close.
  useEffect(() => {
    if (!isOpen) return
    previouslyFocused.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    return () => {
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrevious?.()
          break
        case 'ArrowRight':
          onNext?.()
          break
        case 'Tab': {
          // Trap focus within the dialog.
          const dialog = dialogRef.current
          if (!dialog) return
          const focusables = Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'button, [href], [tabindex]:not([tabindex="-1"])'
            )
          )
          if (focusables.length === 0) return
          const first = focusables[0]
          const last = focusables[focusables.length - 1]
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrevious])

  if (!mounted || !isOpen || !images[currentIndex]) return null

  const currentImage = images[currentIndex]
  const hasMultipleImages = images.length > 1

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={currentImage.caption || 'Image viewer'}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus-ring"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation buttons */}
      {hasMultipleImages && onPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus-ring"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {hasMultipleImages && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus-ring"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Image container */}
      <div
        className="flex flex-col items-center justify-center w-full h-full px-12 py-14 sm:px-16 sm:py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[calc(100vh-9rem)] object-contain rounded-lg"
        />

        {/* Caption + counter */}
        {(currentImage.caption || hasMultipleImages) && (
          <div className="mt-3 text-center shrink-0">
            {currentImage.caption && (
              <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
                {currentImage.caption}
              </p>
            )}
            {hasMultipleImages && (
              <span className="text-white/70 text-sm mt-1 block">
                {currentIndex + 1} of {images.length}
              </span>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

// Gallery component that includes lightbox functionality
interface GalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  columns?: number
  className?: string
  aspectRatio?: 'square' | 'photo' | 'hero' | 'portrait'
}

export function Gallery({
  images,
  columns = 3,
  className,
  aspectRatio = 'photo'
}: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <>
      <div
        className={cn(
          'grid gap-4',
          columnClasses[columns as keyof typeof columnClasses],
          className
        )}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="photo-card cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(index); } }}
            aria-label={image.alt}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              aspectRatio={aspectRatio}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </>
  )
}
