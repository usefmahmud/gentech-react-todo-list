import { ReactNode, useEffect } from "react"

interface ModalProps {
  children: ReactNode
  onClose: () => void
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  className
}) => {

  const handleCloseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget){
      onClose()
    }
  }

  useEffect(() => {
    const body = document.body
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = 'auto'
    }
  })

  return (
    <div
      className='w-full h-full animate-fade-in bg-gray-900/30 backdrop-blur-[2px] fixed flex items-center justify-center top-0 left-0 z-[10000] p-6'
      onClick={handleCloseClick}
    >
      <div className={className}>
        {children}
      </div>
    </div>
  )
}

export default Modal