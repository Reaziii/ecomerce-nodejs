import React, { useEffect, useState } from 'react'
import AdminDashboardSidebar from '../components/AdminDashboardSidebar'
import AdminDashboardNav from '../components/AdminDashboardNav'
import LoadingButton from '../components/ButtonLoader'
import client from '../utilities/client'
import { useDispatch } from 'react-redux'
import { showSnakbar } from '../redux/snakbar/snakbarAction'

const AdminBanners = () => {
  const [newBannerDetails, setNewBannerDetails] = useState({
    file: null,
  })
  const [msg, setMessage] = useState(null);
  const [banners, setBanners] = useState([]);
  const [submitButtonLoadin, setSubmitButtonLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    client.get("/banner").then(res => {
      if (res.data.status) {
        setBanners([...res.data.banners])
      }
      console.log(res.data)
    })
  }, []);

  const deleteBanner = (key) => {
    client.delete("/banner/" + banners[key]._id).then(res => {
      dispatch(showSnakbar(res.data.status, res.data.message));
      if (res.data.status) {
        let n = banners;
        n.splice(key, 1);
        setBanners([...n])
      }
    })
  }
  const submitBanner = () => {
    setSubmitButtonLoading(true);
    const formdata = new FormData();
    formdata.append("banner", newBannerDetails.file);
    client.post("/banner", formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      dispatch(showSnakbar(res.data.status, res.data.message))
      if (res.data.status) {
        setBanners([...banners, { ...res.data.banner }])
        setNewBannerDetails({ file: null })
      }
      setSubmitButtonLoading(false);
    })
  }
  const activeBanner = (key) => {
    client.post("banner/change-status/" + banners[key]._id).then(res => {
      dispatch(showSnakbar(res.data.status, res.data.message))
      if (res.data.status) {
        let n = banners;
        n[key].active = !n[key].active;
        setBanners([...n]);
      }
    })
  }
  return (
    <>
      <AdminDashboardSidebar />
      <AdminDashboardNav />
      <div className='ml-[190px] h-[100vh] pr-[40px]'>
        <h1 className="mt-[80px] text-black text-[30px] font-bold">Category</h1>
        <div className='w-[400px] mt-[40px]'>
          {
            newBannerDetails.file ? <div className='w-full  mb-[40px]'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                preview
              </label>
              <img className='border border-black' src={URL.createObjectURL(newBannerDetails.file)} alt="" />
            </div> : null
          }
          <div className="mb-[20px]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Banner
            </label>
            <input onChange={e => setNewBannerDetails({ file: e.target.files[0] })} className="shadow h-[50px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" placeholder="Category Name..." />
          </div>
          <LoadingButton open={submitButtonLoadin} onClick={submitBanner} className={"w-full h-[40px] bg-orange-500 rounded shadow shadow-outline leading-tight appearance-none text-white"}>
            Save
          </LoadingButton>
        </div>

        <div className="relative overflow-x-auto mt-[60px] pb-[100px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Banner
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>

              </tr>
            </thead>
            <tbody>
              {
                banners.map((item, key) => (
                  <tr className="bg-white border-b " key={key}>
                    <td className="px-6 py-4">
                      <a target='_blank' href={process.env.REACT_APP_BACKEND_URL + "/" + item.path}>
                        <img src={process.env.REACT_APP_BACKEND_URL + "/" + item.path} alt="" className="h-[80px]" />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => activeBanner(key)} className={`h-[20px] w-[20px] ${item.active ? "bg-green-500" : "bg-gray-200"} rounded-[20px]`}>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => deleteBanner(key)} className='shadow h-[40px] appearance-none border rounded w-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
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

export default AdminBanners