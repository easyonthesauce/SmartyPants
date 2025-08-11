// ElevenLabs Conversational AI integration + client tools wiring
import { Conversation, ClientTools } from '@elevenlabs/client'

export type VoiceMode = 'public' | 'signed' | 'mock'

const AGENT_ID = import.meta.env.VITE_ELEVEN_AGENT_ID || 'YOUR_PUBLIC_AGENT_ID' // set in Vercel/Netlify env

export interface TPClientAPI {
  play_animation: (params: { name: string }) => void
  start_game: (params: { episodeId: string, level?: number }) => void
  set_difficulty: (params: { level: number }) => void
  switch_episode: (params: { episodeId: string }) => void
  show_celebration: (params?: { kind?: string }) => void
}

export async function startVoiceSession(mode: VoiceMode, clientApi: TPClientAPI, onStatus: (s: string)=>void, onTranscript: (t: string, role: 'user'|'assistant', tentative?: boolean)=>void){
  if(mode === 'mock'){
    onStatus('connected (mock)')
    // Minimal demo: speak assistant messages via Web Speech API
    return {
      endSession: async () => onStatus('disconnected'),
      say: (text: string)=> { const u = new SpeechSynthesisUtterance(text); speechSynthesis.speak(u); onTranscript(text, 'assistant'); }
    }
  }

  const clientTools = new ClientTools()
  clientTools.register('play_animation', (params:any)=> clientApi.play_animation(params))
  clientTools.register('start_game', (params:any)=> clientApi.start_game(params))
  clientTools.register('set_difficulty', (params:any)=> clientApi.set_difficulty(params))
  clientTools.register('switch_episode', (params:any)=> clientApi.switch_episode(params))
  clientTools.register('show_celebration', (params:any)=> clientApi.show_celebration(params))

  await navigator.mediaDevices.getUserMedia({ audio: true })

  let options: any = { clientTools }
  if(mode === 'public'){
    options.agentId = AGENT_ID
  } else {
    const res = await fetch(`${import.meta.env.VITE_PROXY_URL || ''}/api/signed-url`)
    const signedUrl = await res.text()
    options.signedUrl = signedUrl
  }

  options.onStatusChange = (s: any)=> onStatus(String(s))
  options.onMessage = (m: any)=> {
    if(m?.type === 'message'){
      onTranscript(m?.content || '', m?.role || 'assistant', m?.tentative)
    }
  }

  const conv = await Conversation.startSession(options)

  return {
    endSession: ()=> conv.endSession(),
    say: async (text:string)=> {
      // The agent does speaking; this utility is for mock mode parity
      onTranscript(text, 'assistant')
    }
  }
}
