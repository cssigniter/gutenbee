import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  InspectorControls,
  RichText,
  PlainText,
} from 'wp.editor';
import {
  PanelBody,
  ToggleControl,
} from 'wp.components';

class AccordionItemEdit extends Component {
  static propTypes = {
    setAttributes: PropTypes.func.isRequired,
    attributes: PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.array,
      defaultExpanded: PropTypes.bool,
    }).isRequired,
    className: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
  };

  render() {
    const {
      attributes,
      className,
      setAttributes,
      isSelected,
    } = this.props;
    const {
      title,
      text,
      defaultExpanded,
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

        {isSelected && (
          <InspectorControls>
            <PanelBody>
              <ToggleControl
                label={__('Start Expanded')}
                checked={defaultExpanded}
                onChange={value => setAttributes({ defaultExpanded: value })}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  }
}

export default AccordionItemEdit;
