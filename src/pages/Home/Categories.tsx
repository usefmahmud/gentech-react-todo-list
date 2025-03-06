import { useTodos } from "../../context/TodosContext"

const Categories = () => {
  const { createCategory } = useTodos()

  function getRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

  return (
    <div className="flex justify-center items-center h-full">
      <button 
        className="bg-primary-fg text-[18px] font-semibold px-5 py-2 rounded-md cursor-pointer transition duration-150 active:scale-98"
        onClick={() => {
          createCategory({
            name: getRandomString(10)
          })
        }}
      >
        New Category  
      </button>
    </div>
  )
}

export default Categories