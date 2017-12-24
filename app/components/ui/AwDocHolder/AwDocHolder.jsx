import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Alert from 'react-s-alert';
import Config from '../../../config';
import upload from './upload';
import Loader from 'components/ui/Loader';
import './AwDocHolder.less';

const DOCUMENT_BG = '/assets/' + require('assets/images/document_bg.png');
const UPLOAD_URL = Config.BASE_URL + 'uploads/';

class AwDocHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onUploadClick = this.onUploadClick.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
    }

    onUploadClick() {
        const ref = "fileInput" + this.props.index;
        this.refs[ref].click();
    }

    uploadFile() {
        this.setState({
            uploadInProgress: true
        });

        upload(this.state.file, this.props.isAuthenticated, (progress) => {
            this.setState({
                uploadProgress: progress
            });
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (response.success) {
                this.setState({
                    path: response.path,
                    uploadInProgress: false,
                    uploadProgress: null,
                }, () => {
                    this.props.onUpload && this.props.onUpload(this.state.path, this.props.index);
                });
            }
        }).catch((res) => {
            const message = res.data ? res.data.message : '';
            Alert.error(message || 'Failed to upload image.');
            this.setState({
                uploadError: true,
                uploadInProgress: false,
                uploadProgress: null,
                file: null,
            });
        });
    }

    _handleImageChange(e) {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file
            });
            this.uploadFile();
        };

        reader.readAsDataURL(file);
    }

    onRemove() {
        this.setState({
            path: '',
        }, () => {
            this.props.onRemove && this.props.onRemove(this.props.imageUrl);
        });
    }

    renderUploadButton () {
        const { readOnly, imageUrl }  = this.props;

        if (readOnly) {
            return null;
        }
        const acceptedFileTypes = 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/x-zip-compressed';
        const ref = "fileInput" + this.props.index;

        return (
            <div className="aw-doc-holder-btn">
                <input type="file" name="file" className="-input" ref={ref} onChange={this._handleImageChange} accept={acceptedFileTypes}/>
                {imageUrl? <button type="button" className="btn btn-default btn-sm" onClick={this.onRemove}>Delete</button> : null}
            </div>
        );

    }

    renderImage() {
        const { uploadInProgress } = this.state;
        const { imageUrl }  = this.props;
        const style = uploadInProgress || !imageUrl ? {} : {backgroundImage: 'url("' + DOCUMENT_BG + '")'};

        return (
            <div>
                {uploadInProgress || imageUrl ?
                    <div style={style} className="aw-doc-holder-img center-block" onClick={uploadInProgress ? null : this.onUploadClick}>
                        { uploadInProgress ? <Loader/> : null }
                    </div> :
                    <div className="icon-plus aw-doc-holder-add-new" onClick={this.onUploadClick}></div>
                }
            </div>
        )
    }


    getFileName() {
        const { imageUrl }  = this.props;

        if (!imageUrl) {
            return 'Add New Attachment';
        }

        const fileName = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);

        return fileName.substring(0, fileName.lastIndexOf('-')) + this.getFileExtension();
    }

    getFileExtension() {
        const { imageUrl }  = this.props;

        if (!imageUrl) {
            return '';
        }

        return imageUrl.substr(imageUrl.lastIndexOf('.'));
    }

    render () {
        const { className, maxFileSize, imageUrl }  = this.props;
        const holderClassNames = cx('aw-image-holder', className, {});
        const fileNameClassNames = cx('aw-doc-holder-filename', {
            '-new-file': !imageUrl
        });

        return (
            <div className={holderClassNames}>
                {this.renderImage()}
                <div className={fileNameClassNames}>{this.getFileName()}</div>
                {this.renderUploadButton()}
                {!imageUrl ? <div className="aw-doc-holder-max-limit">(Max. {maxFileSize}MB)</div> : null}
            </div>
        )
    }

}

AwDocHolder.propTypes = {
    label: PropTypes.string,
    imageUrl: PropTypes.string,
    fileName: PropTypes.string,
    readOnly: PropTypes.bool,
    onRemove: PropTypes.func,
    onUpload: PropTypes.func,
    roundImage: PropTypes.bool,
};

AwDocHolder.displayName = 'AwDocHolder';

const mapStateToProps = (state) => {
    const auth = state.get('auth');
    const isAuthenticated = auth.getIn(['isAuthenticated']);

    return {
      isAuthenticated,
    };
};

export default connect(mapStateToProps)(AwDocHolder);
