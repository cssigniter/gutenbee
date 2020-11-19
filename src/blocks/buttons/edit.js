import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { Fragment } from 'wp.element';
import { InnerBlocks } from 'wp.blockEditor';
import { InspectorControls } from 'wp.blockEditor';
import { PanelBody, SelectControl } from 'wp.components';
import classNames from 'classnames';

import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import { BREAKPOINT_NAMES } from '../../components/stylesheet/helpers';
import MarginControls from '../../components/controls/margin-controls';
import ButtonsStyle from './style';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

const ButtonsEdit = ({ attributes, setAttributes, className, clientId }) => {
  const { uniqueId, align, backgroundColor } = attributes;
  const desktopAlignment = align[BREAKPOINT_NAMES.desktop];

  useUniqueId({ attributes, setAttributes, clientId });

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div
        className={classNames(className, blockId, {
          [desktopAlignment]: true,
        })}
        style={{
          backgroundColor: backgroundColor || undefined,
        }}
      >
        <ButtonsStyle attributes={attributes} />
        <InnerBlocks
          allowedBlocks={['gutenbee/button']}
          template={[['gutenbee/button']]}
          __experimentalUIParts={{ hasSelectedUI: false }}
          __experimentalMoverDirection="horizontal"
        />
      </div>

      <InspectorControls>
        <PanelBody title={__('Button Group Settings')}>
          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Button Alignment')}
                value={align[breakpoint]}
                options={[
                  { value: '', label: __('') },
                  { value: 'flex-start', label: __('Left') },
                  { value: 'center', label: __('Center') },
                  { value: 'flex-end', label: __('Right') },
                ]}
                onChange={value =>
                  setAttributes({
                    align: {
                      ...align,
                      [breakpoint]: value,
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <PanelBody title={__('Block Appearance')} initialOpen={false}>
          <PopoverColorControl
            label={__('Background Color')}
            value={backgroundColor || ''}
            defaultValue={backgroundColor || ''}
            onChange={value => setAttributes({ backgroundColor: value })}
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
      </InspectorControls>
    </Fragment>
  );
};

ButtonsEdit.propTypes = propTypes;

export default ButtonsEdit;
