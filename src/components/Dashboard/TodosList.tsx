import { useState } from "react"
import { CiGrid41, CiGrid2H } from "react-icons/ci"
import TodoCard from "./TodoCard"
import { Todo } from "../../types"

const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Buy Groceries',
    description: 'Pick up fresh vegetables, fruits, and dairy products from the local market.',
    date: '2023-03-15',
    is_completed: false,
    category: { id: '1', name: 'Personal' }
  },
  {
    id: '2',
    title: 'Team Meeting',
    description: 'Discuss project updates, deadlines, and next steps with the development team. dgdsfg sfdhg fdsh dfghgd jngdfj grjn ',
    date: '2023-03-16',
    is_completed: false,
    category: { id: '2', name: 'Work' }
  },
  {
    id: '3',
    title: 'Doctor Appointment',
    description: 'Attend the routine checkup at the downtown clinic at 10 AM.',
    date: '2023-03-17',
    is_completed: false,
    category: { id: '3', name: 'Health' }
  },
  {
    id: '4',
    title: 'Submit Report',
    description: 'Finalize and submit the quarterly financial report before the deadline.',
    date: '2023-03-18',
    is_completed: true,
    category: { id: '2', name: 'Work' }
  },
  {
    id: '5',
    title: 'Call Mom',
    description: 'Have a long catch-up call with Mom in the evening.',
    date: '2023-03-19',
    is_completed: true,
    category: { id: '1', name: 'Personal' }
  },
  {
    id: '6',
    title: 'Book Flight Tickets',
    description: 'Search for flight deals and book tickets for the upcoming vacation.',
    date: '2023-04-01',
    is_completed: false,
    category: { id: '4', name: 'Travel' }
  },
  {
    id: '7',
    title: 'Gym Session',
    description: 'Join the scheduled evening workout session for strength training.',
    date: '2023-04-02',
    is_completed: false,
    category: { id: '3', name: 'Health' }
  },
  {
    id: '8',
    title: 'Read a Book',
    description: 'Finish reading the last chapters of the novel to complete it.',
    date: '2023-04-03',
    is_completed: false,
    category: { id: '1', name: 'Personal' }
  }
]

const TodosList = () => {
  const [isGridView, setIsGridView] = useState(false)
  return (
    <div className='flex flex-col'>
      <div className='py-2 flex justify-end'>
        <div className="flex bg-secondary-bg rounded-full text-2xl shadow-md">
          <span 
            className={`p-2 pl-3.5 rounded-l-full cursor-pointer transition duration-100 hover:bg-primary-bg/50 ${isGridView ? 'shadow-inner bg-primary-bg/50' : ''}`}
            onClick={() => setIsGridView(true)}
          ><CiGrid41 /></span>
          <span 
            className={`p-2 pr-3.5 rounded-r-full cursor-pointer transition duration-100 hover:bg-primary-bg/50 ${!isGridView ? 'shadow-inner bg-primary-bg/50' : ''}`}
            onClick={() => setIsGridView(false)}
          ><CiGrid2H /></span>
        </div>
      </div>
      <div
        className={`gap-4
          ${isGridView ?
            'grid grid-cols-3' : 
            'flex flex-col'
          }
          `}
      >
        {
          mockTodos.map(todo => (
            <TodoCard 
              key={todo.id}
              todo={todo}
            />
          ))
        }
      </div>
    </div>
  )
}

export default TodosList