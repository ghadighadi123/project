
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Testingapi = () => {

const [Member, setMembers] = useState([]);

useEffect(() => {

    const fetchemployees = async () =>{
      try{
          const res = await axios.get("http://localhost:8800/totalhoursworked")
          setMembers(res.data)
          console.log(res)
      }catch(err){
          console.log(err)
      }
    }
  fetchemployees()
}, []);



const rows = Member
  ? Object.keys(Member).map((id) => ({ id, ...Member[id] }))
  : []; 



};
export default Testingapi;