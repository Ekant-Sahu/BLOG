import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import{TextInput,Select,FileInput} from 'flowbite-react'
export default function CreatePost() {
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
          <FileInput type='file' accept='image/*' className='w-full' />
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>
        </div>
        <ReactQuill theme="snow" placeholder='Write Something' className='h-72 mb-12 mx-2' required/>
        <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 mx-2 dark:focus:ring-blue-800'>PUBLISH</button>
      </form>
    </div>
  )
}
