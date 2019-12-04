import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InspectorControls, PanelColorSettings } from 'wp.blockEditor';
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
import { capitalize } from '../../util/text';
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import deprecated from './deprecated';

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
    default: icons[0],
  },
  size: {
    type: 'number',
    default: 40,
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
};

export const IconSettings = ({
  className,
  setAttributes,
  attributes,
  children,
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
    excludeAlignment,
    blockMargin,
    blockPadding,
  } = attributes;

  return (
    <Fragment>
      <BaseControl id="icon-select" label={__('Icon')}>
        <ReactSelect
          aria-labelledby="icon-select"
          onChange={value => setAttributes({ icon: value })}
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

      <RangeControl
        label={__('Icon Size (px)')}
        min={1}
        max={100}
        value={size}
        onChange={value => setAttributes({ size: value })}
      />

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

      {!excludeAlignment && (
        <Fragment>
          <SelectControl
            label={__('Alignment')}
            value={align}
            options={['left', 'center', 'right'].map(option => ({
              value: option,
              label: capitalize(option),
            }))}
            onChange={value => {
              setAttributes({ align: value || 'left' });
            }}
          />
        </Fragment>
      )}

      <PanelColorSettings
        title={__('Icon Appearance')}
        initialOpen={false}
        colorSettings={[
          {
            value: colorPrimary,
            onChange: value => setAttributes({ colorPrimary: value }),
            label: __('Primary Color'),
          },
          ...(view !== VIEWS.DEFAULT
            ? [
                {
                  value: colorSecondary,
                  onChange: value => setAttributes({ colorSecondary: value }),
                  label: __('Secondary Color'),
                },
              ]
            : []),
        ]}
        onChange={value => setAttributes({ backgroundColor: value })}
      >
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
      </PanelColorSettings>
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
          <PanelBody>
            <IconSettings
              className={className}
              setAttributes={setAttributes}
              attributes={attributes}
            />
          </PanelBody>
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
