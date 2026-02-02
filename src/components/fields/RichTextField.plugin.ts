/**
 * Rich text field plugin definition
 */

import { FileText } from 'lucide-react';
import type { FieldPlugin } from '@/core/types/plugin';
import { RichTextFieldEditor, RichTextFieldDisplay } from './RichTextField';

export const richtextFieldPlugin: FieldPlugin = {
  type: 'richtext',
  label: 'Rich Text',
  icon: FileText,
  EditorComponent: RichTextFieldEditor,
  DisplayComponent: RichTextFieldDisplay,
  defaultValue: '',
};
