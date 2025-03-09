import React, { useEffect, useState } from 'react'
import { FiCheck, FiEdit, FiEdit2, FiTrash } from "react-icons/fi"
import { useTodos } from '../../context/TodosContext'
import toast from 'react-hot-toast'

const CategoriesList = () => {
  const [isEditing, setIsEditing] = useState({
    state: false,
    id: ''
  })
  const [editingValue, setEditingValue] = useState<string>('')
  const { categories, deleteCategory, isCategoriesLoading, updateCategory } = useTodos()

  const handleEdit = async (id: string) => {
    if(editingValue === null || editingValue.replace(' ', '') === '') {
      toast.error('Category name cannot be empty')
      return
    }

    if(editingValue.split(' ').length > 2) {
      toast.error('Category name must be at max two words')
      return
    }

    if(editingValue === categories.find(category => category.id === id)?.name) {
      setIsEditing({
        state: false,
        id: ''
      })
      setEditingValue('')
      return
    }     

    const status = await updateCategory({
      id: id,
      name: editingValue
    })
    if(status) {
      setIsEditing({
        state: false,
        id: ''
      })
      setEditingValue('')
    }
  }

  useEffect(() => {
    setEditingValue(categories.find(category => category.id === isEditing.id)?.name as string)
  }, [isEditing.id])
      
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pl-5 pt-5">
      {
        isCategoriesLoading ? "Loading..." :
        categories.map(category => (
          <div className="flex items-center justify-between gap-5 pr-6">
            <div className="text-xl w-full text-nowrap overflow-hidden whitespace-nowrap overflow-ellipsis">
              {
                isEditing.state && isEditing.id === category.id ? 
                (
                  <input 
                    type="text" 
                    className='bg-secondary-bg px-2 py-1.5 w-full focus:outline-none text-xl font-normal rounded-md placeholder:text-[16px] placeholder:text-white/20'
                    value={editingValue === null ? category.name : editingValue}
                    placeholder='Category Name'
                    onChange={(e) => setEditingValue(e.target.value === '' ? '' : e.target.value)}
                  />
                ) :
                category.name
              }
            </div>
            <div className="flex gap-2">
              {
                isEditing.state && isEditing.id === category.id ?
                (
                  <button 
                    className="cursor-pointer p-2.5 rounded-md text-xl bg-green-600/10 duration-100 hover:bg-green-600/20"
                    onClick={() => handleEdit(category.id)}
                  >
                    <FiCheck />
                  </button>
                ) :
                (
                  <button 
                    className="cursor-pointer p-2.5 rounded-md text-xl bg-primary-fg/10 duration-100 hover:bg-primary-fg/20"
                    onClick={() => {
                      setIsEditing({
                        state: true,
                        id: category.id
                      })
                    }}
                  >
                    <FiEdit2 />
                  </button>
                )
              }
              <button 
                className="cursor-pointer p-2.5 rounded-md text-xl bg-danger/10 duration-100 hover:bg-danger/20"
                onClick={() => deleteCategory(category.id)}
              >
                <FiTrash />
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default CategoriesList