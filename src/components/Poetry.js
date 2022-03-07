import React, { useEffect, useState } from 'react'

function Poetry({authorprop}) {
  const [poems, setpoems] = useState([])
  const [loaded, setloaded] = useState(false)
  const getPoems = async () =>{
    const data = await fetch(`https://poetrydb.org/author/${authorprop.replace(/ /g, '%20')}`)
    console.log(authorprop.replace(/ /g, '%20'))
    const parsedData = await data.json();
    setloaded(true)
    setpoems(parsedData)
    console.log(poems)
  }
  useEffect(() => getPoems(), [])
  
  return (
    <div id='main'>
          <h1>{!loaded?"loading":"loaded"}</h1>
      <h1 className='text-center'>Poetry</h1>
          <div>
            {poems.map((element)=>{
              return
              element.lines.map((item)=>{
                return <p>{item}</p>
              })
            })}
          </div>
      </div>
  )
}

export default Poetry