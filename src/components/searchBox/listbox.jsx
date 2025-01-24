import React from 'react'

export const ListBox = ({items}) => {
  return (
    <ul>
      {items.map((item, index) => {
       return <li key={index}>{item.name}</li>
      })}
    </ul>
  )
}
