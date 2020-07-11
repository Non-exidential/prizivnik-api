import React, {Component} from 'react'
import Menu from "./Menu";

class Navigation extends Component{
    constructor(props){
        super(props)

        this.state = {
            role: localStorage.getItem("User")
        }
    }

    render() {
        return (
            <>
                <section className="fullwidthsection">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 d-flex flex-column align-items-center menu">
                                <h3 className="text-center">Меню</h3>
                                <Menu role={this.state.role}/>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Navigation
