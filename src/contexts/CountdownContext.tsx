import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider ({children}: CountdownProviderProps) {
  let countdownTimeout: NodeJS.Timeout


  const {startNewChallenge} = useContext(ChallengesContext)


  const [time, setTime] = useState(0.05 * 60) // quantidade de minutos * 60 ( seriam os segundos)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60) //arredonda para baixo
  const seconds = time % 60 // resto da divisão

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(.05*60)
  }

  useEffect(() => {
    if (isActive && time > 0) { // se está ativo (botão clicado) e o tempo ainda não chegou em ZERO
      countdownTimeout = setTimeout(() => { // algo deve acontecer depois de um tempo, neste caso, após 1 segundo
        setTime(time - 1) // tira um segundo, reduz o time em um segundo
      }, 1000) // a cada um segundo, por isso do 1000 (1s)
    } else if (isActive && time === 0 ) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time]) //toda vez que o valor de active mudar a função é executada
                      // quando fazer isso? toda vez que o time mudar, e como ele muda a cada 1 segundo
                      // o useEffect será chamado sempre até o time chegar em ZERO
  
  
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}