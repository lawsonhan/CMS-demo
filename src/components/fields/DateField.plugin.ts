/**
 * Date field plugin definition
 */

import { Calendar } from 'lucide-react';
import type { FieldPlugin } from '@/core/types/plugin';
import { DateFieldEditor, DateFieldDisplay } from './DateField';

export const dateFieldPlugin: FieldPlugin = {
  type: 'date',
  label: 'Date',
  icon: Calendar,
  EditorComponent: DateFieldEditor,
  DisplayComponent: DateFieldDisplay,
  defaultValue: null,
  validate: (value, config) => {
    if (config?.required && !value) {
      return 'This field is required';
    }
    return true;
  },
};
