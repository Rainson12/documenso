'use client';

import { forwardRef, useState } from 'react';

import { z } from 'zod';

import { FieldType } from '@documenso/prisma/client';
import { Label } from '@documenso/ui/primitives/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@documenso/ui/primitives/select';
import { Switch } from '@documenso/ui/primitives/switch';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { Input } from '../input';
import type { FieldFormType } from './add-fields';
import {
  DocumentFlowFormContainerActions,
  DocumentFlowFormContainerContent,
  DocumentFlowFormContainerFooter,
  DocumentFlowFormContainerHeader,
} from './document-flow-root';
import { FieldItem } from './field-item';

export type FieldAdvancedSettingsProps = {
  title: string;
  description: string;
  field: FieldFormType;
  fields: FieldFormType[];
  onAdvancedSettings?: () => void;
  isDocumentPdfLoaded: boolean;
  onSave?: (fieldState: FieldMeta) => void;
};

export type FieldMeta = {
  label?: string;
  placeholder?: string;
  format?: string;
  characterLimit?: number;
  required?: boolean;
  readOnly?: boolean;
};

// TODO: Remove hardcoded values and refactor
const listValues = [
  {
    label: '123,456.78',
    value: '123,456.78',
  },
  {
    label: '123.456,78',
    value: '123.456,78',
  },
];

const defaultConfigSchema = z.object({
  label: z.string(),
  placeholder: z.string(),
  format: z.string(),
  characterLimit: z.number(),
  required: z.boolean(),
  readOnly: z.boolean(),
});

export const FieldAdvancedSettings = forwardRef<HTMLDivElement, FieldAdvancedSettingsProps>(
  ({ title, description, field, fields, onAdvancedSettings, isDocumentPdfLoaded, onSave }, ref) => {
    const { toast } = useToast();
    const localStorageKey = `field_${field.formId}_${field.type}`;

    const defaultState: FieldMeta = {
      label: '',
      placeholder: '',
      format: '',
      characterLimit: 0,
      required: false,
      readOnly: false,
    };

    const [fieldState, setFieldState] = useState<FieldMeta>(() => {
      const savedState = localStorage.getItem(localStorageKey);
      return savedState ? { ...defaultState, ...JSON.parse(savedState) } : defaultState;
    });

    const handleFieldChange = (key: keyof FieldMeta, value: string) => {
      setFieldState((prevState: FieldMeta) => {
        if (key === 'characterLimit') {
          const parsedValue = Number(value);

          return {
            ...prevState,
            [key]: isNaN(parsedValue) ? undefined : parsedValue,
          };
        } else {
          return {
            ...prevState,
            [key]: value,
          };
        }
      });
    };

    const handleToggleChange = (key: keyof FieldMeta) => {
      setFieldState((prevState: FieldMeta) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    };

    const numberField = field.type === FieldType.NUMBER;

    const handleOnGoNextClick = () => {
      const validation = defaultConfigSchema.safeParse(fieldState);

      if (!validation.success) {
        toast({
          title: 'Error',
          description: 'An error occurred while saving the field.',
          variant: 'destructive',
        });

        return;
      } else {
        try {
          localStorage.setItem(localStorageKey, JSON.stringify(fieldState));

          onSave?.(fieldState);
          onAdvancedSettings?.();
        } catch (error) {
          console.error('Failed to save to localStorage:', error);

          toast({
            title: 'Error',
            description: 'Failed to save settings.',
            variant: 'destructive',
          });
        }
      }
    };

    return (
      <div ref={ref} className="flex h-full flex-col">
        <DocumentFlowFormContainerHeader title={title} description={description} />
        <DocumentFlowFormContainerContent>
          <div className="-mt-4 flex flex-col gap-4">
            {isDocumentPdfLoaded &&
              fields.map((field, index) => (
                <span key={index} className="opacity-75 active:pointer-events-none">
                  <FieldItem key={index} field={field} disabled={true} />
                </span>
              ))}

            <div>
              <Label>Label</Label>
              <Input
                id="label"
                className="bg-background mt-2"
                placeholder="Field label"
                value={fieldState.label}
                onChange={(e) => handleFieldChange('label', e.target.value)}
              />
            </div>

            <div>
              <Label>Placeholder</Label>
              <Input
                id="placeholder"
                className="bg-background mt-2"
                placeholder="Field placeholder"
                value={fieldState.placeholder}
                onChange={(e) => handleFieldChange('placeholder', e.target.value)}
              />
            </div>

            {numberField && (
              <>
                <div className="flex flex-col gap-2">
                  <Label>Format</Label>
                  <Select>
                    <SelectTrigger className="text-muted-foreground w-full">
                      <SelectValue placeholder="Field format" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {listValues.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Character Limit</Label>
                  <Input
                    id="characterLimit"
                    className="bg-background mt-2"
                    placeholder="Field character limit"
                    value={fieldState.characterLimit}
                    onChange={(e) => handleFieldChange('characterLimit', e.target.value)}
                  />
                </div>

                <div className="flex flex-row items-center gap-12">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Label>Required field?</Label>
                    <Switch
                      className="bg-background"
                      checked={fieldState.required}
                      onChange={() => handleToggleChange('required')}
                      onClick={() => handleToggleChange('required')}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Label>Read only?</Label>
                    <Switch
                      className="bg-background"
                      checked={fieldState.readOnly}
                      onChange={() => handleToggleChange('readOnly')}
                      onClick={() => handleToggleChange('readOnly')}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </DocumentFlowFormContainerContent>
        <DocumentFlowFormContainerFooter className="mt-auto">
          <DocumentFlowFormContainerActions
            goNextLabel="Save"
            goBackLabel="Cancel"
            onGoBackClick={onAdvancedSettings}
            onGoNextClick={handleOnGoNextClick}
          />
        </DocumentFlowFormContainerFooter>
      </div>
    );
  },
);

FieldAdvancedSettings.displayName = 'FieldAdvancedSettings';