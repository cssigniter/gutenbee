import { RichText } from 'wp.blockEditor';
import classnames from 'classnames';

import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';

const ButtonStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule
        value={blockMargin}
        rule=".gutenbee-block-button-link { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".gutenbee-block-button-link { padding: %s; }"
        unit="px"
      />

      {children}
    </StyleSheetV1>
  );
};

const v1 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    url: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'href',
    },
    text: {
      type: 'string',
      source: 'html',
      selector: 'a',
    },
    linkTarget: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'target',
    },
    rel: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'rel',
    },
    borderRadius: {
      type: 'number',
    },
    borderWidth: {
      type: 'number',
    },
    backgroundColor: {
      type: 'string',
    },
    borderColor: {
      type: 'string',
    },
    textColor: {
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
      borderColor: attributes.borderColor,
      borderWidth: undefined,
      borderStyle: undefined,
      borderRadius:
        attributes.borderRadius != null ? attributes.borderRadius : undefined,
      fontSize: {
        desktop: '',
        tablet: '',
        mobile: '',
      },
    };
  },
  save: ({ attributes }) => {
    const {
      uniqueId,
      textColor,
      borderColor,
      backgroundColor,
      borderRadius,
      borderWidth,
      linkTarget,
      rel,
      text,
      url,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    return (
      <div id={blockId}>
        <ButtonStyle attributes={attributes} />
        <RichText.Content
          tagName="a"
          href={url}
          value={text}
          target={linkTarget}
          rel={rel}
          className={classnames({
            'gutenbee-block-button-link': true,
          })}
          style={{
            backgroundColor: backgroundColor || undefined,
            borderColor: borderColor || undefined,
            color: textColor || undefined,
            borderRadius:
              borderRadius != null ? `${borderRadius}px` : undefined,
            borderWidth: borderWidth != null ? `${borderWidth}px` : undefined,
          }}
        />
      </div>
    );
  },
};

export default v1;
