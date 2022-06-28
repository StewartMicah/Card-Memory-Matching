import React, {useState, useEffect} from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import _ from 'lodash'


const App = () => {
  const [cards, setcards] = useState([]);

  useEffect(() => {
    let cardFace = [];

    for (let i = 0; i < 15; i++){
      cardFace.push(i);
      cardFace.push(i);
      console.log(cardFace);
    }

    setcards(_.shuffle(cardFace))
  }, [])
  const rows  = _.chunk(cards, 6)
  console.log(rows)
  return (
    <div>
      {rows.map((Cards) => <div className='cards'>{Cards.map((card) => <div className='card'><div>{card}</div></div>)}</div>)}
    </div>
  )
  
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);