import React from 'react'

interface CheckboxProps {
  isChecked: boolean
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  setIsChecked
}) => {  
  const handleClicked = () => {
    setIsChecked(!isChecked)
  }
  return (
    <div 
      className={`w-6 h-6 bg-primary-bg rounded-md cursor-pointer transition duration-80 ${isChecked ? 'bg-primary-fg' : ''}`}
      onClick={handleClicked}
    >
    </div>
  )
}

export default Checkbox