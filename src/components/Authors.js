import React, { useEffect, useState } from 'react'


function Authors() {
  var a = 1;
  // AUTHOR FETCH
  const [author, setauthor] = useState([])
  const [authorprop, setauthorprop] = useState("")
  const [loadedAuthor, setloadedAuthor] = useState(false)
  const [loadedPoem, setloadedPoem] = useState(false)

    const getAuthors = async () => {
        const data = await fetch('https://poetrydb.org/author')
        const parsedData = await data.json()
        setauthor(parsedData.authors)
        setloadedAuthor(true)
        setloadedPoem(true)
    }
    useEffect(() => getAuthors(),[])
   const toggleNav = () =>{
     let btn = document.getElementById("toggleBtn")
     let nav = document.getElementById("authorNav")
     let main = document.getElementById("main")
     btn.classList.toggle("close")

    const mediaQuery = window.matchMedia('(max-width: 450px)')
    if(mediaQuery.matches){
      nav.classList.toggle("slideNav2")
      nav.style.background="#240b36d4"
    }
    else{
    nav.classList.toggle("slideNav")
    nav.style.background="transparent"

    }


    if(main.style.marginLeft==="15rem"){
      main.style.marginLeft="0"
    }
    else{
      main.style.marginLeft="15rem"
    }

   }
   const [poems, setpoems] = useState([])
  //  setloadedPoem(false)
   const fetchPoems = async (e)=>{
     setloadedPoem(false)
    const mediaQuery = window.matchMedia('(max-width: 450px)')
     const nav = document.getElementById("authorNav")
     if(mediaQuery.matches){
      nav.classList.toggle("slideNav2")
      nav.style.background="#240b36d4"
    }
    else{
    nav.classList.toggle("slideNav")
    nav.style.background="transparent"

    }

     document.getElementById("toggleBtn").classList.remove("close")
     document.getElementById("main").style.marginLeft="0"
     const data = await fetch(`https://poetrydb.org/author/${e.target.outerText.replace(/ /g, '%20')}`)
     const parsedData = await data.json()
     setpoems(parsedData)
     setauthorprop(e.target.outerText)
     setloadedPoem(true)
   }

  //  POEMS FETCH

   

  return (
    <div>
      <div id='toggleBtn' className='menuBar' onClick={toggleNav}>
        <span id='bar'></span>
        <span id='bar'></span>
        <span id='bar'></span>
        </div>
        <div id='authorNav' className='authorContainer '>
             <div className='authorNavIn'>
               {!loadedAuthor?<div><img className='loader' src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' alt='loader'></img></div>:author.map((element)=>{
                return(
                <p id='authorElement' className='authorElement mx-2' onClick={fetchPoems} key={element} value={element}>{element}</p>
                )
              })}
             </div>
        </div>

             {/* POEMS */}
              <div id='main' className='poemContainer'>
                <h1 id='header'><span>P</span>oems</h1>
                <p>{authorprop===""?"":"by "+authorprop}</p>
                  <div>
                    {!loadedPoem?<div><img className='loader' src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' alt='loader'></img></div>:poems.map((element)=>{
                      return(
                        < div className='poem' key={element.lines[0]+a}>  
                        <h4 className='mt-5 mb-3 heading'>{element.title}</h4>
                         { element.lines.map((item)=>{
                         return (<p className='lines' key={a++}>{item}</p>)
                        })}
                          <p>* * *</p>
                        </div>
                    
                      )
                    })}
                  </div>

                </div>


    </div>
  )
}

export default Authors