import React, { Component } from 'react'
import ky from 'ky'

class EditorRender extends Component {
	constructor(props) {
		super(props)

		this.state = {
      output:"",
      errorMsg: ''
		}
	}

	async componentDidMount() {
		await ky
                .get("/api/v1/editor")
                .then( data => {
                    console.log(data)
                    this.setState({output: data})
                })
                .catch(error => {
                    console.log(error)
                    this.setState({errorMsg: 'Error retrieving data'})
                        })
	}

	render() {
		const { output, errorMsg } = this.state
		return (
			<div>
			    {this.output}
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default EditorRender