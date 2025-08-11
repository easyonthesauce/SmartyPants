import React, { useEffect, useMemo, useRef, useState } from 'react'
import { startVoiceSession, VoiceMode } from './convai'
import { Episode, episodes } from './episodes/episodes'
import GameEngine from './components/GameEngine'
import EpisodeCard from './components/EpisodeCard'

type Props = { voiceMode: VoiceMode }

export default function App({ voiceMode }: Props){
  const [status, setStatus] = useState('disconnected')
  const [transcripts, setTranscripts] = useState<Array<{role:'user'|'assistant', text:string, tentative?:boolean}>>([])
  const [active, setActive] = useState<Episode>(episodes[0])
  const [level, setLevel] = useState(0)
  const [connected, setConnected] = useState(false)

  const clientApi = useMemo(()=> ({
    play_animation: ({ name }: {name:string}) => {
      // could trigger named animations in the UI
      console.log('play_animation', name)
      pulse()
    },
    start_game: ({ episodeId, level }: {episodeId:string, level?:number}) => {
      const ep = episodes.find(e=> e.id === episodeId)
      if(ep){ setActive(ep); if(typeof level === 'number') setLevel(level) }
    },
    set_difficulty: ({ level }: {level:number}) => setLevel(level),
    switch_episode: ({ episodeId }: {episodeId:string}) => {
      const ep = episodes.find(e=> e.id === episodeId)
      if(ep) setActive(ep)
    },
    show_celebration: () => confetti()
  }), [])

  function onTranscript(t: string, role: 'user'|'assistant', tentative?:boolean){
    setTranscripts(prev=> [...prev.slice(-8), { role, text: t, tentative }])
  }

  async function connect(){
    const session = await startVoiceSession(voiceMode, clientApi, setStatus, onTranscript)
    ;(window as any).__tpSession = session
    setConnected(true)
  }
  function disconnect(){
    (window as any).__tpSession?.endSession?.()
    setConnected(false)
  }

  // simple sparkle effect on hover
  function pulse(){
    const el = document.querySelector('.sparkle') as HTMLElement
    if(!el) return
    el.style.setProperty('opacity', '1')
    setTimeout(()=> el.style.removeProperty('opacity'), 400)
  }

  function confetti(){
    const el = document.querySelector('#celebrate') as HTMLElement
    if(!el) return
    el.animate([{ transform:'scale(0.9)' }, { transform:'scale(1.05)' }, { transform:'scale(1)' }], { duration: 500, easing: 'cubic-bezier(.2,.8,.2,1)' })
  }

  const latest = episodes[0]
  const back = episodes.slice(1, 4)

  return (
    <div style={{padding:'24px', maxWidth: 1200, margin: '0 auto'}}>
      <div className="sparkle"></div>
      <header style={{display:'flex', alignItems:'center', gap:16, marginBottom:24}}>
        <div style={{fontSize:28, fontWeight:800, letterSpacing:.5}}>Teachers<span style={{color:'#7ae3ff'}}>Pet</span></div>
        <span className="pill">Ages 1–5</span>
        <div style={{marginLeft:'auto'}}>
          <button className="btn" onClick={connected ? disconnect : connect}>{connected ? 'Stop Talking' : 'Start Talking'}</button>
          <span style={{marginLeft:12, opacity:.7, fontSize:12}}>{status}</span>
        </div>
      </header>

      <main className="grid" style={{gridTemplateColumns:'1.2fr .8fr'}}>
        <section className="card" style={{padding:16, position:'relative', overflow:'hidden'}}>
          <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:12}}>
            <div style={{fontSize:18, fontWeight:700}}>Latest Episode</div>
            <span className="pill">{latest.title}</span>
          </div>
          <EpisodeCard episode={latest} onPlay={()=> setActive(latest)} />
          <div style={{height:12}}/>
          <GameEngine episode={active} level={level} onLevelUp={()=> setLevel(l=> l+1)} />
          <div id="celebrate" style={{position:'absolute', right:16, bottom:16, fontSize:12, opacity:.6}}>✨ celebration</div>
        </section>

        <aside className="card" style={{padding:16}}>
          <div style={{fontSize:18, fontWeight:700, marginBottom:12}}>Previously</div>
          <div className="grid" style={{gridTemplateColumns:'1fr', gap:12}}>
            {back.map(ep=> <EpisodeCard key={ep.id} episode={ep} onPlay={()=> setActive(ep)} />)}
          </div>

          <div style={{marginTop:16}}>
            <div style={{fontWeight:700, marginBottom:8}}>Live captions</div>
            <div style={{fontSize:12, lineHeight:1.3, maxHeight: 120, overflowY:'auto', padding:12, background:'#0f162c', borderRadius:12, border:'1px solid #1c2b55'}}>
              {transcripts.map((t,i)=> <div key={i} style={{opacity:t.tentative?.valueOf()?0.6:1}}><b>{t.role}:</b> {t.text}</div>)}
            </div>
          </div>
        </aside>
      </main>

      <footer style={{opacity:.7, marginTop:24, fontSize:12}}>Prototype for demo purposes only. Voices powered by ElevenLabs.</footer>
    </div>
  )
}
