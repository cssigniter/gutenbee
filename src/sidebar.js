import { __ } from 'wp.i18n';
import { registerPlugin } from 'wp.plugins';
import { PluginSidebar } from 'wp.editPost';
import { RangeControl, PanelBody } from 'wp.components';
import { useSelect, useDispatch } from 'wp.data';

registerPlugin('gutenbee-sidebar', {
  render: () => {
    const { editorWidth } = useSelect(select => {
      const editorWidth = select('core/editor').getEditedPostAttribute('meta')[
        'gutenbee_single_item_editor_width'
      ];

      return {
        editorWidth,
      };
    });

    const { editPost } = useDispatch('core/editor');

    const updateEditorWidth = () => {
      if (!editorWidth) return null;
      let $style = document.getElementById('gb-ew');
      if ($style) {
        $style.innerHTML = `.wp-block { max-width: ${editorWidth}px; }`;
      } else {
        $style = document.createElement('style');
        $style.setAttribute('id', 'gb-ew');
        document.head.appendChild($style);
        $style.innerHTML = `.wp-block { max-width: ${editorWidth}px; }`;
      }
    };

    return (
      <PluginSidebar
        title={__('GutenBee Sidebar', 'textdomain')}
        name="gutenbee-sidebar"
        icon="admin-post"
      >
        <PanelBody
          className="gutenbee-sidebar"
          title={__('Editor Width Options')}
          initialOpen
        >
          <RangeControl
            label={__('Editor Width (px)')}
            min={200}
            max={1920}
            value={editorWidth}
            onChange={value => {
              editPost({
                meta: { gutenbee_single_item_editor_width: value },
              }),
                updateEditorWidth();
            }}
            step={1}
            allowReset={true}
            resetFallbackValue={680}
          />
          <span>
            {__(
              'For this option to work you need to enable the custom width option under Settings > GutenBee.',
            )}
          </span>
        </PanelBody>
      </PluginSidebar>
    );
  },
});
