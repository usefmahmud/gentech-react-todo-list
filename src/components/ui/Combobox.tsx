import { useEffect, useMemo, useState } from 'react';
import { useTodos } from '../../context/TodosContext';
import { category } from '../../types';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useTranslation } from 'react-i18next';

interface ComboBoxProps {
  error?: boolean
  errorMessage?: string
  value?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ComboBox: React.FC<ComboBoxProps> = ({
  value,
  onBlur,
  onChange
}) => {
  const [chosenId, setChosenId] = useState('')
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { categories, retriveCategories, isCategoriesLoading } = useTodos()

  useEffect(() => {
    retriveCategories()
  }, [])

  const filterOptions: category[] = useMemo(() => {
    return categories.filter((category) => category.name?.toLowerCase().includes(query.toLowerCase()))
  }, [categories, query])

  useEffect(() => {
    if(value) {
      const selectedCategory = categories.find((cat) => cat.id === value)
      if(selectedCategory) {
        setQuery(selectedCategory.name)
        setChosenId(value)
      }else {
        setQuery('')
        setChosenId('')
      }
    }else {
      setQuery('')
      setChosenId('')
    }
  }, [value, categories])

  const { t } = useTranslation('translation', {
    keyPrefix: 'todos.form'
  })

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setChosenId('');
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={(e) => {
          setTimeout(() => setIsOpen(false), 100);
          if(!chosenId) {
            onChange && onChange({ target: { value: '' } } as any);
          }
          onBlur && onBlur(e);
        }}
        className="w-full border-2 border-border rounded focus:outline-none bg-primary-bg py-2 px-3 text-lg placeholder:text-secondary-text placeholder:opacity-50"
        placeholder={t('category')} 
      />

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-primary-bg border-2 border-border rounded shadow-lg max-h-40 overflow-auto text-lg">
          {
            isCategoriesLoading ?
            ( 
              <li className="py-2 px-3 text-secondary-text/50">Loading...</li> 
            ) : 
            filterOptions.length ? 
            (filterOptions.map((option) => (
                <li
                  key={option.id}
                  onClick={() => {
                    setChosenId(option.id)
                    onChange && onChange({ target: { value: option.id } } as any)
                    setIsOpen(false)
                  }}
                  className="hover:bg-secondary-bg/70 cursor-pointer py-2 px-3"
                >
                  {option.name}
                </li>
            ))) : 
            (
              <li className="py-2 px-3 text-secondary-text/50">{t('not_found')}</li>
            )
          }
        </ul>
      )}

      <span className='absolute right-2 rtl:right-auto rtl:left-2 top-1/2 transform -translate-y-1/2 text-3xl text-border pointer-events-none'>
        {
          isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />
        }
      </span>

    </div>
  );
}

export default ComboBox;