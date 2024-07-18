import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoMdTrash, IoMdInformationCircleOutline } from "react-icons/io";
import Accounts from "@/functions/Accounts";
import toast from "react-hot-toast";
import { FaBold } from "react-icons/fa";

const UserManagementView = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await Accounts.getAll();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const onShowDetail = (user) => {
    setSelectedUser(user);
    setShowUserDetail(!showUserDetail);
  };

  const onDeleteUser = async (email) => {
    try {
      await Accounts.delete(email);
      setUsers(users.filter(user => user.email !== email));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <>
      {!showUserDetail ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Vendor</th>
                <th>Admin</th>
                <th>Details</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.account_id}
                  className={(user.is_admin ? "admin-row" : "") || (user.is_vendor ? "vendor-row" : "") || (user.setup_finished ? "" : "notFinished-row")}// didnt do "className={`${user.is_admin ? "admin-row" : ""}..." because I wanted the admin highlight to be priority
                >
                  <td>{user.account_id}</td>
                  <td>{user.display_name ? user.display_name : "*Setup Not Finished*"}</td>
                  <td>{user.email}</td>
                  <td>{user.is_vendor ? "Yes" : "No"}</td>
                  <td>{user.is_admin ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-info text-white"
                      onClick={() => onShowDetail(user)}
                    >
                      <IoMdInformationCircleOutline />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-error text-white"
                      onClick={() => onDeleteUser(user.email)}
                    >
                      <IoMdTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Vendor</th>
                <th>Admin</th>
                <th>Details</th>
                <th>Delete</th>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="absolute top-0 left-0 bg-black/70 w-full flex h-full justify-center items-center">
          <div className="bg-white flex flex-col gap-y-4 rounded-lg border mb-20 p-4 max-w-md">
            {selectedUser ? (
              <>
                <h1 className="text-lg font-bold">User Details</h1>
                <div className="grid grid-cols-2 gap-4">
                  <p><strong>ID:</strong> {selectedUser.account_id}</p>
                  <p><strong>Username:</strong> {selectedUser.display_name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Vendor:</strong> {selectedUser.is_vendor ? "Yes" : "No"}</p>
                  <p><strong>First Name:</strong> {selectedUser.first_name}</p>
                  <p><strong>Last Name:</strong> {selectedUser.last_name}</p>
                  <p><strong>Admin:</strong> {selectedUser.is_admin ? "Yes" : "No"}</p>
                  <p><strong>Setup Finished:</strong> {selectedUser.setup_finished ? "Yes" : "No"}</p>
                  <p><strong>Country:</strong> {selectedUser.country}</p>
                  <p><strong>Birthdate:</strong> {selectedUser.birthdate}</p>
                  <p><strong>Gender:</strong> {selectedUser.gender}</p>
                  <p><strong>Language:</strong> {selectedUser.language}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => onDeleteUser(selectedUser.email)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm text-black w-fit"
                    onClick={() => setShowUserDetail(false)}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>No user selected</>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .admin-row {
          background-color: #F3EDC0;
        }
        .vendor-row {
          background-color: #CFCFE1;
        }
        .notFinished-row {
          background-color: #EDD7D7;
        }
      `}</style>
    </>
  );
};

export default UserManagementView;
