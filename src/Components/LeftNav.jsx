import React from 'react'
import { Link } from 'react-router-dom'

const LeftNav = () => {
  return (
    <div>
       <Link to="/Dashboard"> <p>Dashboard</p></Link>
       <Link to="/exams"> <p>Exam Creation</p></Link>
        <p>Course Creation</p>
        <p>Instruction</p>
        <p>Test Creation</p>
        <p>Document Upload</p>
    </div>
  )
}

export default LeftNav