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
});

// files

const addFiles = (payload) => ({
    type: types.ADD_FILES,
    payload,
});

const addFile = (payload) => ({
    type: types.CREATE_FILE,
    payload,
});

const setFileData = (payload) => ({
    type: types.SET_FILE_DATA,
    payload,
});

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


// action creator for files

export const getFiles =(userId) => (dispatch) => {
    fire
    .firestore()
    .collection("files")
    .where("userId", "==", userId)
    .get()
    .then(async (files) => {
        const filesData = await files.docs.map((file) => ({
            data: file.data(),
            docId: file.id,
        }));
        dispatch(setLoading(false));
        dispatch(addFiles(filesData));
        
    });
}

export const createFile = (data, setSuccess) => (dispatch) => {
    fire.firestore().collection("files").add(data).then(async (file) => {
        const fileData = await (await file.get()).data();
        const fileId = file.id;
        dispatch(addFile ({ data: fileData, docId: fileId }));
        alert("File created successfully!");
        setSuccess(true);
    }).catch(() => {
        setSuccess(false);
    });
};

export const updateFileData = (fileId, data) => (dispatch) => {
    fire.firestore().collection("files").doc(fileId).update({data}).then(() => {
        dispatch(setFileData({ fileId, data }));
        alert("File saved successfully!")
    }).catch(() => {
        alert("Something went wrong!");
    });
};


//error data: folder.data() || {},