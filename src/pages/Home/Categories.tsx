import { useEffect, useState } from "react"
import CategoriesList from "../../components/Dashboard/CategoriesList"
import { useTodos } from "../../context/TodosContext"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useOutletContext } from "react-router-dom"
import { HomeOutletContextType } from "../../types"
import { IoMenuOutline } from "react-icons/io5";


const Categories = () => {
  const [newCateogryValue, setNewCategoryValue] = useState('')
  const { setIsSidebarOpen } = useOutletContext<HomeOutletContextType>()

  const { t } = useTranslation('translation', {
    keyPrefix: 'categories.page'
  })

  const { retriveCategories, createCategory } = useTodos()

  const handleCreateCategory = async () => {
    if(newCateogryValue === '') {
      toast.error('Category name cannot be empty')
      return
    }

    if(newCateogryValue.split(' ').length > 2) {
      toast.error('Category name must be at max two word')
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
    <div className="px-4 md:px-15 py-10">
      <div className="flex flex-col">
        <div className="flex items-center mb-15 gap-3">
          <div className="block md:hidden">
            <span 
              className="text-4xl cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            >
              <IoMenuOutline />
            </span>
          </div>
          <h2 className="text-4xl font-bold">
            {t('title')}
          </h2>
        </div>

        <div className="flex flex-col">
          <div className='py-2 flex justify-between items-center mb-3'>
            <div className="w-full flex gap-3">
              <input 
                type="text" 
                className="w-full max-w-[250px] border-2 border-border/60 bg-secondary-bg/30 text-[16px] font-normal px-3 py-2 rounded-md shadow-md placeholder:text-secondary-text placeholder:opacity-50 focus:outline-none" 
                placeholder={t('add')}
                value={newCateogryValue}
                onChange={(e) => setNewCategoryValue(e.target.value)}
              />
              
              <button 
                className="bg-primary-fg px-5 text-[16px] rounded-md cursor-pointer text-white hover:bg-primary-fg/90 transition duration-150 active:scale-98"
                onClick={handleCreateCategory}
              >
                {t('submit')}
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