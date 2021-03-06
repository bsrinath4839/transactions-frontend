import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { newTx, newTxInt } from '../../actions';

class SelectUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            isloaded: false,
        }
    }

    static propTypes = {
        initiated: PropTypes.string,
        name: PropTypes.string,
        loggedin: PropTypes.string,
        newTx: PropTypes.func.isRequired,
        txsloaded: PropTypes.bool,
        newTxInt: PropTypes.func.isRequired,
    }

    setAmount(e) {
        this.setState({
            amount: e.target.value
        })
    }

    submitAmount() {
        //console.log(this.state.amount);
        this.props.newTx(this.state.amount, this.props.location.state.sendto);
    }

    LoadPage(){
        this.props.newTxInt();
    }

    render() {
        //console.log("props", this.props.location.state.sendto);
        if (!this.state.isloaded) {
            this.LoadPage();
        } else {

        }

        if (this.props.txsloaded) {
            return (
                <Redirect to="/profile" />
            )
        } else {
            if (this.props.loggedin === "true") {
                return (
                    <div className="amountdiv">
                        <h1>
                            TRANSACTIONS<br /> WITH<br /> SELECTED<br /> USER<br />
                            {this.state.amount}
                        </h1>
                        <table className="amountdivtable">
                            <tbody>
                                <tr>
                                    <th>
                                        <input type="number" placeholder="Enter amount" className="amounttext" value={this.state.amount} onChange={(e) => this.setAmount(e)} />
                                    </th>
                                    <th>
                                        <button className="amountbtn" onClick={() => this.submitAmount()}>&gt;&gt;&gt;&gt;&gt;</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            } else {
                return (
                    <Redirect to="/" />
                )
            }
        }



    }
}


const mapStateToProps = (state) => ({
    loggedin: state.user.loggedin,
    txsloaded: state.user.txsloaded
})

export default connect(mapStateToProps, { newTx, newTxInt })(SelectUser);