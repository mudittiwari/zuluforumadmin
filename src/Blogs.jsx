import React, { useEffect, useState, useRef } from 'react';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getFirestore, collection, addDoc,deleteDoc, doc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import app from './Firebase';


function Blogs() {

    const db = getFirestore(app);
    // console.log(props.products);
    const ref = useRef(null);
    const navigate = useNavigate();
    const [blogsarray, changeblogsarray] = useState([]);
    async function getblogs() {
        const q = query(collection(db, "blogs"));
        const querySnapshot = await getDocs(q);
        let blogs = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            blogs.push(doc);
            // changeblogarray([...blogarray,doc.data()]);
        });
        changeblogsarray(blogs);
    }
    useEffect(() => {
        // console.log(localStorage.getItem('user'));
        if (localStorage.getItem('user')) {
            if (JSON.parse(localStorage.getItem('user'))["isAdmin"] == true) {
                getblogs();
            }
            else {
                navigate('/login');
            }
        }
        else {
            navigate('/login');
        }
    }, [])
    // console.log(elements);
    return (
        <div>
            <h1 className="text-black text-xl font-bold my-10 mx-auto w-1/2 text-center">Blogs</h1>
            <ul>

                {blogsarray.map((value, index) => {
                    // console.log(index);\
                    return <div className=" bg-white h-max px-5 my-8 rounded-md py-5 mx-auto flex w-3/4 related">

                        <div className=" flex justify-center align-center flex-col w-full">
                            <li className="text-black">
                                <div className="flex">
                                    <h1 className="mx-3">Title:</h1>
                                    <h1>{value.data().title}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Subtitle:</h1>
                                    <h1>{value.data().subtitle}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Date:</h1>
                                    <h1>{value.data().date}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Caption:</h1>
                                    <h1>{value.data().caption}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Desc:</h1>
                                    <h1>{value.data().desc.toString().substring(0, 200) + '......'}</h1>
                                </div>

                                <div className="flex w-full justify-center">
                                    <button className="bg-white text-black w-24 rounded-lg border-0 px-3 py-2 my-2 mx-8" style={{'border':'1px solid black'}}  onClick={async (e) => {
                                        e.preventDefault();
                                        // console.log(value.id)
                                        await deleteDoc(doc(db,'blogs',value.id))
                                        getblogs();
                                        // e.preventDefault();
                                    }}>Delete</button>
                                    <button className="bg-white text-black w-24 rounded-lg border-0 px-3 py-2 my-2 mx-8" style={{'border':'1px solid black'}} onClick={async (e) => {
                                        e.preventDefault();
                                        navigate('/editblog',{state:{'doc':value}})
                                        // e.preventDefault();
                                    }}>Edit</button>
                                </div>
                            </li>
                        </div>

                    </div>
                })}
            </ul>
        </div>
    );
}
export default Blogs;