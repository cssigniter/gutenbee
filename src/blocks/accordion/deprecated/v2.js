import { RichText } from 'wp.blockEditor';

import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import getBlockId from '../../../util/getBlockId';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const AccordionStyle = ({ attributes, children }) => {
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

const Accordion = ({ className, attributes }) => {
  const {
    uniqueId,
    tabs,
    titleBackgroundColor,
    titleTextColor,
    borderColor,
    tabContentBackgroundColor,
    tabContentTextColor,
    collapseOthers,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={className}
      data-collapse-others={collapseOthers}
    >
      <AccordionStyle attributes={attributes} />

      {tabs.map(tab => (
        <div className="wp-block-gutenbee-accordion-item">
          <div
            className="wp-block-gutenbee-accordion-item-title"
            style={{
              color: titleTextColor || undefined,
              backgroundColor: titleBackgroundColor || undefined,
              borderColor: borderColor || undefined,
            }}
          >
            {tab.title}
          </div>

          <div className="wp-block-gutenbee-accordion-item-content-wrap">
            <div
              className="wp-block-gutenbee-accordion-item-content"
              style={{
                borderColor: borderColor || undefined,
                backgroundColor: tabContentBackgroundColor || undefined,
                color: tabContentTextColor || undefined,
              }}
            >
              <RichText.Content
                tagName="p"
                value={tab.content}
                className="wp-block-gutenbee-accordion-item-text"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const v2 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    tabs: {
      type: 'array',
      default: [
        {
          title: '',
          content: '',
        },
      ],
    },
    collapseOthers: {
      type: 'boolean',
      default: true,
    },
    titleBackgroundColor: {
      type: 'string',
      default: '',
    },
    titleTextColor: {
      type: 'string',
      default: '',
    },
    tabContentTextColor: {
      type: 'string',
      default: '',
    },
    tabContentBackgroundColor: {
      type: 'string',
      default: '',
    },
    borderColor: {
      type: 'string',
      default: '',
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
  migrate: attributes => {
    return {
      ...attributes,
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
    };
  },
  save: ({ className, attributes }) => (
    <Accordion className={className} attributes={attributes} />
  ),
};

export default v2;
