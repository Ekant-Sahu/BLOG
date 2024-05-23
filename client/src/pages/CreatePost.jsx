import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import{TextInput,Select,FileInput, Alert} from 'flowbite-react'
import { useState } from 'react';
import {getStorage, getDownloadURL, uploadBytesResumable,ref } from 'firebase/storage'
import {app} from '../firebase'

export default function CreatePost() {
  const [file,setFiles] = useState(null);
  const [imageUploadProgress, setImageUploadPorgress] = useState(null);
  const [imageUploadError,setImageUploadError] = useState(null);
  const [formData,setFormData] = useState({});
  console.log(imageUploadError,imageUploadProgress)
  const handleUploadImage = async () => {
    try {
      if(!file){
        setImageUploadError('please select an image')
        return;
      }
      setImageUploadError(null);
      setImageUploadPorgress(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-'+ file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          setImageUploadPorgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image Upload Failed")
          setImageUploadPorgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageUploadPorgress(null);
            setImageUploadError(null);
            setFormData({...formData,image: downloadURL});
          })
        }
      )
      
    } catch (error) {
      setImageUploadError("image upload failed");
      setImageUploadPorgress(null);
      console.log(error);
    }
  };



  return (
    <div className="min-h-screen max-w-3xl flex flex-col mx-auto justify-start items-center my-2">
      <h1 className="font-semibold text-3xl">Create A Post</h1>
      <form action="" className="flex flex-col gap-4 w-full my-10">
        <div className="flex flex-col gap-4 mx-1  sm:flex-row justify-between">
          <TextInput type='text' placeholder='Title' required id = 'title' className='flex-1'></TextInput>
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="raipur">Raipur</option>
            <option value="bilaspur">Bilaspur</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-5 my-2 mx-1">
          <FileInput type='file' accept='image/*' className='w-full' onChange={(e)=>setFiles(e.target.files[0])} />
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleUploadImage} disabled={imageUploadProgress}>
            {
              imageUploadProgress ? (
                <div>{imageUploadProgress}%</div>
              ):
              "UPLOAD"
            }
            </button>
        </div>
        {imageUploadError && 
        <Alert className='bg-red-500 mx-2'>
            {imageUploadError}
        </Alert>}
        {formData.image && (
          <img src={formData.image} alt="upload" className='w-full h-100 object-cover'/>
        )}
        <ReactQuill theme="snow" placeholder='Write Something' className='h-72 mb-12 mx-2' required/>
        <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 mx-2 dark:focus:ring-blue-800'>PUBLISH</button>
      </form>
    </div>
  )
}
