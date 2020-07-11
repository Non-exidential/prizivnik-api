import React, {Component} from 'react'
import Layout from "./Layout";
import {Link} from "react-router-dom";

class ConscriptList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }


    componentWillMount() {
        fetch('http://prizivnik.std-280.ist.mospolytech.ru/conscript', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }).then( async(res) => {
            let result = await res.json()
            this.setState({list: result.list})
            console.log(this.state)
        })
    }


    render() {
        return (
            <Layout>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center">Список призывников</h3>
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

export default ConscriptList