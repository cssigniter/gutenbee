import { Fragment, useState } from 'wp.element';
import { __ } from 'wp.i18n';
import { ToggleControl, RangeControl, PanelBody } from 'wp.components';
import {
  InspectorControls,
  RichText,
  PanelColorSettings,
} from 'wp.blockEditor';
import useUniqueId from '../../hooks/useUniqueId';
import ProgressBarStyle from './style';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import getBlockId from '../../util/getBlockId';

const ProgressBarEdit = ({
  attributes,
  isSelected,
  className,
  setAttributes,
  clientId,
}) => {
  const [editable, setEditable] = useState('');
  useUniqueId({ attributes, setAttributes, clientId });

  const {
    uniqueId,
    title,
    innerTitle,
    percentage,
    displayPercentage,
    barBackgroundColor,
    progressBackgroundColor,
    backgroundColor,
    textColor,
    titleFontSize,
    titleTextColor,
    innerTitleFontSize,
    titleBottomMargin,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div
        id={blockId}
        className={className}
        style={{
          backgroundColor: backgroundColor || undefined,
        }}
      >
        <ProgressBarStyle attributes={attributes} />

        <RichText
          key="title"
          tagName="p"
          value={title}
          onChange={value => setAttributes({ title: value })}
          className={`${className}-title`}
          placeholder={__('Write title…')}
          isSelected={isSelected && editable === 'title'}
          onFocus={() => setEditable('title')}
          style={{
            color: titleTextColor || undefined,
            marginBottom:
              titleBottomMargin == null ? undefined : `${titleBottomMargin}px`,
          }}
        />

        <div
          className={`${className}-outer`}
          style={{
            backgroundColor: barBackgroundColor || undefined,
          }}
        >
          <div
            className={`${className}-inner`}
            style={{
              width: `${percentage}%`,
              backgroundColor: progressBackgroundColor || undefined,
              color: textColor || undefined,
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
              onFocus={() => setEditable('innerTitle')}
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

            <RangeControl
              label={__('Title Bottom Margin')}
              value={titleBottomMargin}
              onChange={value => {
                setAttributes({
                  titleBottomMargin: value != null ? value : undefined,
                });
              }}
              min={0}
              max={200}
            />

            <ResponsiveControl>
              {breakpoint => (
                <FontSizePickerLabel
                  label={__('Title Font Size')}
                  value={titleFontSize[breakpoint]}
                  onChange={value =>
                    setAttributes({
                      titleFontSize: {
                        ...titleFontSize,
                        [breakpoint]: value != null ? value : '',
                      },
                    })
                  }
                />
              )}
            </ResponsiveControl>

            <ResponsiveControl>
              {breakpoint => (
                <FontSizePickerLabel
                  label={__('Bar Text Font Size')}
                  value={innerTitleFontSize[breakpoint]}
                  onChange={value =>
                    setAttributes({
                      innerTitleFontSize: {
                        ...innerTitleFontSize,
                        [breakpoint]: value != null ? value : '',
                      },
                    })
                  }
                />
              )}
            </ResponsiveControl>
          </PanelBody>

          <PanelColorSettings
            title={__('Block Appearance')}
            initialOpen={false}
            colorSettings={[
              {
                value: titleTextColor,
                onChange: value => setAttributes({ titleTextColor: value }),
                label: __('Title Text Color'),
              },
              {
                value: textColor,
                onChange: value => setAttributes({ textColor: value }),
                label: __('Bar Text Color'),
              },
              {
                value: progressBackgroundColor,
                onChange: value =>
                  setAttributes({ progressBackgroundColor: value }),
                label: __('Progress Background Color'),
              },
              {
                value: barBackgroundColor,
                onChange: value => setAttributes({ barBackgroundColor: value }),
                label: __('Bar Background Color'),
              },
              {
                value: backgroundColor,
                onChange: value => setAttributes({ backgroundColor: value }),
                label: __('Block Background Color'),
              },
            ]}
          >
            <ResponsiveControl>
              {breakpoint => (
                <MarginControls
                  label={__('Padding (px)')}
                  attributeKey="blockPadding"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={breakpoint}
                />
              )}
            </ResponsiveControl>

            <ResponsiveControl>
              {breakpoint => (
                <MarginControls
                  label={__('Margin (px)')}
                  attributeKey="blockMargin"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={breakpoint}
                />
              )}
            </ResponsiveControl>
          </PanelColorSettings>
        </InspectorControls>
      )}
    </Fragment>
  );
};

export default ProgressBarEdit;
