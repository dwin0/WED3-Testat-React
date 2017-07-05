// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ? <Redirect to='/dashboard'/>
      : <Redirect to='/login'/>
    }
  </div>
)

export default Home
