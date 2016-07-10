import React, {Component} from 'react'
import { Link } from 'react-router'

export const About = (props) => {
  return (
    <div>
    about
    </div>
  )
}

export const NoMatch = (props) => {
  return (
    <div>
      no match
    </div>
  )
}

export const index = (props) => {
  return (
    <div>
      <Link to="/about">about</Link>
      <Link to="/">app</Link>
        {props.children}
    </div>
  )
}
export default {index, NoMatch, About};
