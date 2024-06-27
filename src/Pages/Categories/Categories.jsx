import React, { useContext } from 'react'
import { MyContext } from '../../App'
import HomeCat from '../../Components/HomeCat'

const Categories = () => {
    const context = useContext(MyContext)
  return (
    <div>
        {
            context.windowWidth < 768 && <div>
                <HomeCat catData={context.categoryData}/>
            </div>
        }
    </div>
  )
}

export default Categories