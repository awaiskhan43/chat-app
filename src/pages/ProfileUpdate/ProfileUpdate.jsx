import React, { useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const ProfileUpdate = () => {
    const navigate = useNavigate();
    const [image,setImage] = useState(false);
    const [name,setName] = useState("");
    const [bio,setBio] = useState("");
    const [uid,setUid] = useState("");
    const [prevImage,setPrevImage] = useState("")
    const profileUpadate = async (event) => {
        event.preventDefault();
    try {
        if (!prevImage && image) {
            toast.error("Upload profile picture")
        }
    } catch (error) {
        
    }    }

    useEffect(()=>{
        onAuthStateChanged(auth,async ()=>{
            if (user) {
                setUid(user.uid)
                const docRef = doc(db,"user",user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.data().name) {
                    setName(docSnap.data().name);
                }
                if (docSnap.data().bio) {
                    setBio(docSnap.data().bio);
                }
                if (docSnap.data().avatar) {
                    setPrevImage((docSnap).data().avatar)
                }
                
            }
            else {
               navigate('/')
            }
        })
    })

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileUpadate}>
           <h3>Profile Details</h3>
           <label htmlFor="avatar">
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <img src={image? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
            upload profile image
           </label>
           <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Your name' required/>
           <textarea onChange={(e)=>setBio(e.target.bio)} value={bio} placeholder='Write profile bio' required></textarea>
           <button className='submit'>Save</button>
        </form>
        <img className='profile-pic' src={image? URL.createObjectURL(image) : assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate
