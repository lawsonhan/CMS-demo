/**
 * Number field plugin definition
 */

import { Hash } from 'lucide-react';
import type { FieldPlugin } from '@/core/types/plugin';
import { NumberFieldEditor, NumberFieldDisplay } from './NumberField';

export const numberFieldPlugin: FieldPlugin = {
  type: 'number',
  label: 'Number',
  icon: Hash,
  EditorComponent: NumberFieldEditor,
  DisplayComponent: NumberFieldDisplay,
  defaultValue: null,
  validate: (value, config) => {
    if (config?.required && value == null) {
      return 'This field is required';
    }
    return true;
  },
};
