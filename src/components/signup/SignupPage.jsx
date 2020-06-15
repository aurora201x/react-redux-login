import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SignupForm from "./SignupForm";
import * as signupActions from "../../actions/signupActions";
import * as flashActions from "../../actions/flashActions";

// 在父组件Page中处理数据，再传给子组件Form

class SignupPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <SignupForm
            history={this.props.history} // 或者用withRouter包裹signupForm组件（当组件关系复杂时）
            signupActions={this.props.signupActions}
            flashActions={this.props.flashActions}
          />
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

// 因为这里的数据是写入而不是读取，所以不需要mapStateToProps
//const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    signupActions: bindActionCreators(signupActions, dispatch),
    flashActions: bindActionCreators(flashActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(SignupPage);
