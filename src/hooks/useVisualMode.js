import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const newHistory = [...history];
    if (replace) {
      newHistory.pop()
    }
    setHistory([...newHistory, newMode])
  }

  const back = () => {
    if (history.length < 2) {
      return;
    }
    const newHistory = history.slice(0, history.length-1)
    setHistory(newHistory);
  }
  const mode = history[history.length-1]
  return { mode, transition, back };
}


// export default function useVisualMode(initial) {
//   const [history, setHistory] = useState([initial]);

//   const transition = (newMode, replace = false) => {
//     const newHistory = [...history];
//     if (replace) {
//       newHistory.pop()
//     }

//     setHistory([...newHistory, newMode])
//   }

//   const back = () => {
//     if (history.length < 2) {
//       return;
//     }
//     const newHistory = history.slice(0, history.length-1)
//     setHistory(newHistory);
//   }
//   const mode = history[history.length-1]
//   return { mode, transition, back, history };
// }


// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   const transition = (newMode, replace = false ) => {
//     setMode(newMode)
//     setHistory([...history, mode])
//   }

//   const back = () => {
//     if (history.length > 1) {
//       const newHistory = history.slice(0, history.length-1)
//       setHistory(newHistory);
//       setMode(history[history.length-1])
//     }
//   }

//   return { mode, transition, back };
// }
