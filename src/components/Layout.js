import React, {Component} from 'react'
import {MDBIcon} from "mdbreact";
import { withRouter } from 'react-router-dom';

class Layout extends Component{
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.history.goBack()
    }

    render() {
        return(
            <>
                <header className="header">
                    <div className="d-flex justify-content-between">
                        <MDBIcon size="2x" icon="arrow-left" onClick={this.goBack}/>
                    </div>
                </header>
                <main>
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default withRouter(Layout)
