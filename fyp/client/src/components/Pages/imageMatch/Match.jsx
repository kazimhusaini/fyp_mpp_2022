import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Navbar } from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import UploadImage from "../../UploadImage";
import "./match.scss";

export default function Match() {
  const { user } = useContext(Context);
  return (
    <>
      {user ?
        <div className='Match'>
          <Sidebar />
          <div className="MatchContainer">
            <Navbar />
            <div className="MatchForm">
              <UploadImage />
            </div>
          </div>
        </div>
        :
        (null)
      }
    </>
  );
}
