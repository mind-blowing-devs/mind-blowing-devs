import { useState, useEffect } from 'react'
import { Button } from '../../../../components'

export default function PlayTips() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const wasShown = Boolean(localStorage.getItem('tipWasShown'))
    if (!wasShown) {
      setVisible(true)
    }
  }, [])

  const closeHandler = () => {
    setVisible(false)
    localStorage.setItem('tipWasShown', 'true')
  }

  if (!visible) return null
  return (
    <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-[#000000b5]">
      <h1 className="w-full max-w-[250px] sm:max-w-xl mb-[32px] sm:text-xl text-center text-white">
        Game Controls
      </h1>
      <div className="bg-[#BFBFBF] border-4 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] p-[4px]">
        {/* PC tips */}
        <table className="xl:block hidden">
          <tbody>
            <Tip icon="/keyboard-icons/cursor.png" text="select a cell" />
            <Tip icon="/keyboard-icons/f.png" text="to place a flag" />
            <Tip
              icon="/keyboard-icons/enter-and-x.png"
              text="to reveal a cell"
            />
            <Tip icon="/keyboard-icons/w.png" text="move pointer up" />
            <Tip icon="/keyboard-icons/a.png" text="move pointer left" />
            <Tip icon="/keyboard-icons/s.png" text="move pointer right" />
            <Tip icon="/keyboard-icons/d.png" text="move pointer down" />
          </tbody>
        </table>

        {/* Mobile tips */}
        <table className="xl:hidden block">
          <tbody>
            <Tip
              icon="/keyboard-icons/cursor-click.png"
              text="[click] to reveal a cell"
            />
            <Tip
              icon="/keyboard-icons/cursor-click.png"
              text="[hold] to place a flag"
            />
            <Tip
              icon="/keyboard-icons/move-gesture.png"
              text="[drag] to move the field"
            />
            <Tip
              icon="/keyboard-icons/zoom-in.png"
              text="[zoom] to zoom the field"
            />
          </tbody>
        </table>
      </div>
      <Button
        isLink={false}
        ariaLabel="Leaderboard"
        variant="primary"
        onClick={closeHandler}
        className="w-[256px] max-w-xs my-3 sm:my-4">
        Got it
      </Button>
    </div>
  )
}

function Tip({ icon, text }: { icon: string; text: string }) {
  return (
    <tr>
      <td>
        <img
          src={icon}
          className="w-[50px] sm:w-[65px] h-[50px] sm:h-[65px]"
          alt="tip icon"
        />
      </td>
      <td className="text-black sm:text-sm text-xs">{text}</td>
    </tr>
  )
}
