import { Fragment, useState } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  BlockControls,
  __experimentalLinkControl as LinkControl,
} from 'wp.blockEditor';
import { Popover, KeyboardShortcuts, ToolbarButton } from 'wp.components';
import { rawShortcut, displayShortcut } from 'wp.keycodes';
import { link, linkOff } from '@wordpress/icons';

export const canUseURLPicker = () => {
  return !!LinkControl;
};

const URLPicker = ({ isSelected, onChange, url, opensInNewTab, anchorRef }) => {
  const [isURLPickerOpen, setIsURLPickerOpen] = useState(false);
  const urlIsSet = !!url;
  const urlIsSetandSelected = urlIsSet && isSelected;

  const openLinkControl = () => {
    setIsURLPickerOpen(true);
    return false; // prevents default behaviour for event
  };

  const unlinkButton = () => {
    onChange({
      url: undefined,
      linkTarget: undefined,
      rel: undefined,
    });
    setIsURLPickerOpen(false);
  };

  return (
    <Fragment>
      <BlockControls group="block">
        {!urlIsSet && (
          <ToolbarButton
            name="link"
            icon={link}
            title={__('Link')}
            shortcut={displayShortcut.primary('k')}
            onClick={openLinkControl}
          />
        )}
        {urlIsSetandSelected && (
          <ToolbarButton
            name="link"
            icon={linkOff}
            title={__('Unlink')}
            shortcut={displayShortcut.primaryShift('k')}
            onClick={unlinkButton}
            isActive={true}
          />
        )}
      </BlockControls>

      {isSelected && (
        <KeyboardShortcuts
          bindGlobal
          shortcuts={{
            [rawShortcut.primary('k')]: openLinkControl,
            [rawShortcut.primaryShift('k')]: unlinkButton,
          }}
        />
      )}

      {(isURLPickerOpen || urlIsSetandSelected) && (
        <Popover
          position="bottom center"
          onClose={() => setIsURLPickerOpen(false)}
          anchorRef={anchorRef?.current}
        >
          <LinkControl
            className="wp-block-navigation-link__inline-link-input"
            value={{ url, opensInNewTab }}
            onChange={values => onChange(values)}
          />
        </Popover>
      )}
    </Fragment>
  );
};

export default URLPicker;
