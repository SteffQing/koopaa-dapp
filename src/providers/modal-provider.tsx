'use client'

import type React from 'react'
import { createContext, useContext, useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type ModalContextType = {
  showModal: (content: React.ReactNode, options?: ModalOptions) => void
  hideModal: () => void
  isOpen: boolean
}

type ModalOptions = {
  closeOnClickOutside?: boolean
  showCloseButton?: boolean
  position?: 'bottom' | 'center'
  onClose?: () => void
}

const defaultOptions: ModalOptions = {
  closeOnClickOutside: true,
  showCloseButton: true,
  position: 'center',
  onClose: undefined,
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ModalOptions>(defaultOptions)
  const backdropRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const showModal = (content: React.ReactNode, customOptions?: ModalOptions) => {
    setModalContent(content)
    setOptions({ ...defaultOptions, ...customOptions })
    setIsOpen(true)
    document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
  }

  const hideModal = () => {
    setIsOpen(false)
    if (options.onClose) {
      options.onClose()
    }

    // Small delay to allow exit animation to complete
    setTimeout(() => {
      setModalContent(null)
      document.body.style.overflow = '' // Re-enable scrolling
    }, 300)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        hideModal()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (options.closeOnClickOutside && e.target === backdropRef.current) {
      hideModal()
    }
  }

  const modalVariants = {
    bottom: {
      hidden: { y: '100%', opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
      exit: { y: '100%', opacity: 0, transition: { duration: 0.2 } },
    },
    center: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
      exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
    },
  }

  return (
    <ModalContext.Provider value={{ showModal, hideModal, isOpen }}>
      <div ref={containerRef} className="relative max-w-[400px] w-full mx-auto">
        {children}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={backdropRef}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm max-w-[400px] mx-auto"
              style={{
                width: containerRef.current ? containerRef.current.offsetWidth : '100%',
                height: '100%',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
            >
              <motion.div
                className={`relative w-full mx-auto rounded-2xl bg-white overflow-hidden ${
                  options.position === 'bottom' ? 'mt-auto mb-0' : ''
                }`}
                variants={modalVariants[options.position || 'center']}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {options.showCloseButton && (
                  <button
                    onClick={hideModal}
                    className="absolute right-4 top-4 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                )}
                {modalContent}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ModalContext.Provider>
  )
}
