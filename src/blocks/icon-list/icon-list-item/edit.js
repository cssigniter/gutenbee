import { Fragment, useRef } from 'wp.element';
import { __ } from 'wp.i18n';
import { RichText, InspectorControls } from 'wp.blockEditor';
import {
  PanelBody,
  BaseControl,
  TextControl,
  ToggleControl,
} from 'wp.components';
import classNames from 'classnames';
import { createBlock } from 'wp.blocks';
import ReactSelect from 'react-select';
import startCase from 'lodash.startcase';

import Icon from './Icon';
import icons from '../../icon/icons';
import IconSelectValue from '../../icon/IconSelectValue';
import URLPicker, { canUseURLPicker } from '../../../components/url-picker';

const IconListItemEdit = ({
  attributes,
  className,
  setAttributes,
  onReplace,
  isSelected,
}) => {
  const { content, icon, listUrl, newTab } = attributes;
  const ref = useRef();

  const listItem = (
    <Fragment>
      <Icon className={className} {...attributes} />
      <RichText
        identifier="content"
        tagName="div"
        className={classNames(
          'wp-block-gutenbee-icon-list-item-text',
          className,
        )}
        value={content}
        aria-label={__('Icon List Item block')}
        placeholder={__('Start writing…')}
        keepPlaceholderOnFocus={true}
        multiline={false}
        disableLineBreaks={true}
        onChange={content => setAttributes({ content })}
        onReplace={onReplace}
        onSplit={value => {
          if (!value) {
            return createBlock('gutenbee/icon-list-item');
          }

          return createBlock('gutenbee/icon-list-item', {
            ...attributes,
            content: value,
          });
        }}
      />
    </Fragment>
  );

  const canUseURLPickerBool = canUseURLPicker();

  return (
    <Fragment>
      <li
        className={classNames({
          'wp-block-gutenbee-icon-list-item': true,
        })}
        ref={ref}
      >
        {listUrl ? (
          <span className="wp-block-gutenbee-list-icon-pseudo-link">
            {listItem}
          </span>
        ) : (
          listItem
        )}
      </li>

      {canUseURLPickerBool && (
        <URLPicker
          isSelected={isSelected}
          onChange={values => {
            setAttributes({
              listUrl: values.url,
              newTab: values.opensInNewTab,
            });
          }}
          url={listUrl}
          opensInNewTab={newTab}
          anchorRef={ref}
        />
      )}

      <InspectorControls>
        <PanelBody>
          <BaseControl id="icon-select" label={__('List Item Icon')}>
            <ReactSelect
              aria-labelledby="icon-select"
              onChange={value => setAttributes({ icon: value })}
              value={icon}
              options={icons.map(value => ({
                value,
                label: startCase(value),
              }))}
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

          {!canUseURLPickerBool && (
            <Fragment>
              <TextControl
                label={__('List Item URL')}
                value={listUrl}
                onChange={value => setAttributes({ listUrl: value })}
                type="url"
                placeholder="https://"
              />
              <ToggleControl
                label={__('Open in new tab')}
                checked={!!newTab}
                onChange={() => setAttributes({ newTab: !newTab })}
                help={
                  newTab
                    ? __('Opens link in new tab.')
                    : __('Toggle to open link in new tab.')
                }
              />
            </Fragment>
          )}
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
};

export default IconListItemEdit;
