import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InspectorControls } from 'wp.blockEditor';
import {
  PanelBody,
  RangeControl,
  SelectControl,
  BaseControl,
} from 'wp.components';
import startCase from 'lodash.startcase';
import ReactSelect from 'react-select';

import { VIEWS, SHAPES } from './constants';
import icons from './icons';
import Icon from './Icon';
import IconSelectValue from './IconSelectValue';
import IconBlockIcon from './block-icon';
import MarginControls from '../../components/controls/margin-controls';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import deprecated from './deprecated';
import { boxShadowControlAttributes } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

export const iconAttributes = {
  uniqueId: {
    type: 'string',
  },
  view: {
    type: 'string',
    default: VIEWS.DEFAULT,
  },
  shape: {
    type: 'string',
    default: SHAPES.CIRCLE,
  },
  icon: {
    type: 'string',
    default: 'add-bag',
  },
  size: {
    type: 'object',
    default: getDefaultResponsiveValue({
      desktop: 40,
      tablet: '',
      mobile: '',
    }),
  },
  padding: {
    type: 'number',
    default: 2,
  },
  borderWidth: {
    type: 'number',
    default: 3,
  },
  align: {
    type: 'string',
    default: 'left',
  },
  colorPrimary: {
    type: 'string',
  },
  colorSecondary: {
    type: 'string',
  },
  blockMargin: {
    type: 'object',
    default: getDefaultSpacingValue(),
  },
  blockPadding: {
    type: 'object',
    default: getDefaultSpacingValue(),
  },
  ...boxShadowControlAttributes('icon'),
  blockBreakpointVisibility: {
    type: 'object',
    default: getDefaultResponsiveValue({
      desktop: false,
      tablet: false,
      mobile: false,
    }),
  },
  blockAuthVisibility: {
    type: 'object',
    default: {
      loggedIn: false,
      loggedOut: false,
    },
  },
};

export const IconSettings = ({
  className,
  setAttributes,
  attributes,
  children,
  alignmentOptions = [
    {
      value: 'left',
      label: __('Left'),
    },
    {
      value: 'center',
      label: __('Center'),
    },
    {
      value: 'right',
      label: __('Right'),
    },
  ],
}) => {
  const {
    view,
    shape,
    icon,
    size,
    padding,
    borderWidth,
    align,
    colorPrimary,
    colorSecondary,
    blockMargin,
    blockPadding,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  return (
    <Fragment>
      <PanelBody>
        <BaseControl id="icon-select" label={__('Icon')}>
          <ReactSelect
            aria-labelledby="icon-select"
            onChange={value => setAttributes({ icon: value || 'add-bag' })}
            value={icon}
            options={icons.map(value => ({ value, label: startCase(value) }))}
            simpleValue
            valueRenderer={({ value, label }) => (
              <IconSelectValue value={value} label={label} />
            )}
            optionRenderer={({ value, label }) => (
              <IconSelectValue
                value={value}
                label={label}
                className={className}
              />
            )}
            clearable={false}
          />
        </BaseControl>
        <SelectControl
          label={__('View')}
          value={view}
          onChange={value => setAttributes({ view: value })}
          options={[
            { value: VIEWS.DEFAULT, label: __('Default') },
            { value: VIEWS.STACKED, label: __('Stacked') },
            { value: VIEWS.FRAMED, label: __('Framed') },
          ]}
        />
        {view !== VIEWS.DEFAULT && (
          <SelectControl
            label={__('Shape')}
            value={shape}
            onChange={value => setAttributes({ shape: value })}
            options={[
              { value: SHAPES.CIRCLE, label: __('Circle') },
              { value: SHAPES.SQUARE, label: __('Square') },
            ]}
          />
        )}
        <ResponsiveControl>
          {breakpoint => {
            return (
              <RangeControl
                label={__('Icon Size (px)')}
                min={1}
                max={100}
                value={size[breakpoint]}
                onChange={value =>
                  setAttributes({
                    size: {
                      ...size,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            );
          }}
        </ResponsiveControl>
        {view !== VIEWS.DEFAULT && (
          <RangeControl
            label={__('Padding (em)')}
            min={1}
            max={10}
            step={0.1}
            value={padding}
            onChange={value => setAttributes({ padding: value })}
          />
        )}
        {view === VIEWS.FRAMED && (
          <RangeControl
            label={__('Border Size (px)')}
            min={1}
            max={50}
            step={1}
            value={borderWidth}
            onChange={value => setAttributes({ borderWidth: value })}
          />
        )}

        <SelectControl
          label={__('Alignment')}
          value={align}
          options={alignmentOptions.map(option => ({
            value: option.value,
            label: option.label,
          }))}
          onChange={value => {
            setAttributes({ align: value || 'left' });
          }}
        />
      </PanelBody>

      <PanelBody title={__('Icon Appearance')} initialOpen={false}>
        <PopoverColorControl
          label={__('Primary Color')}
          value={colorPrimary || ''}
          defaultValue={colorPrimary || ''}
          onChange={value => setAttributes({ colorPrimary: value })}
        />

        {view !== VIEWS.DEFAULT && (
          <PopoverColorControl
            label={__('Secondary Color')}
            value={colorSecondary || ''}
            defaultValue={colorSecondary || ''}
            onChange={value => setAttributes({ colorSecondary: value })}
          />
        )}
        <BoxShadowControls
          attributes={attributes}
          setAttributes={setAttributes}
          attributePrefix="icon"
        />

        {blockPadding && (
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
        )}

        {blockMargin && (
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
        )}

        {children}
      </PanelBody>

      {blockBreakpointVisibility && blockAuthVisibility && (
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
      )}
    </Fragment>
  );
};

const IconEdit = ({
  className,
  attributes,
  setAttributes,
  isSelected,
  clientId,
}) => {
  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(attributes.uniqueId);

  return (
    <Fragment>
      <Icon id={blockId} className={className} {...attributes} />
      {isSelected && (
        <InspectorControls>
          <IconSettings
            className={className}
            setAttributes={setAttributes}
            attributes={attributes}
          />
        </InspectorControls>
      )}
    </Fragment>
  );
};

registerBlockType('gutenbee/icon', {
  title: __('GutenBee Icon'),
  description: __('A flexible icon block'),
  icon: IconBlockIcon,
  category: 'gutenbee',
  keywords: [__('icons')],
  attributes: iconAttributes,
  deprecated,
  edit: IconEdit,
  save({ className, attributes }) {
    const id = getBlockId(attributes.uniqueId);
    return <Icon id={id} className={className} {...attributes} />;
  },
});
