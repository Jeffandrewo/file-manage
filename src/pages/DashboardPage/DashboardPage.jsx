import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from '../../components/DashboardComponents/Navbar/Navbar';
import SubBar from '../../components/DashboardComponents/SubBar/SubBar';
import HomeComponent from '../../components/DashboardComponents/HomeComponent/HomeComponent';
import CreateFolder from '../../components/DashboardComponents/CreateFolder/CreateFolder';
import { getFolders } from '../../redux/actionCreators/fileFoldersActionCreator';
import FolderComponent from '../../components/DashboardComponents/FolderComponent/FolderComponent';


const DashboardPage = () => {

  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

  const {isLoggedIn, isLoading, userId} = useSelector(state => ({
    isLoggedIn:state.auth.isAuthenticated,
    isLoading:state.filefolders.isLoading,
    userId: state.auth.user.uid,
  }), shallowEqual);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isLoading && userId){
      dispatch(getFolders(userId))
    }
  }, [isLoading, userId, dispatch]);

  return (
    <>
    {
      isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )
    }
      <Navbar />
      <SubBar 
        setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
      />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="folder/:folderId" element={ <FolderComponent />} />
      </Routes>
    </>
  );
};

export default DashboardPage;