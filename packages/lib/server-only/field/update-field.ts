import { prisma } from '@documenso/prisma';
import type { FieldType, Team } from '@documenso/prisma/client';
import type { FieldMeta } from '@documenso/ui/primitives/document-flow/field-item-advanced-settings';

import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs';
import type { RequestMetadata } from '../../universal/extract-request-metadata';
import { createDocumentAuditLogData, diffFieldChanges } from '../../utils/document-audit-logs';

export type UpdateFieldOptions = {
  fieldId: number;
  documentId: number;
  userId: number;
  teamId?: number;
  recipientId?: number;
  type?: FieldType;
  pageNumber?: number;
  pageX?: number;
  pageY?: number;
  pageWidth?: number;
  pageHeight?: number;
  requestMetadata?: RequestMetadata;
  fieldMeta?: FieldMeta;
};

export const updateField = async ({
  fieldId,
  documentId,
  userId,
  teamId,
  recipientId,
  type,
  pageNumber,
  pageX,
  pageY,
  pageWidth,
  pageHeight,
  requestMetadata,
  fieldMeta,
}: UpdateFieldOptions) => {
  const oldField = await prisma.field.findFirstOrThrow({
    where: {
      id: fieldId,
      Document: {
        id: documentId,
        ...(teamId
          ? {
              team: {
                id: teamId,
                members: {
                  some: {
                    userId,
                  },
                },
              },
            }
          : {
              userId,
              teamId: null,
            }),
      },
    },
  });

  const field = prisma.$transaction(async (tx) => {
    const updatedField = await tx.field.update({
      where: {
        id: fieldId,
      },
      data: {
        recipientId,
        type,
        page: pageNumber,
        positionX: pageX,
        positionY: pageY,
        width: pageWidth,
        height: pageHeight,
        fieldMeta,
      },
      include: {
        Recipient: true,
      },
    });

    await tx.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.FIELD_UPDATED,
        documentId,
        user: {
          id: team?.id ?? user.id,
          email: team?.name ?? user.email,
          name: team ? '' : user.name,
        },
        data: {
          fieldId: updatedField.secondaryId,
          fieldRecipientEmail: updatedField.Recipient?.email ?? '',
          fieldRecipientId: recipientId ?? -1,
          fieldType: updatedField.type,
          changes: diffFieldChanges(oldField, updatedField),
        },
        requestMetadata,
      }),
    });

    return updatedField;
  });

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  let team: Team | null = null;

  if (teamId) {
    team = await prisma.team.findFirst({
      where: {
        id: teamId,
        members: {
          some: {
            userId,
          },
        },
      },
    });
  }

  return field;
};
