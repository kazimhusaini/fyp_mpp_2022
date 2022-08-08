import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Navbar } from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.scss";

export default function Single() {
  const { user } = useContext(Context);
  return (
    <>
      {user ?
        <div className='single'>
          <Sidebar />
          <div className="singleContainer">
            <Navbar />
            <div className="singleForm">
              <SinglePost />
            </div>
          </div>
        </div>
        :
        <div  className="singleForme" > <SinglePost /> </div>
      }
    </>
  );
}
