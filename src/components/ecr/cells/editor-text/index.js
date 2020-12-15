import React from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill'; // ES6
import './styles.scss';

export class Editor extends React.Component {


    constructor(props) {
        super(props)
        this.state = { text: this.props.instructionData, meta: this.props.meta, dataToShow: '', dataToSend: "" }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.instructionData !== this.props.instructionData) {
            let html = nextProps.instructionData
            this.setState({ text: nextProps.instructionData })
        }
        if (nextProps.meta !== this.props.meta) {
            this.setState({ meta: nextProps.meta })
        }
    }
    componentDidMount() {
        let html = this.props.instructionData

        this.setState({
            text: html
        })

    }

    validationSpan = () =>
        !!this.state && !!this.state.meta && !!this.state.meta.touched && !!this.state.meta.error ?
            (<span className="error_msg text-danger">{this.state.meta.error}</span>) : null
    render() {
        const { meta } = this.props

        const { config } = this.props

        return (
            <div className="form-group">
                {this.props.label && <label>{this.props.label}</label>}
                <div className="page_builder">
                    <CustomToolbar />
                    <ReactQuill
                        placeholder={'Type here...'}
                        defaultValue={this.state.text}
                        modules={Editor.modules}
                        formats={Editor.formats}
                        // onChange={(html) => {
                        //     this.setState({ text: html })
                        //     html = html.replace(/&lt;/g, '<');
                        //     html = html.replace(/&gt;/g, '>');
                        //     this.setState({ dataToSend: html })
                        // }}

                        {...config}
                    />
                </div>
                {this.validationSpan()}
            </div>
        )
    }
}


var Link = Quill.import('formats/link');
var builtInFunc = Link.sanitize;
Link.sanitize = function customSanitizeLinkInput(linkValueInput) {
    var val = linkValueInput;
    if (/^\w+:/.test(val));
    else if (!/^https?:/.test(val))
        val = "http://www." + val + '.com';
    return builtInFunc.call(this, val);
};
const CustomToolbar = () => (
    <div id="toolbar">
        <span className="ql-formats">
            <select className="ql-font"></select>
        </span>
        <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
        </span>
        <span className="ql-formats">
            <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                <option value="1" />
                <option value="2" />
                <option value="3" />
                <option value="4" />
                <option value="5" />
                <option value="6" />
                <option selected />
            </select>
            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
            <button className="ql-indent" value="-1"></button>
            <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-direction" value="rtl"></button>
            <select className="ql-align"></select>
        </span>
        <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button className="ql-video"></button>
            <button className="ql-formula"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-clean"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-redo">
                <i className="fa fa-repeat"></i>
            </button>
            <button className="ql-undo">
                <i className="fa fa-undo"></i>
            </button>
        </span>
    </div>
);


Editor.modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            redo: redo,
            undo: undo
        }
    },
    clipboard: {
        matchVisual: false,
    }
};

function redo() {
    this.quill.history.redo();
}

function undo() {
    this.quill.history.undo();
}

Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "direction",
    "align",
    "script",
    "background",
    "video",
    "formula",
    "clean",
    "code-block"
];