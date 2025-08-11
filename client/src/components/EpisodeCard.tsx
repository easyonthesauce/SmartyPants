import React from 'react'
import { Episode } from '../episodes/episodes'

export default function EpisodeCard({ episode, onPlay }: { episode: Episode, onPlay: ()=>void }){
  return (
    <div className="episode-card" style={{display:'grid', gridTemplateColumns:'80px 1fr auto', gap:12, padding:12, borderRadius:12, background:'#0f162c', border:'1px solid #1c2b55'}}>
      <div style={{background:'#0b1129', borderRadius:12, display:'grid', placeItems:'center', fontSize:28}}>{episode.emoji}</div>
      <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{fontWeight:700}}>{episode.title}</div>
        <div style={{fontSize:12, opacity:.7}}>{episode.subtitle}</div>
      </div>
      <button className="btn" onClick={onPlay}>Play</button>
    </div>
  )
}
