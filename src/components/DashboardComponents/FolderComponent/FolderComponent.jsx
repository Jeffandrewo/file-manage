import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import ShowItems from "../ShowItems/ShowItems";
import { createSelector } from "reselect";


const selectFileFoldersState = (state) => state.filefolders;

const selectUserFolders = createSelector(
    selectFileFoldersState,
    (filefolders) => filefolders.userFolders
);

const selectCurrentFolderData = createSelector(
    [selectUserFolders, (_, { folderId }) => folderId],
    (userFolders, folderId) =>
        userFolders.find((folder) => folder.docId === folderId)?.data
);

const selectChildFolders = createSelector(
    [selectUserFolders, (_, { folderId }) => folderId],
    (userFolders, folderId) =>
        userFolders.filter((folder) => folder.data.parent === folderId)
);
const FolderComponent = () => {

    const { folderId } = useParams();

    const { currentFolderData, childFolders } = useSelector(
      (state) => ({
          currentFolderData: selectCurrentFolderData(state, { folderId }),
          childFolders: selectChildFolders(state, { folderId }),
      }),
      shallowEqual
  );


  return (
    <div>
      {
        childFolders.length > 0 ? (
          <>
            <ShowItems 
              title={"Created Folders"} 
              type={"folder"}
              items={childFolders}
            />
          </>
        ): (
          <p className="text-center my-5">
            Empty Folder
          </p>
        )
      }
    </div>

  )
}

export default FolderComponent;

//have error