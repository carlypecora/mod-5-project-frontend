import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/logout.js'
import NotificationsContainer from '../containers/NotificationsContainer'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu;



const NavBar = (props) => {
	return (
	<div className="nav-bar">
		<div className="nav-links">
    		{renderNavItems(props)}
    	</div>
    </div> 
   )
}

const handleLogout = (props) => {
	localStorage.removeItem("token")
	props.logout()
}

const renderNavItems = (props) => {
	// let token = localStorage.getItem("token")
	if (!props.token) {
		return(
			<div>
		    	<Link to='/login' className="single-nav-link">LOGIN</Link>
		    	<Link to='/signup' className="single-nav-link">SIGNUP</Link>
    		</div>
		)
	} else {
		return (
			<div style={{flexDirection: 'row'}}>
		 	{props.title && window.location.pathname !== "/home"? 
				<div className="nav-channel">
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Channel Name:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.title}</div>&nbsp;&nbsp;&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Purpose:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.purpose}</div>&nbsp;&nbsp;&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Made By:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.creator}</div>&nbsp;&nbsp;&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Created On:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.created_at.slice(0, 10)}</div>&nbsp;&nbsp;&nbsp;
				</div>
				:
				null
			}
				<div className="div-logout" style={{flexDirection: 'row', marginTop: 5, display: 'inline', float: 'right'}}>
					<div style={{color: '#0986a5', display: 'inline', textAlign: 'right', fontSize: 20, marginRight: 10}}><NotificationsContainer /></div>
					<Link onClick={() => handleLogout(props)} to='/login' style={{display: 'inline', marginRight: 30}} className="innerdiv-logout">LOGOUT</Link>
				</div>
			</div>
			)
	}
}

function mapStateToProps(state){
	return({...state.auth, ...state.selected.currentConversation})
}
//unreads={props.unreads} resetUnreads={resetUnreads} 



class App extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="mail">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled>
          <Icon type="appstore" />
          Navigation Two
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Navigation Three - Submenu
            </span>
          }
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}


export default connect(mapStateToProps, actions)(NavBar)



