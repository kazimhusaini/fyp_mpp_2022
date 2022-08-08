import { Navbar } from "../../components/navbar/Navbar"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Feacturd } from "../../components/featured/Feacturd"
import { Widget } from "../../components/widget/Widget"
import { Chart } from "../../components/chart/Chart"

import "./chat.scss"
import { ListTable } from "../../components/table/Table"
import Chat from "../../../Chat"
export function ChatDash() {
  return (
    <div className='chat'>
      <Sidebar />
      <div className="chatContainer">
        <Navbar />
        <div className="chatC">
          <Chat />
        </div>
      </div>
    </div>
  )
}

