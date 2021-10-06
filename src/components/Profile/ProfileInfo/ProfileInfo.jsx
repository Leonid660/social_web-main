import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/172-1724489_defaultavatar-user-icon-black-png.png";
import ProfileDataForm from "./ProfileDataForm";



export const ProfileInfo = ({profile,status,updateStatus,isOwner,savePhoto,saveProfile}) => {

    let [editMode,setEditMode] =  useState(false)

    if(!profile){
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
       if( e.target.files.length){
           savePhoto(e.target.files[0])
       }
    }
    const onSubmit =  (formData) => {
      saveProfile(formData)
          .then(() => {
              setEditMode(false)
          })

    }
    return <div>
        <div className={s.descriptionBlock}>
            <img src={profile.photos.large||userPhoto}className={s.mainPhoto}/>
            {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

            {editMode
                ? <ProfileDataForm profile={profile}
                                   initialValues={profile}
                                   onSubmit={onSubmit}/>
                : <ProfileData profile={profile}
                               goToEditMode={() => setEditMode(true)}
                               isOwner={isOwner}/>}

            <ProfileStatusWithHooks status={status}
                           updateStatus={updateStatus}/>
        </div>
    </div>
}

const ProfileData = ({profile,isOwner,goToEditMode}) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Full name</b>:{profile.fullName}<b/>
        </div>
        <div>
            <b>Looking for a job</b>:{profile.lookingForAJob ? "yes" : "no" }<b/>
        </div>
        <div>
            <b>My professional skill</b>:{profile.lookingForAJobDescription}<b/>
        </div>
        <div>
            <b>About me</b>:{profile.aboutMe}
        </div>
        <div>
            <b>Contact</b>: {Object.keys(profile.contacts).map(key =>{
            return <Contact key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key]} />
        })}
        </div>
    </div>
}



const Contact = ({contactTitle,contactValue}) => {
    return <div><b>{contactTitle}</b>:{contactValue}</div>
}