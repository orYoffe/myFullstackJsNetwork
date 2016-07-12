import React, {Component} from 'react'
import { Link } from 'react-router'

export default (props) => {
  return (
    <div>
      <Link to="/about">about</Link>
      <br/>
      <Link to="/press">about</Link>
      <br/>
      <Link to="/">app</Link>
        {props.children}
    </div>
  )
}
