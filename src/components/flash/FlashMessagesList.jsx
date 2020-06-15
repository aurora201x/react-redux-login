import React from "react";
import { connect } from "react-redux";

import FlashMessage from "./FlashMessage";
import { deleteFlashMessage } from "../../actions/flashActions";

class FlashMessagesList extends React.Component {
  render() {
    // messages 是一个数组，需要遍历
    const messages = this.props.messages.map((message) => (
      <FlashMessage
        key={message.id}
        message={message}
        deleteFlashMessage={this.props.deleteFlashMessage}
      />
    ));
    return <div className="container">{messages}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.flashMessages,
  };
};

export default connect(mapStateToProps, { deleteFlashMessage })(
  FlashMessagesList
);
