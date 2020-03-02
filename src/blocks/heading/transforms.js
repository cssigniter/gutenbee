import { createBlock } from 'wp.blocks';

const transforms = {
  from: [
    {
      type: 'block',
      blocks: ['gutenbee/paragraph'],
      transform: ({
        content,
        blockMargin,
        blockPadding,
        fontSize,
        textColor,
        customTextColor,
        backgroundColor,
        customBackgroundColor,
        align,
      }) => {
        return createBlock('gutenbee/heading', {
          content,
          blockMargin,
          blockPadding,
          fontSize,
          textColor: customTextColor || textColor,
          backgroundColor: customBackgroundColor || backgroundColor,
          align,
        });
      },
    },
  ],
  to: [
    {
      type: 'block',
      blocks: ['gutenbee/paragraph'],
      transform: ({
        content,
        blockMargin,
        blockPadding,
        fontSize,
        textColor,
        backgroundColor,
        align,
      }) => {
        return createBlock('gutenbee/paragraph', {
          content,
          blockMargin,
          blockPadding,
          fontSize,
          textColor,
          backgroundColor,
          customTextColor: textColor,
          customBackgroundColor: backgroundColor,
          align,
        });
      },
    },
  ],
};

export default transforms;
