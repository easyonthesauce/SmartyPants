export type Item = { label: string; emoji: string; correct?: boolean }
export type Level = { prompt: string; items: Item[]; goal?: number; positive?: string; negative?: string }
export type Episode = {
  id: string
  title: string
  subtitle: string
  emoji: string
  levels: Level[]
}

export const episodes: Episode[] = [

  {
    id: 'mr-rabbit-color-adventure',
    title: "Mr Rabbit's Color Adventure",
    subtitle: 'A wise, funny bunny guides color play',
    emoji: '🐇',
    levels: [
      { 
        prompt: 'Hello, little friend. I am Mr Rabbit. Tap the BLUE circle, please.', 
        items: [
          { label: 'Blue', emoji:'🔵', correct:true },
          { label: 'Red', emoji:'🔴' },
          { label: 'Yellow', emoji:'🟡' },
          { label: 'Green', emoji:'🟢' },
        ],
        goal: 1,
        positive: 'Spot on. Dry as toast, but I am impressed.', 
        negative: 'Not quite—try the blue one.'
      },
      { 
        prompt: 'Splendid. Now tap BLUE and GREEN. Two taps, two triumphs.', 
        items: [
          { label: 'Blue', emoji:'🔵', correct:true },
          { label: 'Green', emoji:'🟢', correct:true },
          { label: 'Red', emoji:'🔴' },
          { label: 'Yellow', emoji:'🟡' },
        ],
        goal: 2,
        positive: 'Excellent work. You’re rather good at this, aren’t you?', 
        negative: 'Close, but let’s find blue and green.'
      },
      { 
        prompt: 'Final round: only BLUE. Quick as a bunny hop.', 
        items: [
          { label: 'Blue', emoji:'🔵', correct:true },
          { label: 'Blue', emoji:'🔵', correct:true },
          { label: 'Red', emoji:'🔴' },
          { label: 'Green', emoji:'🟢' },
        ],
        goal: 2,
        positive: 'Magnificent. If I wore a hat, I’d tip it.', 
        negative: 'Ah, not that one. Seek the blue.'
      }
    ]
  },

  {
    id: 'color-catch',
    title: 'Color Catch',
    subtitle: 'Tap all the blue ones!',
    emoji: '🔵',
    levels: [
      { prompt: 'Find the blue circles!', items: [
        { label: 'Blue', emoji:'🔵', correct:true },
        { label: 'Red', emoji:'🔴' },
        { label: 'Green', emoji:'🟢' },
        { label: 'Yellow', emoji:'🟡' },
      ], goal: 1 },
      { prompt: 'Tap the blue and green shapes!', items: [
        { label: 'Blue', emoji:'🔵', correct:true },
        { label: 'Green', emoji:'🟢', correct:true },
        { label: 'Red', emoji:'🔴' },
        { label: 'Yellow', emoji:'🟡' },
      ], goal: 2 },
      { prompt: 'Only the blue ones this time!', items: [
        { label: 'Blue', emoji:'🔵', correct:true },
        { label: 'Blue', emoji:'🔵', correct:true },
        { label: 'Red', emoji:'🔴' },
        { label: 'Green', emoji:'🟢' },
      ], goal: 2 }
    ]
  },
  {
    id: 'shape-sort',
    title: 'Shape Sort',
    subtitle: 'Squares vs circles',
    emoji: '🟦',
    levels: [
      { prompt: 'Tap the squares', items: [
        { label: 'Square', emoji:'🟦', correct:true },
        { label: 'Circle', emoji:'🔵' },
        { label: 'Square', emoji:'🟦', correct:true },
        { label: 'Circle', emoji:'🔵' },
      ], goal: 2 },
      { prompt: 'Tap circles only', items: [
        { label: 'Circle', emoji:'🔵', correct:true },
        { label: 'Square', emoji:'🟦' },
        { label: 'Circle', emoji:'🔵', correct:true },
        { label: 'Triangle', emoji:'🔺' },
      ], goal: 2 }
    ]
  },
  {
    id: 'animal-sounds',
    title: 'Animal Sounds',
    subtitle: 'What says moo?',
    emoji: '🐮',
    levels: [
      { prompt: 'Tap the animal that says "moo"', items: [
        { label: 'Cow', emoji:'🐮', correct:true },
        { label: 'Dog', emoji:'🐶' },
        { label: 'Cat', emoji:'🐱' },
        { label: 'Chicken', emoji:'🐔' },
      ], goal: 1 },
      { prompt: 'Tap the animals that say "woof" or "meow"', items: [
        { label: 'Dog', emoji:'🐶', correct:true },
        { label: 'Cat', emoji:'🐱', correct:true },
        { label: 'Cow', emoji:'🐮' },
        { label: 'Horse', emoji:'🐴' },
      ], goal: 2 }
    ]
  },
  {
    id: 'counting-bubbles',
    title: 'Counting Bubbles',
    subtitle: 'Tap 1, 2, 3...',
    emoji: '🔢',
    levels: [
      { prompt: 'Tap number 1', items: [
        { label: '1', emoji:'1️⃣', correct:true },
        { label: '2', emoji:'2️⃣' },
        { label: '3', emoji:'3️⃣' },
        { label: '4', emoji:'4️⃣' },
      ], goal: 1 },
      { prompt: 'Tap 1 and 2', items: [
        { label: '1', emoji:'1️⃣', correct:true },
        { label: '2', emoji:'2️⃣', correct:true },
        { label: '3', emoji:'3️⃣' },
        { label: '4', emoji:'4️⃣' },
      ], goal: 2 }
    ]
  }
]
