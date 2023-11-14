import React from "react"
import UserProfileSideBar  from "../../../Components/User/UserProfileSidebar"



function Profile() {
  return (
    <>
<div style={{ display: 'flex', backgroundColor:"white" }}>
    <UserProfileSideBar/>
    
    <section className='container'>      
       <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
           <table className="w-full text-sm text-left text-gray-500">
               <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                   <tr>
                       <th scope="col" className="px-6 py-3">
                           Sl.No
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Name
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Email
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Blood Group
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Options
                       </th>
                   </tr>
               </thead>
               <tbody className='border-2'>
                
                    <tr className="bg-white border-b  hover:bg-gray-200 ">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        
                      </th>
                      <td className="px-6 py-4">
                        user.name
                      </td>
                      <td className="px-6 py-4">
                       user.email
                      </td>
                      <td className="px-6 py-4">
                        user.blood
                      </td>
                    
                          <td className="px-6 py-4">
                            <button  className="bg-yellow-100 hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
                              Unblock
                            </button>
                          </td>
                    
                          <td className="px-6 py-4">
                            <button  className="bg-red-100 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                              Block
                            </button>
                          </td>
                       
                    </tr>
               
                  <tr className="bg-white border-b hover:bg-gray-200">
                    <td colSpan={8} className="px-6 py-4 font-medium text-gray-900 text-center">
                      No users Found
                    </td>
                  </tr>
             
              </tbody>
          </table>
      </div>
    </section>
    </div>

    </>
  )
}

export default Profile



