import { useBlockProps, RichText } from 'wp.blockEditor';

export default function save({ attributes }) {
  const { content } = attributes;
  const blockProps = useBlockProps.save({
    className: 'wp-block-gutenbee-product-tab',
  });

  return (
    <li {...blockProps}>
      <RichText.Content value={content} />
    </li>
  );
}
