import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  RichText,
  PlainText,
} from 'wp.editor';

class TabItemEdit extends Component {
  static propTypes = {
    setAttributes: PropTypes.func.isRequired,
    attributes: PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.array,
    }).isRequired,
    className: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
  };

  render() {
    const {
      attributes,
      className,
      setAttributes,
    } = this.props;
    const {
      title,
      text,
    } = attributes;

    return (
      <Fragment>
        <div className={className}>
          <div className={`${className}-title`}>
            <PlainText
              value={title}
              onChange={value => setAttributes({ title: value })}
              placeholder={__('Write title…')}
            />
          </div>
          <div className={`${className}-content`}>
            <RichText
              tagName="p"
              value={text}
              onChange={value => setAttributes({ text: value })}
              className={`${className}-text`}
              placeholder={__('Write content…')}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TabItemEdit;
