// TODO decide if we're migrating this or keeping styles with important

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
    blockBreakpointVisibility,
    blockAuthVisibility,
    defaultOpenTabs = [],
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
      data-collapse-others={collapseOthers}
    >
      <AccordionStyle attributes={attributes} />

      {tabs.map((tab, index) => (
        <div
          className={classNames({
            'wp-block-gutenbee-accordion-item': true,
            'wp-block-gutenbee-accordion-item-expanded': defaultOpenTabs?.includes(
              index,
            ),
          })}
        >
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

registerBlockType('gutenbee/accordion', {
  title: __('GutenBee Accordion'),
  description: __('Display fancy accordions'),
  icon: AccordionBlockIcon,
  category: 'gutenbee',
  keywords: [__('accordion'), __('tabs')],
  supports: {
    anchor: true,
  },
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
    defaultOpenTabs: {
      type: 'array',
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
  edit: AccordionsEdit,
  save: ({ className, attributes }) => (
    <Accordion className={className} attributes={attributes} />
  ),
});
