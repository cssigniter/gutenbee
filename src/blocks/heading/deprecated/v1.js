import { Fragment } from 'wp.element';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';

const HeadingStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />

      {children}
    </StyleSheetV1>
  );
};

const headingDeprecationV1 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
      type: 'string',
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'h1,h2,h3,h4,h5,h6',
      default: '',
    },
    level: {
      type: 'number',
      default: 2,
    },
    placeholder: {
      type: 'string',
    },
    textColor: {
      type: 'string',
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
  },
  migrate(attributes) {
    return {
      ...attributes,
      fontSize: getDefaultResponsiveValue(),
      align: getDefaultResponsiveValue({
        desktop: attributes.align,
        tablet: '',
        mobile: '',
      }),
    };
  },
  save: ({ attributes }) => {
    const {
      uniqueId,
      align,
      content,
      level,
      textColor,
      backgroundColor,
    } = attributes;
    const tagName = 'h' + level;

    const className = classNames({
      'has-text-color': !!textColor,
      'has-background-color': !!backgroundColor,
      [`has-text-align-${align}`]: align,
    });

    const blockId = getBlockId(uniqueId);

    return (
      <Fragment>
        <HeadingStyle attributes={attributes} />

        <RichText.Content
          id={blockId}
          className={className ? className : undefined}
          tagName={tagName}
          style={{
            color: textColor ? textColor : undefined,
            backgroundColor: backgroundColor ? backgroundColor : undefined,
          }}
          value={content}
        />
      </Fragment>
    );
  },
};

export default headingDeprecationV1;
