import { connect } from 'react-redux';
import { ViewCommentComponent } from "./form";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../../config/default`);

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export const ViewComment = connect(mapStateToProps, mapDispatchToProps)(ViewCommentComponent);