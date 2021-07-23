import React, { useState, useEffect } from 'react'
import buttons from './buttons'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const getPerson = async () => {
    setIsLoading(true)
    const response = await fetch(url)
    const newPerson = await response.json()
    console.log(newPerson)
    const {
      phone,
      email,
      picture: { large: image },
      login: { password },
      name: { first, last },
      dob: { age },
      location: {
        street: { number, name },
      },
    } = newPerson.results[0]

    setPerson({
      name: `${first} ${last}`,
      image,
      phone,
      email,
      street: `${number} ${name}`,
      age,
      password,
    })

    setTitle('name')
    setValue(`${first} ${last}`)
    setIsLoading(false)
  }

  useEffect(() => {
    getPerson()
  }, [])

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }
  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.image) || defaultImage}
            alt='randome user'
            className='user-img'
          />
          <p className='user-title'>my {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            {buttons.map((button) => {
              return (
                <button
                  title={(person && person[button.label]) || button.label}
                  className='icon'
                  key={button.id}
                  data-label={button.label}
                  onMouseOver={(e) => handleValue(e)}
                >
                  {<button.icon />}
                </button>
              )
            })}
          </div>
          <button type='button' className='btn' onClick={getPerson}>
            {isLoading ? 'is loading...' : 'random  user'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
