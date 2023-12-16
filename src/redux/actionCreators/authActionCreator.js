import * as types from "../actionsTypes/authActionTypes";
import  fire from "../../API/firebase";
import { toast } from "react-toastify";

const loginUser = (payload) => {
    return {
        type: types.SIGN_IN ,
        payload, 
    };
};

const logoutUser = () => {
    return {
        type: types.SIGN_OUT , 
    };
};

const resetPassword = () => {
    return {
      type: types.RESET_PASSWORD,
    };
  };

const deleteAccount = () => {
    return {
      type: types.DELETE_ACCOUNT,
    };
  };

  const updateUserImage = (imageUrl) => {
    return {
      type: types.UPDATE_USER_IMAGE,
      payload: imageUrl,
    };
  };


//action creator

export const signInUser = (email, password, setSuccess) => (dispatch) => {
    fire.auth().signInWithEmailAndPassword(email, password).then(user=> {
        dispatch(loginUser({
            uid: user.user.uid, 
            email: user.user.email, 
            displayName: user.user.displayName
            })
        );
        setSuccess(true);
    })
    .catch(error =>  {
        toast.error("Invalid Email or password!");
    });
};

export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
    fire.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        fire.auth().currentUser.updateProfile({
            displayName: name,
        }).then(() =>{
            const currentUser = fire.auth().currentUser;
            dispatch(
                loginUser({
                    uid: currentUser.uid, 
                    name: currentUser.displayName, 
                    email: currentUser.email,
                })
            );
            setSuccess(true);
            // Reload the page after successful account creation
            window.location.href = "/";
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        if(error.code == "auth/email-already-in-use"){
            toast.error("Email already in use!");
        }
        if(error.code == "auth/invalid-email"){
            toast.error("Invalid email!");
        }
        if(error.code == "auth/weak-password"){
            toast.error("Weak password!");
        }
    })
};

export const SignOutUser = () => (dispatch) => {
    fire.auth().signOut().then(() => {
        dispatch(logoutUser());
        // Reload the page after signing out newly added
        window.location.reload();
    });
};

export const checkIsLoggedIn = () => dispatch => {
    fire.auth().onAuthStateChanged(user => {
        if (user){
            dispatch(loginUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                })
            );
        }
    });
};

export const resetPasswordUser = (email, setSuccess) => (dispatch) => {
    fire
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        toast.success("Password reset link sent to your email!");
        dispatch(resetPassword());
        setSuccess(true);
      })
      .catch((error) => {
        if (error.code == "auth/invalid-email") {
          toast.error("Invalid email!");
        }
        if (error.code == "auth/user-not-found") {
          toast.error("User not found!");
        }
      });
  };
  
  export const deleteAccountUser = (setSuccess) => (dispatch) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      fire
        .auth()
        .currentUser.delete()
        .then(() => {
          dispatch(deleteAccount());
          setSuccess(true);
          toast.success("Account deleted successfully!");
        })
        .catch((error) => {
          toast.error("Something went wrong!");
          console.log(error);
        });
    }
  };

  export const fetchUserImage = (uid) => (dispatch) => {
    try {
      const storageRef = fire.storage().ref();
      const imageRef = storageRef.child(`images/${uid}.PNG`);
      imageRef.getDownloadURL().then((imageUrl) => {
        dispatch(updateUserImage(imageUrl));
      }).catch((error) => {
        // Handle object not found error
        console.error('Error fetching user image:', error);
      });
    } catch (error) {
      console.error('Error fetching user image:', error);
    }
  };