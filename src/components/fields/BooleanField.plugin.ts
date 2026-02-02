/**
 * Boolean field plugin definition
 */

import { ToggleLeft } from 'lucide-react';
import type { FieldPlugin } from '@/core/types/plugin';
import { BooleanFieldEditor, BooleanFieldDisplay } from './BooleanField';

export const booleanFieldPlugin: FieldPlugin = {
  type: 'boolean',
  label: 'Boolean',
  icon: ToggleLeft,
  EditorComponent: BooleanFieldEditor,
  DisplayComponent: BooleanFieldDisplay,
  defaultValue: false,
};
