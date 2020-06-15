import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login } from "../../actions/loginActions";
import validateInput from "../../utils/validations/login";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
      isLoading: false, // 如果Responding有错误，注册按钮不可点
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  isValid = (e) => {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true,
      });
      this.props.login(this.state).then(
        (res) => this.props.history.push("/"),
        (err) =>
          this.setState({
            errors: err.response.data.errors,
            isLoading: false,
          })
      );
    }
  };

  render() {
    const { errors, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Ready to Login</h1>
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.username,
            })}
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            onBlur={this.checkUserExists} // 失焦时查证用户名是否重复
          />
          {errors.username && (
            <span className="form-text text-muted">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.password,
            })}
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors.password && (
            <span className="form-text text-muted">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <button disabled={isLoading} className="btn btn-primary btn-lg">
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(connect(null, { login })(LoginForm));
