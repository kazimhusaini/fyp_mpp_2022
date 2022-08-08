import { Button } from '@mui/material';
import React, { useState } from 'react'

export const Test = () => {

  const [name, setName] = useState("kazim");
  const [num, setNum] = useState(1);

  const handleChange = () => {
    setName("moazzam")
    setNum(num + 1)
  }
  return (
    <div>
      {name}
      <br/>
      {num}
      <br/>
      <Button onClick={handleChange}>Change Name</Button>
    </div>
  )
}
