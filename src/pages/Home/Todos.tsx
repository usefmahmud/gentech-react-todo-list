import TodosList from "../../components/Dashboard/TodosList"

const Todos = () => {

  return (
    <div className="px-15 py-10">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-15">
          <h2 className="text-4xl font-bold">
            Todos
          </h2>
          <div>
            <button
              className="bg-secondary-bg text-[18px] font-semibold px-5 py-2 rounded-md cursor-pointer hover:bg-secondary-bg/80 transition duration-150 active:scale-98"
            >
              New Todo
            </button>
          </div>
        </div>

        <div>
          <TodosList />
        </div>
      </div>
    </div>
  )
}

export default Todos