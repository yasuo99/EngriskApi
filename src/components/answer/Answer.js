import React, { Component } from 'react'

class Answer extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render() {
        return (
            <div>
                <div className="row mt-2">
                    <div className="col-6">
                        <button className={this.props.answers[0] ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.props.setColor(1) }} onClick={(e) => this.props.selectedAnswer(e, 1)}>
                            {this.props.answers[0]}
                        </button>
                    </div>
                    <div className="col-6">
                        <button className={this.props.answers[1] ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.props.setColor(2) }} onClick={(e) => this.props.selectedAnswer(e, 2)}>
                            {this.props.answers[1]}
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <button className={this.props.answers[2] ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.props.setColor(3) }} onClick={(e) => this.props.selectedAnswer(e, 3)}>
                            {this.props.answers[2]}
                        </button>
                    </div>
                    <div className="col-6">
                        <button className={this.props.answers[3] ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.props.setColor(4) }} onClick={(e) => this.props.selectedAnswer(e, 4)}>
                            {this.props.answers[3]}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Answer
