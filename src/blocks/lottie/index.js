/**
 * Lottie Player
 */

import { __ } from 'wp.i18n';
import { registerTODOBlockType } from 'wp.blocks';
import classNames from 'classnames';

import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import LottieEdit from './edit';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import getBlockId from '../../util/getBlockId';
import LottieStyle from './style';

registerTODOBlockType('gutenbee/lottie', {
  title: __('GutenBee Lottie Player'),
  description: __('Embed Lottie animations on your pages.'),
  category: 'gutenbee',
  icon: 'A', // TODO
  keywords: ['lottie', __('animations')],
  supports: {
    anchor: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    src: {
      type: 'string',
    },
    playMode: {
      type: 'string',
      default: 'normal',
    },
    direction: {
      type: 'string',
      default: 'forward',
    },
    animationSpeed: {
      type: 'number',
      default: 1,
    },
    controls: {
      type: 'boolean',
      default: true,
    },
    autoplay: {
      type: 'boolean',
      default: true,
    },
    hover: {
      type: 'boolean',
      default: false,
    },
    loop: {
      type: 'boolean',
      default: true,
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
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  edit: LottieEdit,
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      backgroundColor,
      src,
      playMode,
      direction,
      animationSpeed,
      controls,
      autoplay,
      hover,
      loop,
    } = attributes;

    const config = {
      autoplay: autoplay || undefined,
      controls: controls || undefined,
      mode: playMode,
      speed: animationSpeed,
      loop: loop || undefined,
      background: backgroundColor || undefined,
      hover: hover || undefined,
      direction,
      src,
    };

    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        className={classNames(className, blockId)}
        style={{
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <LottieStyle attributes={attributes} />
        <lottie-player {...config} />
      </div>
    );
  },
});
