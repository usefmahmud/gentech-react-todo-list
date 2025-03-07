import { useEffect, useState } from "react"
import CategoriesList from "../../components/Dashboard/CategoriesList"
import { useTodos } from "../../context/TodosContext"
import toast from "react-hot-toast"

const Categories = () => {
  const [newCateogryValue, setNewCategoryValue] = useState('')

  const { retriveCategories, createCategory } = useTodos()

  const handleCreateCategory = async () => {
    if(newCateogryValue === '') {
      toast.error('Category name cannot be empty')
      return
    }

    if(newCateogryValue.split(' ').length > 1) {
      toast.error('Category name must be one word')
      return
    }

    if(newCateogryValue.length > 15) {
      toast.error('Category name must be less than 15 characters')
      return
    }
    
    const status = await createCategory({
      name: newCateogryValue
    })
    if(status) {
      setNewCategoryValue('')
    }
  }

  useEffect(() => {
    retriveCategories()
  }, [])
  return (
    <div className="px-15 py-10">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-15">
          <h2 className="text-4xl font-bold">
            Categories
          </h2>
        </div>

        <div className="flex flex-col">
          <div className='py-2 flex justify-between items-center mb-3'>
            <div className="w-full flex gap-3">
              <input 
                type="text" 
                className="w-full max-w-[250px] border-2 border-border/60 bg-secondary-bg/30 text-[16px] font-normal px-3 py-2 rounded-md shadow-md placeholder:text-secondary-text placeholder:opacity-50 focus:outline-none" 
                placeholder="Add Category"  
                value={newCateogryValue}
                onChange={(e) => setNewCategoryValue(e.target.value)}
              />
              
              <button 
                className="bg-primary-fg px-5 text-[16px] rounded-md cursor-pointer text-white hover:bg-primary-fg/90 transition duration-150 active:scale-98"
                onClick={handleCreateCategory}
              >
                add
              </button>
            </div>
          </div>

          <div>
            <CategoriesList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories