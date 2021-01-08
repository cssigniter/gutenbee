import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import ButtonsEdit from './edit';
import getBlockId from '../../util/getBlockId';
import ButtonsStyle from './style';
import ButtonsBlockIcon from './block-icon';
import deprecated from './deprecated';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

const Buttons = ({ attributes, className }) => {
  const {
    uniqueId,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
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
      }}
    >
      <ButtonsStyle attributes={attributes} />
      <InnerBlocks.Content />
    </div>
  );
};

registerBlockType('gutenbee/buttons', {
  title: __('GutenBee Button Group'),
  description: __(
    'Prompt visitors to take action with a group of button-style links',
  ),
  supports: {
    anchor: true,
  },
  icon: ButtonsBlockIcon,
  category: 'gutenbee',
  keywords: [__('link'), __('button'), __('call to action')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: 'flex-start',
        tablet: '',
        mobile: '',
      }),
    },
    backgroundColor: {
      type: 'string',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
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
  },
  deprecated,
  edit: ButtonsEdit,
  save: ({ attributes, className }) => {
    return <Buttons className={className} attributes={attributes} />;
  },
});
