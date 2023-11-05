import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { getDrivers } from "../../../Utils/urls";
import { FaSearch } from "react-icons/fa";
import axios from "../../../Utils/axios";
import "./DriverList.css";

function DriverList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRow, setFilteredRow] = useState([]);
  const [blocked, setBlocked] = useState(false);
  // const [userStatus,setUserStatus] = useState("")

  const fetchData = async () => {
    try {
      const url = searchTerm
        ? getDrivers + `?search=${searchTerm}`
        : getDrivers;
      console.log(url);
      const res = await axios.get(url);
      console.log(res.data);
      setFilteredRow(res.data);
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const blockData = async (userId) => {
    try {
      const res = await axios.patch(`/api/user/user-block/${userId}/`);
      if (res.status == 200) {
        // setUserStatus(true)
        setBlocked(!blocked);
      }
    } catch (error) {
      console.log(error, "eooorooooroo");
    }
  };

  const styles = {
    searchContainer: {
      marginTop: "20px",
      marginRight: "8px",
    },
    active: {
      color: "green",
    },
  };

  useEffect(() => {
    fetchData();
  }, [blocked,searchTerm]);

  const blockFunction = (UserId) => {
    blockData(UserId);
  };

  return (
    <>
      <SideBar />
      
      <div
        className={`d-flex align-items-center p-4  ${styles.searchContainer}`}
      >
        <div className="data-grid-container">
          <div className="header d-flex justify-content-between align-items-center mb-4">
            <br />
            <div className="d-flex align-items-center">
              <input
                type="text"
                placeholder="Search User"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ marginRight: "8px" }}
              />
              <button className="btn btn-primary" onClick={fetchData}>
                <FaSearch className="search-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="container p-4">
        <div className="container mx-auto p-5">
          <h1 className="text-2xl font-bold mb-4">Driver List</h1>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  ID
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  First Name
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  Email
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  Phone
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  Joined Date
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  Status
                </th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRow.length > 0 ? (
                filteredRow.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.id}
                    </td>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.first_name}
                    </td>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.phone}
                    </td>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.date_joined}
                    </td>
                    {user.is_active ? (
                      <td
                        className={`py-2 px-4 border-r border-t border-gray-300 ${styles.active}`}
                      >
                        Active
                      </td>
                    ) : (
                      <td className="py-2 px-4 border-r border-t border-gray-300">
                        Blocked
                      </td>
                    )}

                    <td className="py-2 px-4 border-t">
                      {user.is_active ? (
                        <button
                          className=""
                          onClick={() => blockFunction(user.id)}
                        >
                          Block
                        </button>
                      ) : (
                        // bg-red-100 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">

                        <button
                          className=""
                          onClick={() => blockFunction(user.id)}
                        >
                          Unblock
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b hover:bg-gray-200">
                  <td
                    colSpan={8}
                    className="px-6 py-4 font-medium text-gray-900 text-center"
                  >
                    No users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default DriverList;
