import { useState } from "react"
import { useTranslation } from "react-i18next"

interface DropDownProps {
  options: any[]
  selected: string  
  setSelected: (selected: string) => void
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  selected,
  setSelected
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation('translation', {
    keyPrefix: 'todos.page'
  })

  return (
    <div className='relative'>
      <button
        className={`bg-secondary-bg w-fit hover:bg-secondary-bg/80 cursor-pointer font-medium text-sm capitalize px-5 py-2.5 text-center inline-flex items-center rounded-md ${isOpen ? 'rounded-bl-0 rounded-br-0' : ''}`}
        onMouseEnter={() => setIsOpen(!isOpen)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {t(selected)}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      {
        isOpen && 
        <div 
          className="z-10 absolute ltr:left-0 shadow-lg pt-2"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="text-md rounded-md">
            {
              options.map((option) => {
                return (
                  <li 
                    className="bg-secondary-bg cursor-pointer text-nowrap capitalize px-5 py-2.5"
                    onClick={() => {
                      setSelected(option)
                      setIsOpen(false)
                    }}
                  >
                    {t(option)}
                  </li>
                )
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default DropDown