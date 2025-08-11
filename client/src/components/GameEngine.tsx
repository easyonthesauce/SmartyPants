import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Episode } from '../episodes/episodes'

type Props = {
  episode: Episode
  level: number
  onLevelUp: ()=>void
}

export default function GameEngine({ episode, level, onLevelUp }: Props){
  const [prompt, setPrompt] = useState(episode.levels[level]?.prompt || 'Ready?')
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(()=>{
    setPrompt(episode.levels[level]?.prompt || 'Ready?')
    setScore(0)
    setDone(false)
  }, [episode, level])

  const items = useMemo(()=> episode.levels[level]?.items || [], [episode, level])

  function onItemClick(idx:number){
    const it = items[idx]
    if(it.correct){
      setScore(s=> s+1)
      speak(episode.levels[level]?.positive || 'Great job!')
      if(score + 1 >= (episode.levels[level]?.goal || items.length)){
        setDone(true)
        setTimeout(()=> onLevelUp(), 700)
      }
    }else{
      speak(episode.levels[level]?.negative || 'Try again')
    }
  }

  function speak(text:string){
    if('speechSynthesis' in window){
      const u = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(u)
    }
  }

  return (
    <div className="card" style={{padding:16, marginTop:12}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{fontWeight:700}}>{episode.title} — Level {level+1}</div>
        <div className="pill">Score: {score}</div>
      </div>
      <div style={{fontSize:14, opacity:.8, margin:'6px 0 12px'}}>{prompt}</div>
      <div className="grid" style={{gridTemplateColumns:'repeat(4, minmax(0,1fr))'}}>
        {items.map((it, i)=> (
          <button key={i} className="btn" style={{height:72}} onClick={()=> onItemClick(i)}>
            <span style={{fontSize:24}}>{it.emoji}</span><br/>
            <span style={{fontSize:12, opacity:.8}}>{it.label}</span>
          </button>
        ))}
      </div>
      {done && <div style={{marginTop:12, fontWeight:700}}>Level up! 🎉</div>}
    </div>
  )
}
