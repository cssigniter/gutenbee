import { Fragment, useState } from 'wp.element';
import { __ } from 'wp.i18n';
import { ToggleControl, RangeControl, PanelBody } from 'wp.components';
import { InspectorControls, RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import useUniqueId from '../../hooks/useUniqueId';
import ProgressBarStyle from './style';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import getBlockId from '../../util/getBlockId';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BorderControls from '../../components/controls/border-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

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
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
        )}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <ProgressBarStyle attributes={attributes} />

        <RichText
          key="title"
          tagName="p"
          value={title}
          onChange={value => setAttributes({ title: value })}
          className="wp-block-gutenbee-progress-bar-title"
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
          className="wp-block-gutenbee-progress-bar-outer"
          style={{
            backgroundColor: barBackgroundColor || undefined,
          }}
        >
          <div
            className="wp-block-gutenbee-progress-bar-inner"
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
              className="wp-block-gutenbee-progress-bar-inner-title"
              placeholder={__('Write inner title…')}
              isSelected={isSelected && editable === 'innerTitle'}
              onFocus={() => setEditable('innerTitle')}
            />

            {displayPercentage && (
              <span className="wp-block-gutenbee-progress-bar-percentage">
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

            <RangeControl
              label={__('Title Bottom Margin')}
              value={titleBottomMargin}
              onChange={value => {
                setAttributes({
                  titleBottomMargin: value != null ? value : undefined,
                });
              }}
              allowReset
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

          <PanelBody title={__('Block Appearance')} initialOpen={false}>
            <PopoverColorControl
              label={__('Title Text Color')}
              value={titleTextColor || ''}
              defaultValue={titleTextColor || ''}
              onChange={value => setAttributes({ titleTextColor: value })}
            />

            <PopoverColorControl
              label={__('Bar Text Color')}
              value={textColor || ''}
              defaultValue={textColor || ''}
              onChange={value => setAttributes({ textColor: value })}
            />

            <PopoverColorControl
              label={__('Progress Background Color')}
              value={progressBackgroundColor || ''}
              defaultValue={progressBackgroundColor || ''}
              onChange={value =>
                setAttributes({ progressBackgroundColor: value })
              }
            />

            <PopoverColorControl
              label={__('Bar Background Color')}
              value={barBackgroundColor || ''}
              defaultValue={barBackgroundColor || ''}
              onChange={value => setAttributes({ barBackgroundColor: value })}
            />

            <PopoverColorControl
              label={__('Block Background Color')}
              value={backgroundColor || ''}
              defaultValue={backgroundColor || ''}
              onChange={value => setAttributes({ backgroundColor: value })}
            />

            <BorderControls
              attributes={attributes}
              setAttributes={setAttributes}
            />

            <BoxShadowControls
              attributes={attributes}
              setAttributes={setAttributes}
            />

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
          </PanelBody>
          <PanelBody title={__('Visibility Settings')} initialOpen={false}>
            <BreakpointVisibilityControl
              values={blockBreakpointVisibility}
              onChange={values => {
                setAttributes({
                  blockBreakpointVisibility: values,
                });
              }}
            />

            <AuthVisibilityControl
              values={blockAuthVisibility}
              onChange={values => {
                setAttributes({
                  blockAuthVisibility: values,
                });
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </Fragment>
  );
};

export default ProgressBarEdit;
