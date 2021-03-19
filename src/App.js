import React, { Component } from 'react'
import './App.css'
import Navbar from './layout/Navbar'
import axios from 'axios'
import Users from './users/Users'
import Search from './users/Search'
import PropTypes from 'prop-types'

class App extends Component {
  state = {
    users: [],
    loading: false,
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({ users: res.data, loading: false })
  }

  // Searching Github Users
  searchUsers = async (text) => {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({ users: res.data.items, loading: false })
  }

  // clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  render() {
    const { users, loading } = this.state
    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github' />
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    )
  }
}

export default App
