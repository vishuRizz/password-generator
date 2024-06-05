import { useState, useCallback,useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumeberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    } if(charAllowed){
      str += "!@#$%^&*():"
    }
    for(let i=1; i<=length; i++){
     let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
  setpassword(pass)

  }, [length, numberAllowed,charAllowed, setpassword])  // dependencies for the callback function as it may remain in the chache for now, but when called by theze dependencies it may be called back, these dependencies are for better optimisation
   useEffect(() => {
    passwordGenerator()
   },[length, numberAllowed,charAllowed, passwordGenerator])  // use effect dependencies should not be compared with those of useCallback as these dep.. make sure whenever we change the function will be runned again

   const copyPassword = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
   },[password])
   
  
  return (
    <>
     <div className="w-full max-w-lg px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md">
      <h1 className='my-3 text-center text-orange-400'>Password generator</h1>
    <div className="flex mb-4 overflow-hidden rounded-lg shadow">
        <input
            type="text"
            value={password}
            className="w-full px-3 py-1 outline-none"
            placeholder="Password"
           // readOnly
            
        />
        <button id='copy' class="rounded-s-sm bg-cyan-300 px-2 mx-1"
         onClick={copyPassword}>copy
        </button>
      </div>
      <div className='flex items-center gap-x-2'>
        <div >
          <input  
          type="range"
          min={6}
          max={25}
          className='ml-2 cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />  Length: {length} 
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=> {setNumeberAllowed(prev => !prev)}}
          />
          <label htmlFor="numberInpur">Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          id='CharInput'
          onChange={()=> {setCharAllowed(prev => !prev)}}
          />
          <label htmlFor="CharInpur">Character</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
