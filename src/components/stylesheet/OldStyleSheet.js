/**
 * OldStyleSheet - A frozen copy of the StyleSheet component that uses the
 * old (buggy) ensureValueUnit logic. Used exclusively by deprecated block
 * versions to match old saved content so WordPress can migrate blocks.
 *
 * DO NOT MODIFY - this must reproduce the exact output of the old code.
 */
import { sprintf } from 'wp.i18n';

import {
  isSpacingRule,
  getSpacingProperty,
  replaceBetweenCurly,
  isBackgroundImageRuleValue,
  defaultGetStylesArrayFromChildren,
  getFlattenedRulesBreakpoint,
  defaultGenerateStyles,
  stylesArrayIsEmpty,
} from './helpers';
import {
  getMarginSettingStyles,
  hasAllSpacingSettings,
} from '../controls/margin-controls/margin-settings';

/**
 * Old (buggy) ensureValueUnit - frozen copy of the original.
 * Bug: Would append providedUnit even if value already had a unit
 * (e.g. "1.75rem" + "px" → "1.75rempx"), and would add "px" to
 * numeric values when providedUnit was "" (e.g. "1.3" + "" → "1.3px").
 */
const oldEnsureValueUnit = (value, providedUnit = '') => {
  if (providedUnit) {
    return { value, unit: providedUnit };
  }

  const valueStr = String(value).trim();

  const hasUnit = /^-?\d*\.?\d+\s*(px|rem|em|%|vh|vw|vmin|vmax|pt|cm|mm|in|pc|ex|ch)$/i.test(
    valueStr,
  );

  if (hasUnit) {
    return { value: valueStr, unit: '' };
  }

  const isNumeric = /^-?\d*\.?\d+$/.test(valueStr);

  if (isNumeric) {
    return { value: valueStr, unit: 'px' };
  }

  return { value: valueStr, unit: '' };
};

const oldGetCSSRule = ({ id, value, rule, unit = '', edgeCase }) => {
  if (value == null || value === '') {
    return null;
  }

  const base = (() => {
    if (rule.includes('[root]')) {
      return rule.replace('[root]', id);
    }

    return `.${id} ${rule}`;
  })();

  if (isSpacingRule(rule)) {
    if (hasAllSpacingSettings(value) && rule !== 'position') {
      const spacingStyles = getMarginSettingStyles(value);

      return spacingStyles && sprintf(base, spacingStyles);
    } else {
      const val = ['top', 'right', 'bottom', 'left']
        .map(pos => {
          const property = getSpacingProperty(rule);

          if (value[pos] != null && value[pos] !== '') {
            const { value: finalVal, unit: finalUnit } = oldEnsureValueUnit(
              value[pos],
              unit,
            );
            const finalValue = `${finalVal}${finalUnit}`;
            return property === 'position'
              ? `${pos}: ${finalValue};`
              : `${property}-${pos}: ${finalValue};`;
          }
        })
        .join(' ');

      return !!val.trim() ? replaceBetweenCurly(base, ` ${val} `) : undefined;
    }
  }

  if (isBackgroundImageRuleValue(value)) {
    if (!value.url) {
      return undefined;
    }

    const backgroundImageStyle = [
      `background-image: url(${value.url});`,
      `background-repeat: ${value.repeat};`,
      `background-size: ${value.size};`,
      `background-position: ${value.position};`,
      `background-attachment: ${value.attachment};`,
    ].join(' ');

    return sprintf(base, backgroundImageStyle);
  }

  if (edgeCase && edgeCase.edge === value) {
    return sprintf(base, edgeCase.value);
  }

  const { value: finalValue, unit: finalUnit } = oldEnsureValueUnit(
    value,
    unit,
  );
  return sprintf(base, `${finalValue}${finalUnit}`);
};

const OldStyleSheet = ({ id = '', children }) => {
  const stylesArray = defaultGetStylesArrayFromChildren({
    id,
    children,
    getCSSRule: oldGetCSSRule,
    mapper: getFlattenedRulesBreakpoint,
  });

  if (stylesArrayIsEmpty(stylesArray)) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{ __html: defaultGenerateStyles(stylesArray) }}
    />
  );
};

export default OldStyleSheet;
