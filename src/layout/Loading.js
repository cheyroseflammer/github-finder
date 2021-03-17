import React, { Fragment } from 'react'
import loading from './loading.gif'

const Loading = () => (
  <Fragment>
    <img
      src={loading}
      alt='loading...'
      style={{ width: '200px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
)

export default Loading
