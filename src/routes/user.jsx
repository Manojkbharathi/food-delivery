import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../utils/firebase';
import { useNavigate } from 'react-router';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc, getDoc, collection } from 'firebase/firestore';
import '../components/user.css';
import { useStoreConsumer } from '../context/storeProvider';
const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditingPhoto, setIsEditingPhoto] = useState('');
  const [gender, setGender] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, userEmailData } = useStoreConsumer();
  const navigate = useNavigate();
  const userData =
    user &&
    user.find((item) => item.email === userEmailData.email && userEmailData);
  const userId = userData.id;
  const handleImageUpload = async (userId) => {
    try {
      if (userImage) {
        if (!userImage.type || !userImage.type.startsWith('image/')) {
          console.error('Selected file is not an image.');
          return;
        }
        if (userImage.size > 5 * 1024 * 1024) {
          console.error(
            'Selected image is too large. Please select a smaller image.'
          );
          return;
        }
        const storageRef = ref(storage, `profileImages/${userId}`);
        const uploadTask = uploadBytes(storageRef, userImage);
        await uploadTask;
        const url = await getDownloadURL(storageRef);
        setPhotoURL(url);
        console.log('Image URL:', url);
        return url;
      }
      return null;
    } catch (error) {
      console.error(alert('Error uploading image:', error));
    }
    return null;
  };
  const handleSave = async () => {
    if (displayName && phoneNumber) {
      try {
        setLoading(true);
        let updatedData = {
          ...userData,
          displayName: displayName,
          phoneNumber: phoneNumber,
          // photoURL: photoURL,
        };
        if (isEditingPhoto && setIsEditingPhoto) {
          if (!userImage.type || !userImage.type.startsWith('image/')) {
            console.error('Selected file is not an image.');
            return null;
          }
          if (userImage.size > 5 * 1024 * 1024) {
            console.error(alert('Selected image is too high quality'));
            return null;
          }
          const photoURL = await handleImageUpload(userId); // Upload the image
          console.log('Image URL:', photoURL);
          if (photoURL) {
            updatedData.photoURL = photoURL;
            console.log('Image URL:', photoURL);
          } else {
            console.error('Image upload failed.');
            return;
          }
        } else {
          updatedData.photoURL = null;
        }

        const itemToEdit = doc(db, 'users', userId);
        await updateDoc(itemToEdit, updatedData);
        setIsEditing(false);
        navigate('/products');
        window.location.reload('/products');
      } catch (error) {
        console.error('Error in updating:', error);
      }
    } else {
      console.log('Name or phone number is empty');
    }
  };
  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName || '');
      setPhoneNumber(userData.phoneNumber || '');
      setUserImage(userData.photoURL || '');
    }
  }, [userData]);

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.log('error', error));
  };
  const handleEdit = () => {
    setIsEditing(true);
    setDisplayName(userData.displayName);
    setPhoneNumber(userData.phoneNumber);
    setUserImage(userData.photoURL);
  };
  const editPhoto = () => {
    setIsEditingPhoto(true);
  };
  return (
    <div>
      <Navbar />
      <h1>{displayName ? `Hello ${displayName}` : 'Please log in'}</h1>
      <div className='user-profile'>
        <div className='user-details'>
          <img className='user-img' src={photoURL || userImage} alt='' />
          <div className='user-data'>
            <div className='img-section'>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setUserImage(e.target.files[0])}
              />
              <button className='button' Click={editPhoto}>
                Edit Photo
              </button>
            </div>

            <div className='input-container'>
              <div className='input-section'>
                <input
                  type='text'
                  name='displayName'
                  placeholder='Name'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className='input-section'>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={userData.email}
                  readOnly
                />
              </div>
              <div className='input-section'>
                <input
                  type='text'
                  name='phoneNumber'
                  placeholder='Ph number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <div>
            {!isEditing ? (
              <button className='button' onClick={handleEdit}>
                Edit profile
              </button>
            ) : (
              <>
                <button className='button' onClick={handleSave}>
                  Save Changes
                </button>
                {loading && (
                  <div className='loader-container'>
                    {/* <PacmanLoader
                      color='#e62323'
                      margin={-1}
                      loading={loading}
                      size={100}
                    /> */}
                  </div>
                )}
              </>
            )}
            <button className='button' onClick={logOut}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
