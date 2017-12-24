import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

import './AwFieldset.less'

class AwFieldset extends Component {

    constructor(props) {
        super(props);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.state = {
            isClosed: this.props.closeByDefault || false
        };
    }

    toggleCollapse() {
        this.setState({
            isClosed: !this.state.isClosed
        });
        return false;
    }

    renderCollapseButton() {
        if (this.props.noToggleButton) {
            return '';
        }

        let btnClassNames = cx('aw-fieldset-collapse icon-chevron-with-circle-up', {
            closed: this.state.isClosed
        });

        return (
            <a href="#" className={btnClassNames} onClick={this.toggleCollapse}></a>
        )
    }

    render () {
        let { title, icon, collapsedSubTitle, helperText }  = this.props;

        let titleClassNames = cx('aw-fieldset-title', icon);

        let fieldsetClassNames = cx('aw-fieldset', this.props.className, {
            '-plain': this.props.isPlain,
            '-dark': this.props.isDark
        });

        let bodyClassNames = cx('aw-fieldset-body', {
            in: !this.state.isClosed
        });

        return (
            <div className={fieldsetClassNames}>
                <div className="aw-fieldset-header">
                    <h4 className={titleClassNames}>{this.props.title}</h4>
                    {helperText && <div className="aw-fieldset-subheader">{helperText}</div>}
                    {collapsedSubTitle && this.state.isClosed ? <div className="aw-fieldset-subheader">{collapsedSubTitle}</div> : null}
                    {this.renderCollapseButton()}
                </div>
                {/* <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={300}> */}
                    <div className={bodyClassNames}>
                        <div className="-content">
                            {this.props.children}
                        </div>
                    </div>
                {/* </ReactCSSTransitionGroup> */}
            </div>
        );
    }
};

AwFieldset.propTypes = {
    title: PropTypes.string,
    helperText: PropTypes.string,
    icon: PropTypes.string,
    noToggleButton: PropTypes.bool,
    closeByDefault: PropTypes.bool,
    children: PropTypes.any
};

AwFieldset.displayName = 'AwFieldset';

export default AwFieldset;
