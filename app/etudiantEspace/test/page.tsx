"use client"

import React, { useEffect } from 'react'

const Page = (params:any) => {
  useEffect(()=>{
    console.log("useer")
  },[])
  return (
    <div>Page</div>
  )
}

export default Page