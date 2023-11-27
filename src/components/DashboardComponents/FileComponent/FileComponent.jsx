import { useParams } from "react-router-dom";
import Header from "./Header";
import { shallowEqual, useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";


const FileComponent = () => {
    const { fileId } = useParams()

    const {currentFile} = useSelector((state) => ({
        currentFile: state.filefolders.userFiles.find((file) => file.docId === fileId)
    }), shallowEqual);

     // Check if currentFile and currentFile.data are defined
  const fileName = currentFile?.data?.name || "No Name";


  return (
    <div>
        <Header fileName = {fileName}/>
        
        <CodeEditor fileName={fileName} />
       
    </div>
  )
}

export default FileComponent

// not sure if correct