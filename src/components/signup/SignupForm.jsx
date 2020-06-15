import React from "react";
import classnames from "classnames";

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {},
      isLoading: false, // 如果Responding有错误，注册按钮不可点
      invalid: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    // 节流和防抖 回流和重绘
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true }); // 在发送请求时，按钮不可点；避免重复点击
    // action 返回了一个axios的对象，可以直接.then
    this.props.signupActions.userSignupRequest(this.state).then(
      () => {
        // 成功时
        // 用action把message传到redux
        this.props.flashActions.addFlashMessage({
          type: "success",
          text: "Successfully sign up. Welcome!",
        });
        this.props.history.push("/"); // Route管理的时signupPage，而不是signupForm，此时没有history
      },
      ({ response }) => {
        // 失败时
        //console.log(response); // => response.data中是需要展示的数据
        this.setState({
          errors: response.data,
          isLoading: false, // 注册按钮可点
        });
      }
    );
  };

  checkUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    let invalid;
    if (val !== "") {
      this.props.signupActions.isUserExists(val).then((res) => {
        let errors = this.state.errors;
        if (res.data[0]) {
          errors[field] = "用户名存在：" + field;
          invalid = true;
        } else {
          errors[field] = "";
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  };

  render() {
    const { errors, isLoading, invalid } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community</h1>

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
          <label className="control-label">Email</label>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.email,
            })}
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email && (
            <span className="form-text text-muted">{errors.email}</span>
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
          <label className="control-label">Confirm Password</label>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.passwordConfirmation,
            })}
            type="password"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation && (
            <span className="form-text text-muted">
              {errors.passwordConfirmation}
            </span>
          )}
        </div>

        <div className="form-group">
          <button
            disabled={isLoading || invalid}
            className="btn btn-primary btn-lg"
          >
            SignUp
          </button>
        </div>
      </form>
    );
  }
}
