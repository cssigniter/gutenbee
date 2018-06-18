import { Component, Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  ToggleControl,
  RangeControl,
  PanelBody,
} from 'wp.components';
import {
  InspectorControls,
  RichText,
  PanelColor,
  ContrastChecker,
} from 'wp.editor';

class ProgressBarEdit extends Component {
  state = {
    editable: '',
  };

  setActiveEditable = (editable) => {
    this.setState(() => ({ editable }));
  };

  render() {
    const { editable } = this.state;
    const {
      attributes,
      isSelected,
      className,
      setAttributes,
    } = this.props;
    const {
      title,
      innerTitle,
      percentage,
      displayPercentage,
      backgroundColor,
      textColor,
    } = attributes;

    return (
      <Fragment>
        <div className={className}>
          <RichText
            tagName="p"
            value={title}
            onChange={value => setAttributes({ title: value })}
            className={`${className}-title`}
            placeholder={__('Write title…')}
            isSelected={isSelected && editable === 'title'}
            onFocus={() => this.setActiveEditable('title')}
          />

          <div className={`${className}-outer`}>
            <div
              className={`${className}-inner`}
              style={{
                width: `${percentage}%`,
                backgroundColor,
                color: textColor,
              }}
            >
              <RichText
                tagName="span"
                value={innerTitle}
                onChange={value => setAttributes({ innerTitle: value })}
                className={`${className}-inner-title`}
                placeholder={__('Write inner title…')}
                isSelected={isSelected && editable === 'innerTitle'}
                onFocus={() => this.setActiveEditable('innerTitle')}
              />

              {displayPercentage && (
                <span className={`${className}-percentage`}>
                  {percentage}%
                </span>
              )}
            </div>
          </div>
        </div>

        {isSelected && (
          <InspectorControls>
            <PanelBody>
              <RangeControl
                label={__('Percentage')}
                min={1}
                max={100}
                value={percentage}
                onChange={value => setAttributes({ percentage: value })}
                step={1}
              />

              <ToggleControl
                label={__('Display percentage')}
                checked={displayPercentage}
                onChange={value => setAttributes({ displayPercentage: value })}
              />
            </PanelBody>

            <PanelColor
              colorValue={backgroundColor}
              title={__('Background Color')}
              onChange={value => setAttributes({ backgroundColor: value })}
            />

            <PanelColor
              colorValue={textColor}
              title={__('Text Color')}
              onChange={value => setAttributes({ textColor: value })}
            />

            <ContrastChecker
              textColor={textColor}
              backgroundColor={backgroundColor}
            />
          </InspectorControls>
        )}
      </Fragment>
    );
  }
}

export default ProgressBarEdit;
