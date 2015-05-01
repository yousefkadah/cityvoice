'use strict';

var Password = React.createClass({
	getInitialState: function () {
	    return {
	        password: '',
	        passwordVisible: false
	    };
	},

	getPassword: function () {
		return this.state.password;
	},

	validate: function () {
		return true;
	},

	handleChange: function () {
		this.setState({password:event.target.value});
	},

	togglePasswordVisibility : function () {
		this.setState({passwordVisible:!this.state.passwordVisible});
	},

	render: function () {
		var formType = this.state.passwordVisible ? 'text' : 'password';
		var visibilityText = 
			this.state.passwordVisible ? 'hide password' : 'show password';

		var visibilityStyle = {
			marginLeft: '10px',
			cursor: 'pointer',
			color: 'rgb(155, 155, 155)'
		}


		return (
			<div style={this.props.style}>
				<label className='control-label' htmlFor="password">
					Password 
					<a style={visibilityStyle} className='small' onClick={this.togglePasswordVisibility}>{visibilityText}</a>
				</label>
				<input 
					className='form-control'
					type={formType}
					name='password'
					onChange={this.handleChange}
					value={this.state.password}
				/>
			</div>
		)
	}
});

module.exports = Password;