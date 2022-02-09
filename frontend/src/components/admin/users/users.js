import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { BiEditAlt } from "react-icons/bi";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import "../users/users.css";
const Users = () => {
  const [users, setUsers] = useState();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const[id,setId]=useState()
  console.log(id);
  useEffect(() => {
    const getAllUsers = () => {
      axios
        .get("http://localhost:5000/users/")
        .then((res) => {
          console.log(res.data);
          setUsers(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllUsers();
  }, []);

  return (
    <div className="usersTable">
      {deleteStatus || updateStatus ? (
        <div className="userMessage">
          <div id="messageContainer">
            <div className="message">
              {deleteStatus ? "Delete User ?" : "Update User Role ?"}
            </div>
            <div className="messageIcons">
              <FcApprove
                className="approve"
                onClick={() => {
                //    deleteStatus?handleDeleteUser(id):handleUpdateUser(id)
                  setUpdateStatus(false);
                  setDeleteStatus(false);
                }}
              />
              <FcDisapprove className="disApprove" onClick={() => {
                  setUpdateStatus(false);
                  setDeleteStatus(false);
                }}/>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>Role</th>
          <th></th>
        </tr>
        {users &&
          users.map((user) => {
            return (
              <>
                <tr>
                  <td>
                    <img
                      className="userImg"
                      src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
                    />
                  </td>
                  <td>{`${user.firstName && user.firstName} ${
                    user.lastName && user.lastName
                  }`}</td>
                  <td>{user.email && user.email}</td>
                  <td>{user.country && user.country}</td>
                  <td><select className="updateSelect"><option>{user.role_id ===1? user.role_id +" .user ":user.role_id +" .admin "}</option><option>{user.role_id===1?"2.admin":"1.user"}</option></select>
                    
                    <BiEditAlt
                      className="editRole"
                      onClick={() => {
                          setId(user.id)
                        setUpdateStatus(true);
                      }}
                    />
                  </td>
                  <td>
                    <TiDelete
                      className="deleteIcons"
                      onClick={() => {
                        setDeleteStatus(true);
                      }}
                    />
                  </td>
                </tr>
              </>
            );
          })}
      </table>
    </div>
  );
};

export default Users;
