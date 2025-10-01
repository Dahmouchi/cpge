import React from 'react'

const absence = ({ params }: { params: { id: string } }) => {
  return (
    <div>absence {params.id}</div>
  )
}

export default absence