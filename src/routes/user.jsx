import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../utils/firebase';
import { useNavigate } from 'react-router';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditingPhoto, setIsEditingPhoto] = useState('');
  const [gender, setGender] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return <div>User</div>;
};

export default User;
