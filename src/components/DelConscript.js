import React, {Component} from 'react'
import Layout from "./Layout";
import {MDBBtn, MDBInput} from "mdbreact";
import fetch from 'isomorphic-unfetch'
import {DatePicker} from "react-datepicker";

class DelConscript extends Component{
    constructor(props) {
        super(props);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state)
        fetch('http://prizivnik.std-280.ist.mospolytech.ru/conscript', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({id: this.state.id})
        }).then( async(res) => {
            let result = await res.json()
            if(result.message === "DELETED"){
                alert("Призывник удален")
            } else {
                alert("Ошибка")
            }
        })
    }

    render() {
        return (
            <Layout>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center">Удалить призывника</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 offset-3">
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                    <MDBInput label="ID призывника" name="id" onChange={(e) => this.onChange(e)} required/>
                                    <MDBBtn type="submit">Удалить</MDBBtn>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}

export default DelConscript