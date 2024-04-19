import { useState, useCallback, useRef, useEffect } from 'react'


function App() {
  const [pass, setPass] = useState('fdgdfgd')
  const [length, setLength] = useState(8)
  const [allowNum, setAllowNum] = useState(false)
  const [allowChar, setAllowChar] = useState(false)
  console.log('checked ', allowChar);
  console.log('checked ', allowNum);
  console.log('checked ', length);

  const passRef = useRef(null)

  const passGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (allowNum) {
      str += '0123456789'
    }
    if (allowChar) {
      str += '!@#$%^&*_'
    }

    for (let i = 0; i < length; i++) {
      let rn = Math.floor(Math.random() * str.length);
      pass += str.charAt(rn);

    }
    setPass(pass)
    passRef.current.value = pass;

  }, [allowChar, allowNum, length, setPass])


  useEffect(() => {
    passGenerator();
  }, [allowChar, allowNum, length]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(pass);
    passRef.current.select();
    document.execCommand('copy');
  };


  return (
    <>
      <div className='w-full text-center  h-screen bg-orange-500'>
        <div className='shadow-lg bg-blue-400 rounded-md mt-10  px-5 py-3 inline-block'>
          <div className='text-2xl font-medium text-center text-white mb-3 '>Password generator <span className='text-xs text-black font-light'>&copy; kanhaiya mark</span></div>
          <div>
            <input type="text" className='p-1 rounded-sm shadow-md outline-none min-w-[80%]'
              readOnly
              ref={passRef}
              placeholder='password'
            />
            <button
              onClick={handleCopyClick}
              className='text-while bg-blue-800 shadow-lg px-3 py-1 outline-none rounded-sm'>copy</button>
          </div>
          <div className='mt-2 text-white flex gap-4'>
            <div className='flex items-center gap-2'>
              <input type="range"
                id='len'
                min={8}
                max={100}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
              /> <label htmlFor="len" className='text-sm text-white'>{length}</label>
            </div>
            <div>
              <input
                className='mr-2'
                type="checkbox"
                id='num'
                onClick={() => setAllowNum((pre) => !pre)}
              /> <label htmlFor='num'>allowNumber</label>
            </div>
            <div>
              <input type="checkbox"
                id='char'
                className='mr-2'
                onClick={() => setAllowChar((pre) => !pre)}
              /> <label htmlFor="char">allowCharacter</label>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
