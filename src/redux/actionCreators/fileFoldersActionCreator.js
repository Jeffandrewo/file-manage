import * as types from "../actionsTypes/fileFoldersActionTypes";
import fire from "../../API/firebase";
// actions

const addFolder = (payload) => ({
    type: types.CREATE_FOLDER,
    payload
});

const addFolders = (payload) => ({
    type: types.ADD_FOLDERS,
    payload,
});

const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload,
});

const setChangeFolder = (payload) => ({
    type: types.CHANGE_FOLDER,
    payload,
})

// actionc creators

export const createFolder = (data) =>(dispatch) =>{
    fire
    .firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
        const folderData = await (await folder.get()).data();
        const folderId = folder.id;
        dispatch(addFolder({ data: folderData, docId: folderId }));
        alert("Folder created successfully!");
    });
};

export const getFolders = (userId) => (dispatch) => {
    dispatch(setLoading(true));
    fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
        const foldersData = await folders.docs.map((folder) => ({
            data: folder.data(),
            docId: folder.id,
        }));
        dispatch(setLoading(false));
        dispatch(addFolders(foldersData));
        
    });
};

export const changeFolder = (folderId) => (dispatch) => {
    dispatch(setChangeFolder(folderId));
}




//error data: folder.data() || {},