/**
 * Media field plugin definition
 */

import { Image } from 'lucide-react';
import type { FieldPlugin } from '@/core/types/plugin';
import { MediaFieldEditor, MediaFieldDisplay } from './MediaField';

export const mediaFieldPlugin: FieldPlugin = {
  type: 'media',
  label: 'Media',
  icon: Image,
  EditorComponent: MediaFieldEditor,
  DisplayComponent: MediaFieldDisplay,
  defaultValue: null,
};
