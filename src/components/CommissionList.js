import React, {Component} from 'react'
import Layout from "./Layout";
import fetch from 'isomorphic-unfetch'

class CommissionList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }


    componentWillMount() {
        fetch('http://prizivnik.std-280.ist.mospolytech.ru/commission', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }).then( async(res) => {
            let result = await res.json()
            console.log(result)
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
                                <h3 className="text-center">Список работников</h3>
                            </div>
                        </div>
                        {this.state.list && this.state.list.length !== 0
                            ? <div className="row">
                                <div className="col-12">
                                    <table className="table table-responsive d-flex justify-content-center">
                                        <tbody>
                                        <tr className="text-center">
                                            <th>ID</th>
                                            <th>Логин</th>
                                            <th>Пароль</th>
                                            <th>Фамилия</th>
                                            <th>Имя</th>
                                            <th>Отчество</th>
                                        </tr>
                                        {this.state.list && this.state.list.map((el) => {
                                            return  <tr className="text-center">
                                                <td>{el.id}</td>
                                                <td>{el.login}</td>
                                                <td>{el.password}</td>
                                                <td>{el.secondName}</td>
                                                <td>{el.firstName}</td>
                                                <td>{el.lastName}</td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : <div className="row">
                                <div className="col-12">
                                    <h5 className="text-center">Работники не найдены</h5>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        );
    }
}

export default CommissionList