'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, VolumeX, Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { cn } from '@/lib/utils'
import { GlowCard } from '@/components/ui/glow-card'
import devconnectData from '@/data/devconnect.json'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ---------------------------------------------------------------------------
// Sub-component: VideoCarousel
// ---------------------------------------------------------------------------

interface VideoClip {
  webmSrc: string
  mp4Src: string
  label: string
}

interface VideoCarouselProps {
  clips: VideoClip[]
  poster: string
  className?: string
}

function VideoCarousel({ clips, poster, className }: VideoCarouselProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeClip, setActiveClip] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(false)

  const currentVideo = () => videoRefs.current[activeClip]

  // Sync state to native video events for the active clip
  useEffect(() => {
    const video = currentVideo()
    if (!video) return

    const onTimeUpdate = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100)
    }
    const onEnded = () => setIsPlaying(false)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClip])

  const switchClip = useCallback((index: number) => {
    if (index === activeClip) return
    // Pause current video
    const current = videoRefs.current[activeClip]
    if (current) {
      current.pause()
      current.currentTime = 0
    }
    setIsPlaying(false)
    setProgress(0)
    setActiveClip(index)
  }, [activeClip])

  const togglePlay = useCallback(() => {
    const video = currentVideo()
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClip])

  const toggleMute = useCallback(() => {
    // Apply mute state to all videos
    const muted = !isMuted
    setIsMuted(muted)
    videoRefs.current.forEach((v) => { if (v) v.muted = muted })
  }, [isMuted])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = currentVideo()
    const track = progressRef.current
    if (!video || !track) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = ratio * video.duration
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClip])

  const controlsVisible = !isPlaying || showControls

  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl', className)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video layers — only active one is visible */}
      {clips.map((clip, i) => (
        <video
          key={i}
          ref={(el) => { videoRefs.current[i] = el }}
          preload={i === 0 ? 'metadata' : 'none'}
          playsInline
          poster={poster}
          className={cn(
            'w-full h-full object-cover absolute inset-0 transition-opacity duration-300',
            i === activeClip ? 'opacity-100 z-[1]' : 'opacity-0 z-0',
          )}
        >
          <source src={clip.webmSrc} type="video/webm" />
          <source src={clip.mp4Src} type="video/mp4" />
        </video>
      ))}

      {/* Play/pause overlay */}
      <button
        type="button"
        className={cn(
          'absolute inset-0 flex items-center justify-center z-10 focus-ring rounded-2xl',
          'transition-opacity duration-300',
          isPlaying && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause interview video' : 'Play interview video'}
      >
        <span className="w-20 h-20 lg:w-16 lg:h-16 bg-white/15 backdrop-blur-xs rounded-full flex items-center justify-center">
          {isPlaying ? (
            <Pause size={28} className="text-white" />
          ) : (
            <Play size={28} className="text-white ml-1" />
          )}
        </span>
      </button>

      {/* Clip navigation arrows (desktop) */}
      {clips.length > 1 && (
        <>
          <button
            type="button"
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full',
              'bg-black/30 hover:bg-black/50 transition-colors focus-ring',
              'transition-opacity duration-300',
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
            onClick={() => switchClip(activeClip === 0 ? clips.length - 1 : activeClip - 1)}
            aria-label="Previous clip"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            type="button"
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full',
              'bg-black/30 hover:bg-black/50 transition-colors focus-ring',
              'transition-opacity duration-300',
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
            onClick={() => switchClip(activeClip === clips.length - 1 ? 0 : activeClip + 1)}
            aria-label="Next clip"
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        </>
      )}

      {/* Bottom controls bar */}
      <div
        className={cn(
          'absolute bottom-0 inset-x-0 z-20 px-4 pb-4 pt-12',
          'bg-linear-to-t from-black/60 to-transparent',
          'transition-opacity duration-300',
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        {/* Clip dot indicators */}
        {clips.length > 1 && (
          <div className="flex justify-center gap-2 mb-3">
            {clips.map((clip, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  'min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 focus-ring',
                )}
                onClick={() => switchClip(i)}
                aria-label={clip.label}
              >
                <span className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === activeClip ? 'bg-primary-400 w-6' : 'bg-white/30 w-1.5',
                )} />
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="flex-1 h-[3px] bg-white/15 rounded-full cursor-pointer relative"
            onClick={handleSeek}
            role="slider"
            aria-label="Video progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            onKeyDown={(e) => {
              const video = currentVideo()
              if (!video) return
              if (e.key === 'ArrowRight') video.currentTime = Math.min(video.duration, video.currentTime + 5)
              if (e.key === 'ArrowLeft') video.currentTime = Math.max(0, video.currentTime - 5)
            }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-primary-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Mute toggle */}
          <button
            type="button"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors focus-ring"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <VolumeX size={16} className="text-white/80" />
            ) : (
              <Volume2 size={16} className="text-white/80" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const VIDEO_CLIPS: VideoClip[] = [
  {
    webmSrc: '/images/devconnect/ef-interview-full.webm',
    mp4Src: '/images/devconnect/ef-interview-full.mp4',
    label: 'Full interview (24s)',
  },
  {
    webmSrc: '/images/devconnect/ef-interview.webm',
    mp4Src: '/images/devconnect/ef-interview.mp4',
    label: 'Highlight (12s)',
  },
]

// ---------------------------------------------------------------------------
// Sub-component: ConnectionCard
// ---------------------------------------------------------------------------

interface ConnectionCardProps {
  connection: typeof devconnectData.connections[0]
}

function ConnectionCard({ connection }: ConnectionCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl overflow-hidden group',
        'min-w-[260px] max-w-[85vw] lg:min-w-0 lg:max-w-none snap-center',
        'hover-lift',
      )}
    >
      {/* Portrait photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={connection.photo}
          alt={connection.alt}
          fill
          sizes="(max-width: 1024px) 280px, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="text-base font-semibold text-white">{connection.name}</h4>
        <p className="text-sm text-neutral-400 mt-0.5">{connection.role}</p>
        <div className="flex items-center justify-between mt-3">
          <span
            className="font-mono text-sm"
            style={{ color: connection.accent }}
          >
            {connection.handle}
          </span>
          <a
            href={connection.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors focus-ring rounded-sm p-1"
            aria-label={`${connection.name} on X`}
            style={{
              boxShadow: undefined,
            }}
          >
            <span aria-hidden="true">&rarr;</span>
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main: DevconnectSection
// ---------------------------------------------------------------------------

export function DevconnectSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const connectionsRef = useRef<HTMLHeadingElement>(null)
  const interviewBlockRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const credentialRef = useRef<HTMLDivElement>(null)
  const scrollGalleryRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)

  // Track scroll position for mobile dot indicators
  useEffect(() => {
    const gallery = scrollGalleryRef.current
    if (!gallery) return

    const handleScroll = () => {
      const scrollLeft = gallery.scrollLeft
      const cardWidth = gallery.firstElementChild
        ? (gallery.firstElementChild as HTMLElement).offsetWidth + 16 // gap-4 = 16px
        : 1
      setActiveCard(Math.round(scrollLeft / cardWidth))
    }

    gallery.addEventListener('scroll', handleScroll, { passive: true })
    return () => gallery.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // ----- Block 1: SplitType title -----
      if (titleRef.current) {
        const splitTitle = new SplitType(titleRef.current, { types: 'chars' })
        gsap.fromTo(
          splitTitle.chars,
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.6,
            ease: 'power2.out',
          }
        )
      }

      // ----- Block 2: Interview block (unified) -----
      if (interviewBlockRef.current) {
        gsap.fromTo(
          interviewBlockRef.current,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: interviewBlockRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          }
        )
      }

      // ----- Block 3: SplitType connections title -----
      if (connectionsRef.current) {
        const splitConnections = new SplitType(connectionsRef.current, { types: 'chars' })
        gsap.fromTo(
          splitConnections.chars,
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: connectionsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.6,
            ease: 'power2.out',
          }
        )
      }

      // ----- Block 4: Connection cards (desktop only — mobile uses scroll) -----
      const validCards = cardRefs.current.filter(Boolean)
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: validCards[0],
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
          }
        )
      }

      // ----- Block 5: Credential card -----
      if (credentialRef.current) {
        gsap.fromTo(
          credentialRef.current,
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: credentialRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="devconnect" className="section-padding relative overflow-hidden bg-neutral-800">
      <div className="container-max">
        {/* ================================================================
            Block 1: Section Header
        ================================================================ */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse-glow" />
            <span className="font-mono uppercase tracking-widest text-xs text-primary-400">
              Ethereum Foundation Scholar
            </span>
          </div>
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Devconnect 2025
          </h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Selected as an Ethereum Foundation scholarship recipient for Devconnect
            — the premier event in the Ethereum ecosystem. Buenos Aires, Argentina.
          </p>
        </div>

        {/* ================================================================
            Block 2: Interview Block (Centerpiece)
            Unified split-screen card — video left, context right
        ================================================================ */}
        <div ref={interviewBlockRef} className="mb-20">
          <GlowCard className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
              {/* Video carousel — left cell, width derived from aspect + max-height */}
              <div className="lg:w-[338px]">
                <VideoCarousel
                  clips={VIDEO_CLIPS}
                  poster="/images/devconnect/ef-interview-photo.webp"
                  className="aspect-[9/16] max-h-[600px] rounded-none h-full"
                />
              </div>

              {/* Context — right cell */}
              <div className="flex flex-col justify-center p-8 md:p-10 border-t border-white/[0.06] lg:border-t-0 lg:border-l">
                <span className="font-mono uppercase tracking-widest text-xs text-primary-400 mb-3 block">
                  The Interview
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-5">
                  Interviewed by the Ethereum Foundation
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-5">
                  During Devconnect 2025, I was selected for an on-camera interview by the Ethereum
                  Foundation team — sharing my journey as a Web3 developer from Costa Rica building
                  on Ethereum and Starknet.
                </p>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  The conversation covered my work on Starknet and EVM-based projects,
                  open source contributions to the ecosystem, and how the scholarship
                  shaped my path as a builder in decentralized technology.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge-primary text-xs">Ethereum Foundation</span>
                  <span className="badge-primary text-xs">Devconnect 2025</span>
                  <span className="badge-primary text-xs">Scholar Interview</span>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>

      <div className="container-max">
        {/* ================================================================
            Block 4: Connections Gallery — "Builders & Cypherpunks"
        ================================================================ */}
        <div className="mb-20">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse-glow" />
              <span className="font-mono uppercase tracking-widest text-xs text-primary-400">
                Key Connections
              </span>
            </div>
            <h3
              ref={connectionsRef}
              className="text-2xl md:text-3xl font-bold text-white"
            >
              Builders &amp; Cypherpunks
            </h3>
          </div>

          {/* Desktop grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {devconnectData.connections.map((connection, i) => (
              <div
                key={connection.handle}
                ref={(el) => { cardRefs.current[i] = el }}
              >
                <ConnectionCard connection={connection} />
              </div>
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="lg:hidden">
            <div
              ref={scrollGalleryRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              }}
            >
              {devconnectData.connections.map((connection) => (
                <div key={connection.handle}>
                  <ConnectionCard connection={connection} />
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4" aria-hidden="true">
              {devconnectData.connections.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors duration-300',
                    i === activeCard ? 'bg-primary-500' : 'bg-neutral-600',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================
            Block 5: Scholarship Highlight
        ================================================================ */}
        <div
          ref={credentialRef}
          className="glass-card-premium rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto relative overflow-hidden break-words"
          style={{
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(14, 165, 233, 0.02))',
          }}
        >
          {/* Radial glow decoration */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary-500/10 flex items-center justify-center">
                <Award size={28} className="text-primary-400" />
              </div>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-3">
              Devconnect 2025 &middot; Buenos Aires, Argentina
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Ethereum Foundation Scholarship Recipient
            </h3>
            <p className="text-neutral-300 leading-relaxed max-w-xl mx-auto">
              Fully sponsored attendance recognizing contributions to the Ethereum ecosystem as a
              Web3 developer and open source contributor.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
