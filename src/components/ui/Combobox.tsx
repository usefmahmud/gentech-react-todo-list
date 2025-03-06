import { useEffect, useState } from 'react';
import { useTodos } from '../../context/TodosContext';
import { category } from '../../types';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

function ComboBox() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<category[]>([])

  const { categories, retriveCategories, isCategoriesLoading } = useTodos()

  useEffect(() => {
    retriveCategories()
  }, [])

  useEffect(() => {
    setOptions(categories)
  }, [categories])

  useEffect(() => {
    setOptions(categories.filter((option) => {
      return option.name.toLowerCase().includes(query.toLowerCase())
    }))
  }, [query])

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        className="w-full border-2 border-border rounded focus:outline-none bg-primary-bg py-2 px-3 text-lg placeholder:text-secondary-text placeholder:opacity-50"
        placeholder="Search..."
      />

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-primary-bg border-2 border-border rounded shadow-lg max-h-40 overflow-auto text-lg">
          {
            isCategoriesLoading ?
            ( 
              <li className="py-2 px-3 text-secondary-text/50">Loading...</li> 
            ) : 
            options.length ? 
            (options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => {
                    setQuery(option.name);
                    setIsOpen(false);
                  }}
                  className="hover:bg-secondary-bg/70 cursor-pointer py-2 px-3"
                >
                  {option.name}
                </li>
            ))) : 
            (
              <li className="py-2 px-3 text-secondary-text/50">Not Found</li>
            )
          }
        </ul>
      )}

      <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-3xl text-border pointer-events-none'>
        {
          isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />
        }
      </span>

    </div>
  );
}

export default ComboBox;