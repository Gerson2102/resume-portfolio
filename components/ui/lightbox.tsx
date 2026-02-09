"use client"

import { useState, useEffect } from 'react'
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
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
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
        className="flex items-center justify-center w-full h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-6xl max-h-full">
          <OptimizedImage
            src={currentImage.src}
            alt={currentImage.alt}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />

          {/* Caption */}
          {currentImage.caption && (
            <div className="mt-4 text-center">
              <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
                {currentImage.caption}
              </p>
            </div>
          )}

          {/* Image counter */}
          {hasMultipleImages && (
            <div className="mt-2 text-center">
              <span className="text-white/70 text-sm">
                {currentIndex + 1} of {images.length}
              </span>
            </div>
          )}
        </div>
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