import { Fragment, useState } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  BlockControls,
  __experimentalLinkControl as LinkControl,
} from 'wp.blockEditor';
import {
  KeyboardShortcuts,
  ToolbarButton,
  ToolbarGroup,
  Popover,
} from 'wp.components';
import { rawShortcut, displayShortcut } from 'wp.keycodes';
import { Icon } from 'wp.components';

const URLPicker = ({
  isSelected,
  url,
  setAttributes,
  opensInNewTab,
  onToggleOpenInNewTab,
}) => {
  const [isURLPickerOpen, setIsURLPickerOpen] = useState(false);
  const openLinkControl = () => {
    setIsURLPickerOpen(true);
  };
  const linkControl = isURLPickerOpen && (
    <Popover position="bottom center" onClose={() => setIsURLPickerOpen(false)}>
      <LinkControl
        className="wp-block-navigation-link__inline-link-input"
        value={{ url, opensInNewTab }}
        onChange={({ url: newURL = '', opensInNewTab: newOpensInNewTab }) => {
          setAttributes({ url: newURL });

          if (opensInNewTab !== newOpensInNewTab) {
            onToggleOpenInNewTab(newOpensInNewTab);
          }
        }}
      />
    </Popover>
  );
  return (
    <Fragment>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            name="link"
            icon={<Icon icon="admin-links" size={16} />}
            title={__('Link')}
            shortcut={displayShortcut.primary('k')}
            onClick={openLinkControl}
          />
        </ToolbarGroup>
      </BlockControls>
      {isSelected && (
        <KeyboardShortcuts
          bindGlobal
          shortcuts={{
            [rawShortcut.primary('k')]: openLinkControl,
          }}
        />
      )}
      {linkControl}
    </Fragment>
  );
};

export default URLPicker;
