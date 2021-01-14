import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  ToggleControl,
  RangeControl,
  SelectControl,
  PanelBody,
} from 'wp.components';
import { InspectorControls } from 'wp.blockEditor';
import startCase from 'lodash.startcase';
import classNames from 'classnames';

import Gallery from '../../components/gallery/Gallery';
import { LAST_ROW } from './constants';
import { capitalizeSentence } from '../../util/text';
import MarginControls from '../../components/controls/margin-controls';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import GalleryStyle from './style';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BorderControls from '../../components/controls/border-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

export const GALLERY_TYPE = {
  COLUMNS: 'columns',
  JUSTIFIED: 'justified',
};

const propTypes = {
  attributes: PropTypes.shape({
    uniqueId: PropTypes.string,
    type: PropTypes.oneOf(Object.values(GALLERY_TYPE)),
    columns: PropTypes.number.isRequired,
    rowHeight: PropTypes.number,
    margins: PropTypes.number,
    lastRow: PropTypes.oneOf(Object.values(LAST_ROW)),
    randomize: PropTypes.bool,
    blockMargin: PropTypes.object,
    blockPadding: PropTypes.object,
  }),
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string,
  setAttributes: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
};

const JustifiedGalleryEdit = ({
  attributes,
  isSelected,
  className,
  setAttributes,
  clientId,
}) => {
  const {
    uniqueId,
    type,
    columns,
    rowHeight,
    margins,
    lastRow,
    randomize,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const blockId = getBlockId(uniqueId);

  return (
    <Gallery
      id={blockId}
      className={classNames(
        className,
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
        {
          [`gutenbee-columns-${columns}`]: type === GALLERY_TYPE.COLUMNS,
        },
      )}
      attributes={attributes}
      isSelected={isSelected}
      setAttributes={setAttributes}
      label={__('Gallery')}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <GalleryStyle attributes={attributes} />
      <InspectorControls>
        <PanelBody title={__('Gallery Settings')}>
          <SelectControl
            label={__('Gallery Type')}
            value={type}
            options={[
              {
                value: GALLERY_TYPE.COLUMNS,
                label: 'Columns',
              },
              {
                value: GALLERY_TYPE.JUSTIFIED,
                label: 'Justified',
              },
            ]}
            onChange={value => setAttributes({ type: value })}
          />

          {type === GALLERY_TYPE.COLUMNS && (
            <Fragment>
              <RangeControl
                label={__('Columns')}
                min={1}
                max={6}
                value={columns}
                onChange={value => setAttributes({ columns: value })}
                step={1}
              />
            </Fragment>
          )}

          {type === GALLERY_TYPE.JUSTIFIED && (
            <Fragment>
              <RangeControl
                label={__('Row Height')}
                min={0}
                max={600}
                value={rowHeight}
                onChange={value => setAttributes({ rowHeight: value })}
                step={5}
              />

              <RangeControl
                label={__('Margins')}
                min={0}
                max={50}
                value={margins}
                onChange={value => setAttributes({ margins: value })}
                step={1}
              />

              <SelectControl
                label={__('Last Row')}
                value={lastRow}
                options={Object.keys(LAST_ROW).map(key => ({
                  value: LAST_ROW[key],
                  label: capitalizeSentence(startCase(key)),
                }))}
                onChange={value => setAttributes({ lastRow: value })}
              />

              <ToggleControl
                label={__('Randomize')}
                checked={randomize}
                onChange={value => setAttributes({ randomize: value })}
              />
            </Fragment>
          )}
        </PanelBody>

        <PanelBody title={__('Block Appearance')} initialOpen={false}>
          <PopoverColorControl
            label={__('Background Color')}
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
    </Gallery>
  );
};

JustifiedGalleryEdit.propTypes = propTypes;

export default JustifiedGalleryEdit;
