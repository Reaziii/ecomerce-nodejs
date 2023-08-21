import React, { useEffect, useState } from 'react'
import AdminDashboardSidebar from '../components/AdminDashboardSidebar'
import AdminDashboardNav from '../components/AdminDashboardNav'
import LoadingButton from '../components/ButtonLoader'
import client from '../utilities/client'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@mui/material'

const AdminCategory = () => {
  const [newCategoryDetails, setNewCategoryDetails] = useState({
    name: "",
    file: null,
  })

  const [msg, setMessage] = useState(null);
  const [categories, setCategories] = useState([])
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const submitNewCategory = () => {
    setSubmitButtonLoading(true);
    const formdata = new FormData();

    formdata.append("name", newCategoryDetails.name);
    formdata.append("logo", newCategoryDetails.file);

    client.post("/category", formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      if (res.data.status) {
        setCategories([...categories, { ...res.data.category }])
        setMessage({
          type: "success",
          msg: res.data.message
        });
        setNewCategoryDetails({ name: "", file: null })
      }
      else {
        setMessage({
          type: "error",
          msg: res.data.message
        });
      }
      setSubmitButtonLoading(false);
    }).catch(err => {
      console.log(err);
    })

  }

  useEffect(() => {
    client.get("/category").then(res => {
      if (res.data.status) {
        setCategories([...res.data.categories])
      }
    })


  }, [])

  const deleteCategory = (id) => {
    client.delete("/category/" + categories[id]._id).then(res => {
      setMessage({
        type: res.data.status ? "success" : "error",
        msg: res.data.message,
      })
      if (res.data.status) {
        let n = categories;
        n.splice(id, 1);
        setCategories([...n])
      }
    })
  }

  return (
    <>
      <AdminDashboardSidebar />
      <AdminDashboardNav />
      <Snackbar
        open={msg ? true : false}
        onClose={() => setMessage(null)}
        autoHideDuration={6000}

      >
        <Alert severity={msg?.type}>{msg?.msg}</Alert>
      </Snackbar>
      <div className='ml-[190px] h-[100vh] pr-[40px]'>
        <h1 className="mt-[80px] text-black text-[30px] font-bold">Category</h1>
        <div className='w-[400px] mt-[40px]'>
          <div className="mb-[40px]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category Name
            </label>
            <input value={newCategoryDetails.name} onChange={e => setNewCategoryDetails({ ...newCategoryDetails, name: e.target.value })} className="shadow h-[50px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Category Name..." />
          </div>

          {
            newCategoryDetails.file ? <div className='w-full  mb-[40px]'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                preview
              </label>
              <img className='border border-black' src={URL.createObjectURL(newCategoryDetails.file)} alt="" />
            </div> : null
          }

          <div className="mb-[20px]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category Logo
            </label>
            <input onChange={e => setNewCategoryDetails({ ...newCategoryDetails, file: e.target.files[0] })} className="shadow h-[50px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" placeholder="Category Name..." />
          </div>
          <LoadingButton open={submitButtonLoading} onClick={submitNewCategory} className={"w-full h-[40px] bg-orange-500 rounded shadow shadow-outline leading-tight appearance-none text-white"}>
            Save
          </LoadingButton>
        </div>

        <div className="relative overflow-x-auto mt-[60px] pb-[100px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category name
                </th>
                <th scope="col" className="px-6 py-3">
                  Logo
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>

              </tr>
            </thead>
            <tbody>
              {
                categories.map((item, key) => (
                  <tr className="bg-white border-b " key={key}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.name}
                    </th>
                    <td className="px-6 py-4">
                      <a target='_blank' href={process.env.REACT_APP_BACKEND_URL + "/" + item.logo}>
                        <img src={process.env.REACT_APP_BACKEND_URL + "/" + item.logo} alt="" className="h-[40px]" />
                      </a>
                    </td>

                    <td className="px-6 py-4">
                      <button onClick={() => deleteCategory(key)} className='shadow h-[40px] appearance-none border rounded w-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <i className="fa-solid fa-trash text-red-400"></i>
                      </button>
                    </td>

                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default AdminCategory