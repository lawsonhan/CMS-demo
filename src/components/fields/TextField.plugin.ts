/**
 * Text field plugin definition
 */

import { Type } from 'lucide-react';
import type { FieldPlugin } from '@/core/types/plugin';
import { TextFieldEditor, TextFieldDisplay } from './TextField';

export const textFieldPlugin: FieldPlugin = {
  type: 'text',
  label: 'Text',
  icon: Type,
  EditorComponent: TextFieldEditor,
  DisplayComponent: TextFieldDisplay,
  defaultValue: '',
  validate: (value, config) => {
    if (config?.required && !value) {
      return 'This field is required';
    }
    return true;
  },
};
