/**
 * Icon Box Block
 */

import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import {
  InspectorControls,
  AlignmentToolbar,
  InnerBlocks,
} from 'wp.editor';
import {
  PanelBody,
  withState,
} from 'wp.components';
import classNames from 'classnames';

const IconBox = ({ className, attributes }) => {
  const {
    align,
    contentAlign,
  } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-align-${align}`]: true,
        [`${className}-content-align-${contentAlign}`]: true,
      })}
    >
      <InnerBlocks.Content />
    </div>
  );
};

const IconBoxEditBlock = ({
  className,
  attributes,
  setAttributes,
  isSelected,
}) => {
  const {
    align,
    contentAlign,
  } = attributes;

  return (
    <Fragment>
      <div
        className={classNames({
          [className]: true,
          [`${className}-align-${align}`]: true,
          [`${className}-content-align-${contentAlign}`]: true,
        })}
      >
        <InnerBlocks
          allowedBlockNames={[
            'gutenbee/icon',
            'core/heading',
            'core/paragraph',
            'core/button',
          ]}
          template={[
            ['gutenbee/icon'],
            ['core/heading', {
              align: 'none',
              placeholder: __('Write title'),
            }],
            ['core/paragraph', {
              align: 'none',
              placeholder: __('Write content'),
            }],
          ]}
        />
      </div>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={__('Content Settings')}>
            <p>{__('Alignment')}</p>
            <AlignmentToolbar
              value={contentAlign}
              onChange={value => setAttributes({ contentAlign: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </Fragment>
  );
};

registerBlockType('gutenbee/iconbox-2', {
  title: __('GutenBee Icon Box (Experimental)'),
  description: __('A flexible icon box block'),
  icon: 'star-filled',
  category: 'layout',
  keywords: [
    __('icon'),
  ],
  attributes: {
    align: {
      type: 'string',
      default: 'left',
    },
    contentAlign: {
      type: 'string',
      default: null,
    },
  },
  edit: withState({ editable: null })(IconBoxEditBlock),
  save({ className, attributes }) {
    return (
      <IconBox
        className={className}
        attributes={attributes}
      />
    );
  },
});
