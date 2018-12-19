import { Component, Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { ToggleControl, RangeControl, PanelBody } from 'wp.components';
import {
  InspectorControls,
  RichText,
  PanelColorSettings,
  ContrastChecker,
} from 'wp.editor';
import TextControls from '../../components/controls/text-controls/TextControls';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import MarginControls from '../../components/controls/margin-controls';

class ProgressBarEdit extends Component {
  state = {
    editable: '',
  };

  setActiveEditable = editable => {
    this.setState(() => ({ editable }));
  };

  render() {
    const { editable } = this.state;
    const { attributes, isSelected, className, setAttributes } = this.props;
    const {
      title,
      innerTitle,
      percentage,
      displayPercentage,
      backgroundColor,
      textColor,
      titleFontSize,
      titleTextColor,
      innerTitleFontSize,
      blockMargin,
    } = attributes;

    return (
      <Fragment>
        <div
          className={className}
          style={{
            margin: getMarginSettingStyles(blockMargin),
          }}
        >
          <div style={{ fontSize: titleFontSize }}>
            <RichText
              key="title"
              tagName="p"
              value={title}
              onChange={value => setAttributes({ title: value })}
              className={`${className}-title`}
              placeholder={__('Write title…')}
              isSelected={isSelected && editable === 'title'}
              onFocus={() => this.setActiveEditable('title')}
              style={{
                color: titleTextColor,
              }}
            />
          </div>

          <div className={`${className}-outer`}>
            <div
              className={`${className}-inner`}
              style={{
                width: `${percentage}%`,
                backgroundColor,
                color: textColor,
                fontSize: innerTitleFontSize,
              }}
            >
              <RichText
                key="innerTitle"
                tagName="span"
                value={innerTitle}
                onChange={value => setAttributes({ innerTitle: value })}
                className={`${className}-inner-title`}
                placeholder={__('Write inner title…')}
                isSelected={isSelected && editable === 'innerTitle'}
                onFocus={() => this.setActiveEditable('innerTitle')}
              />

              {displayPercentage && (
                <span className={`${className}-percentage`}>{percentage}%</span>
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

              <TextControls
                setAttributes={setAttributes}
                attributeKey="title"
                attributes={attributes}
                defaultFontSize={titleFontSize}
                fontSizeLabel={__('Title font size')}
              />

              <TextControls
                setAttributes={setAttributes}
                attributeKey="innerTitle"
                attributes={attributes}
                defaultFontSize={innerTitleFontSize}
                fontSizeLabel={__('Text font size')}
              />
            </PanelBody>

            <PanelColorSettings
              title={__('Color Settings')}
              initialOpen={false}
              colorSettings={[
                {
                  value: titleTextColor,
                  onChange: value => setAttributes({ titleTextColor: value }),
                  label: __('Title Text Color'),
                },
                {
                  value: backgroundColor,
                  onChange: value => setAttributes({ backgroundColor: value }),
                  label: __('Bar Background Color'),
                },
                {
                  value: textColor,
                  onChange: value => setAttributes({ textColor: value }),
                  label: __('Bar Text Color'),
                },
              ]}
              onChange={value => setAttributes({ backgroundColor: value })}
            >
              <ContrastChecker
                isLargeText={false}
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </PanelColorSettings>

            <PanelBody title={__('Appearance')} initialOpen={false}>
              <MarginControls
                attributeKey="blockMargin"
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  }
}

export default ProgressBarEdit;
