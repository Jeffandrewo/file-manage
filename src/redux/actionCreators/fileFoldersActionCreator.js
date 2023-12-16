import * as types from "../actionsTypes/fileFoldersActionTypes";
import fire from "../../API/firebase";
import { toast } from "react-toastify";
// actions

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
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

const deleteFolder = (payload) => ({
  type: types.DELETE_FOLDER,
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

const deleteFile = (payload) => ({
  type: types.DELETE_FILE,
  payload,
});

// actionc creators

export const createFolder = (data) => (dispatch) => {
  fire
    .firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      dispatch(addFolder({ data: folderData, docId: folderId }));
      toast.success("Folder created successfully!");
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
};

export const deleteFolderAction = (folderId) => (dispatch) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete the folder?"
  );
  if (confirmDelete) {
    fire
      .firestore()
      .collection("folders")
      .doc(folderId)
      .delete()
      .then(() => {
        dispatch(deleteFolder(folderId));
        toast.success("Folder deleted successfully!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  }
};
// action creator for files

export const getFiles = (userId) => (dispatch) => {
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
};

export const createFile = (data, setSuccess) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      dispatch(addFile({ data: fileData, docId: fileId }));
      toast.success("File created successfully!");
      setSuccess(true);
    })
    .catch(() => {
      setSuccess(false);
    });
};

export const updateFileData = (fileId, data) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success("File saved successfully!");
    })
    .catch(() => {
      toast.error("Something went wrong!");
    });
};

export const uploadFile = (file, data, setSuccess) => (dispatch) => {
  const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

  uploadFileRef.put(file).on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log("Uploading" + progress + "%");
    },
    (error) => {
      console.log(error);
    },
    async () => {
      const fileUrl = await uploadFileRef.getDownloadURL();
      const fullData = { ...data, url: fileUrl };

      fire
        .firestore()
        .collection("files")
        .add(fullData)
        .then(async (file) => {
          const fileData = await (await file.get()).data();
          const fileId = file.id;
          dispatch(addFile({ data: fileData, docId: fileId }));
          toast.success("File Uploaded Successfully!");
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
        });
    }
  );
};

export const deleteFileAction = (fileId) => (dispatch) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete the file?"
  );
  if (confirmDelete) {
    fire
      .firestore()
      .collection("files")
      .doc(fileId)
      .delete()
      .then(() => {
        dispatch(deleteFile(fileId));
        toast.success("File deleted successfully!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  }
};

//error data: folder.data() || {},
