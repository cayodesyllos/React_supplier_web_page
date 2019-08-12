import React, { Component } from 'react'
import { connect } from "react-redux";

class PortalPage extends Component { 
    render() {
        return (
            <div>       
                <h2 className="title">Portal</h2>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps)(PortalPage);