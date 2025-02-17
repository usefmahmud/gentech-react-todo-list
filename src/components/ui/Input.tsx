import React, { useState } from 'react'
import { GoEye , GoEyeClosed } from 'react-icons/go'

type InputProps = {
  type: 'email' | 'text' | 'password'
  placeholder: string
  error?: boolean
  errorMessage?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  ref: React.Ref<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  error,
  errorMessage,
  value,
  onChange,
  onBlur,
  ref
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col relative">
      <input 
        type={showPassword ? (type === 'password' ? 'text' : type) : type}
        className={`
          bg-primary-bg border-2 border-border rounded-md outline-none placeholder:text-secondary-text placeholder:opacity-50 py-2 px-3 text-lg
          ${error ? 'border-red-400 mb-2' : ''}
          ${type === 'password' ? 'pr-10' : ''}
          `}
        placeholder={placeholder}

        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
      {
        error && 
        <span className="text-[14px] text-red-400 pl-3">{errorMessage}</span>
      }

      {
        type === 'password' && 
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[15px] cursor-pointer text-lg"
        >
          {showPassword ? <GoEyeClosed /> : <GoEye />}
        </button>
      }
    </div>
  )
}

export default Input