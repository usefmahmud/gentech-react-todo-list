import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import { annotate, annotationGroup } from 'rough-notation'
import { Link } from 'react-router-dom'

const Landing = () => {
  const titleFirst = useRef(null)
  const titleSecond = useRef(null)

  useEffect(() => {
    if(!titleFirst.current || !titleSecond.current){
      return
    }

    const firstAnimation = annotate(titleFirst.current, {
      type: 'circle',
      color: '#BB86FC',
      animationDuration: 600,
      strokeWidth: 4
    })
    const secondAnimation = annotate(titleSecond.current, {
      type: 'underline',
      color: '#BB86FC',
      animationDuration: 600,
      iterations: 3,
      strokeWidth: 5
    })

    const annotations = annotationGroup([firstAnimation, secondAnimation])
    const interval = setInterval(() => {
      annotations.hide()
      setTimeout(() => {
      annotations.show()
      }, 100)
    }, 2000)

    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="text-center">
      <Navbar />

      <div className="py-30">
        <h2 className="text-8xl font-extrabold">
          With <span ref={titleFirst}>Do.it</span>, Just <span ref={titleSecond}>Do it</span>.
        </h2>
      </div>
      <div>
        <Link 
          to='/signup'
          className='text-2xl bg-primary-fg rounded-md shadow-md px-6 py-1.5 select-none'
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default Landing