import React, {Component} from 'react'
import Layout from "./Layout";
import fetch from 'isomorphic-unfetch'
import {Link} from "react-router-dom";
import {MDBInput} from "mdbreact";

class Search extends Component{
    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state)

        fetch('http://prizivnik.std-280.ist.mospolytech.ru/conscriptbysearch', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({str: this.state.str})
        }).then( async (res) => {
            let result = await res.json()
            console.log(result)
            this.setState({list: result.list})
        })
    }

    render() {
        return (
            <Layout>
                <section className="">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center">Поиск призывников</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 offset-3">
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                    <MDBInput label="Поиск" name="str" onChange={(e) => this.onChange(e)}/>
                                </form>
                            </div>
                        </div>
                        {this.state.list && this.state.list.length !== 0
                            ? <div className="row">
                                <div className="col-12">
                                    <table className="table table-responsive d-flex justify-content-center">
                                        <tbody>
                                        <tr className="text-center">
                                            <th>ID</th>
                                            <th>Фамилия</th>
                                            <th>Имя</th>
                                            <th>Отчество</th>
                                            <th>Место регистрации</th>
                                            <th>Образование</th>
                                            <th>Место работы</th>
                                        </tr>
                                        {this.state.list && this.state.list.map((el) => {
                                            return <tr className="text-center">
                                                    <Link to={{
                                                        pathname: "/conscript/" + el.conscript_id
                                                    }}>
                                                    <th>{el.conscript_id}</th>
                                                </Link>
                                                <th>{el.secondName}</th>
                                                <th>{el.firstName}</th>
                                                <th>{el.lastName}</th>
                                                <th>{el.registration}</th>
                                                <th>{el.institution}</th>
                                                <td>{el.jobPlace}</td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : <div className="row">
                                <div className="col-12">
                                    <h5 className="text-center">Призывники не найдены</h5>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        );
    }
}

export default Search