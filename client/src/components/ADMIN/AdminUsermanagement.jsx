import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addUser, deleteUser, fetchUsers, updateUser } from "../../redux/slices/adminSlice";

const AdminUsermanagement = () => {
    // const users=[
    //     {_id:22,name:"Jhone Doe",email:"jhone@exmaple.com",role:"Admin"}
    // ]
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.auth)
    const {users,loading,error}=useSelector(state=>state.admin)
    useEffect(()=>{
if(user && user.role!=="admin"){
    navigate("/")

}
    },[user])
    useEffect(()=>{
if(user && user.role=="admin"){
    dispatch(fetchUsers())
}

    },[user])
    const [formdata,setformdata]=useState({
        name:"",
        email:"",
        password:"",
        role:"customer",
    })
    function handlechange(e){
        const {name}=e.target
        setformdata((s)=>({...s,[name]:e.target.value}))
    }
    function handlesubmit(e){
        e.preventDefault()
        dispatch(addUser(formdata))


        // reset
        setformdata({
            name:"",
            email:"",
            password:"",
            role:"customer"
        })
    }
    function handlerolechange(id,role){
        dispatch(updateUser({id,role}))
    }
    function handledeleteuser(id){
        if(window.confirm("Are you sure you want to dlete this user")) {
       dispatch(deleteUser(id))
        }
            }
    return (
        <div className="max-w-7xl mx-auto p-6 ">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            {loading?<p>laoding...</p>:error?<p>something went wrong ={error}</p>:
            <div className="p-6 rounded-lg mb-6 ">
                <h3 className="text-lg font-bold mb-4">
                    Add New User
                </h3>
                <form onSubmit={handlesubmit}>
                    <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" name="name" value={formdata.name} onChange={handlechange} className="p-2 border rounded w-full required"></input>
                    </div>  
                    <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" value={formdata.email} onChange={handlechange} className="p-2 border rounded w-full required"></input>
                    </div> 
                    <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="Password" name="password" value={formdata.password} onChange={handlechange} className="p-2 border rounded w-full required"></input>
                    </div>  
                    
                    <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                       <select name="role" value={formdata.role} onChange={handlechange} className="w-full p-2 border rounded">
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>


                       </select>

                    </div>  
                    <button className="bg-green-500 px-4 rounded py-2 hover:bg-green-600 text-white">Add User</button>
                </form>
            </div>}
            {/* userlist */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-3 px-4 ">Name</th>
                            <th className="py-3 px-4 ">Email</th>
                            <th className="py-3 px-4 ">Role</th>
                            <th className="py-3 px-4 ">Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((e,i)=>(<tr key={e._id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{e.name}</td>
                                <td className="p-4">{e.email}</td>
                                <td className="p-4">
                                    <select onChange={(ee)=>handlerolechange(e._id,ee.target.value)} className="p-2 border rounded">
                                        <option value="customer">customer</option>
                                        <option value="admin">Admin</option>

                                    </select>
                                </td>
                                <td>
                                    <button className="bg-red-500 text-white px-4 rounded hover:red-600" onClick={
                                        ()=>handledeleteuser(e._id)
                                    }>Delete</button>
                                </td>

                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminUsermanagement;
