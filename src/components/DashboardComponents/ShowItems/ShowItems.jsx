import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ShowItems.css";
import { faFileAlt, faFolder } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeFolder } from "../../../redux/actionCreators/fileFoldersActionCreator";

const ShowItems = ({ title, items, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDblClick = (itemId) => {
    if (type == "folder") {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
    }
  };

  return (
    <div className="w-100 ">
      <h4 className="text-center border-bottom py-2">{title}</h4>
      <div className="row gap-2 p-3 flex-wrap mx-2">
        {items.map((item, index) => {
          return (
            <p
              key={index * 55}
              className="col-md-2 py-2 text-center flex-column border rounded"
              onDoubleClick={() => handleDblClick(item.docId)}
            >
              {type == "folder" ? (
                <FontAwesomeIcon icon={faFolder} size="1x" className="mx-2" />
              ) : (
                <FontAwesomeIcon icon={faFileAlt} size="1x" className="mx-2" />
              )}
              {item.data.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;

//{item.data && item.data.name} error
