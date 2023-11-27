import { useParams } from "react-router-dom";
import Header from "./Header";
import { shallowEqual, useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";
import { useEffect, useState } from "react";


const FileComponent = () => {
    const { fileId } = useParams()
    const [fileData, setFileData] = useState("");

    const {currentFile} = useSelector((state) => ({
        currentFile: state.filefolders.userFiles.find(
          (file) => file.docId === fileId)
    }), shallowEqual);

     // Check if currentFile and currentFile.data are defined
  const fileName = currentFile?.data?.name || "No Name";

  useEffect(() => {
    if (currentFile && currentFile.data) {
        setFileData(currentFile.data.data);
    }
  }, [currentFile]);





  return (
    <div>
        <Header fileName = {fileName} 
          fileData={fileData} 
          prevFileData={currentFile?.data?.data}
          fileId={fileId} 
        />
        
        <CodeEditor fileName={fileName} data={fileData} setData={setFileData} />
       
    </div>
  )
}

export default FileComponent

// not sure if correct