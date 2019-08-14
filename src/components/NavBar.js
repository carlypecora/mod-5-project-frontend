import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/logout.js'
import NotificationsContainer from '../containers/NotificationsContainer'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu;




const handleLogout = (props) => {
	localStorage.removeItem("token")
	props.logout()
}


class NewNav extends React.Component {
  state = {
    current: 'mail',
  }

  handleMouseover = e => {
    this.setState({
      current: e.key,
    })
  }

  renderItems = () => {
  	if (!this.props.token) {
  	  return(
  		<Menu onMouseEnter={this.handleMouseover} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item className="stupid-menu-item" key="login">
          	<Link to='/login'
          		  style={{fontWeight: 'bold'}}>
          		LOGIN
          	</Link>
        </Menu.Item>
        <Menu.Item className="stupid-menu-item" key="signup">
          	<Link to='/signup'
          		  style={{fontWeight: 'bold'}}>
          		SIGNUP
          	</Link>
        </Menu.Item>
      </Menu>
      )
  	} else {
  	return(
  	  <div>
  	      {this.props.title && window.location.pathname.includes("/conversations") && !this.props.dm ? 
  	      	<div className="nav-channel">
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Channel Name:</h6>&nbsp;
					<div style={{display: 'inline'}}>{this.props.title}</div>&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Purpose:</h6>&nbsp;
					<div style={{display: 'inline'}}>{this.props.purpose}</div>&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Made By:</h6>&nbsp;
					<div style={{display: 'inline'}}>{this.props.creator}</div>&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Created On:</h6>&nbsp;
					<div style={{display: 'inline'}}>{this.props.created_at.slice(0, 10)}</div>&nbsp;
				</div>
				:
				<div>
				{ this.props.dm ?
					<div className="nav-channel">
						<h6 style={{display: 'inline', fontWeight: 'bold'}}>Direct Message:</h6>&nbsp;&nbsp;&nbsp;
						<div style={{display: 'inline'}}>{this.props.title}</div>&nbsp;&nbsp;&nbsp;
					</div>
					:
					null

				}
				</div>
  	   	  }
	  	  <Menu onMouseEnter={this.handleMouseover} selectedKeys={[this.state.current]} mode="horizontal">
	  	  	<NotificationsContainer />

	        <Menu.Item className="stupid-menu-item" key="logout">
	          	<Link 
	          		onClick={() => handleLogout(this.props)} 
	          		to='/login'
	          		style={{fontWeight: 'bold'}}
	          		id="logout-nav"
	          		>
	          		LOGOUT
	          	</Link>
	        </Menu.Item>
	      </Menu>
      </div>
      )
  	}
  }

  render() {
    return (
    	<div>
          <Link to="/home" style={{float: 'left', marginLeft: 7, marginTop: 7}}><h4>SLACKERS</h4></Link>
      		{this.renderItems()}
      	</div>
    )
  }
}
function mapStateToProps(state){
	return({...state.auth, ...state.selected.currentConversation})
}

export default connect(mapStateToProps, actions)(NewNav)
// export def	ault connect(mapStateToProps, actions)(NavBar)



