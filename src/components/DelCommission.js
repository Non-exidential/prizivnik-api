import React, {Component} from 'react'
import Layout from "./Layout";
import {MDBBtn, MDBInput} from "mdbreact";
import fetch from 'isomorphic-unfetch'

class DelCommission extends Component{

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        fetch('http://prizivnik.std-280.ist.mospolytech.ru/commission', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then( async(res) => {
            let result = await res.json()
            if(result.message === "DELETED"){
                alert("Работник удален")
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
                                <h3 className="text-center">Удалить работника</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 offset-3">
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                    <MDBInput label="ID работника" name="id" onChange={(e) => this.onChange(e)} required/>
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

export default DelCommission