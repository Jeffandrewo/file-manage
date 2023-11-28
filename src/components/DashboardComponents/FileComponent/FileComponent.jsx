import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { shallowEqual, useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";
import { useEffect, useState } from "react";


const FileComponent = () => {
    const { fileId } = useParams()
    const [fileData, setFileData] = useState("");
    //const [prevFileData, setPrevFileData] = useState("");
    
    const navigate = useNavigate();

    const {currentFile} = useSelector((state) => ({
        currentFile: state.filefolders.userFiles.find(
          (file) => file.docId === fileId)
    }), shallowEqual);

     // Check if currentFile and currentFile.data are defined
  const fileName = currentFile?.data?.name || "No Name";

  useEffect(() => {
    if (currentFile && currentFile.data) {
        setFileData(currentFile.data.data);
        //setPrevFileData(currentFile.data.data)
    }
  }, [currentFile]);





  return (
    <div>
      {
        fileData !== null ? 
        (
          <>
      
        <Header fileName = {fileName} 
          fileData={fileData} 
          prevFileData={currentFile?.data?.data}
          fileId={fileId} 
        />
        
        <CodeEditor fileName={fileName} data={fileData} setData={setFileData} />
        </>
      ) : (
        <>
        <h1 className="display-1 my-5 text-center">
          Uploaded files preview coming soon
        </h1>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
        </>
      )}
    </div>
    
  );
};

export default FileComponent

// not sure if correct