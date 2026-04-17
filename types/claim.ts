import { z } from "zod";
import {
  ClaimSchema,
  ProcessNodeSchema,
  BaseNodeSchema,
  TowingNodeSchema,
  ClaimNotificationNodeSchema,
  AppraisalNodeSchema,
  SubstituteRentalNodeSchema,
  FileReviewNodeSchema,
  DeductionNodeSchema,
  PaymentNodeSchema,
  ClosedNodeSchema,
  DynamicNoteNodeSchema,
  DynamicAttachmentNodeSchema,
  UnknownNodeSchema
} from "@/lib/schemas";

export type ClaimData = z.infer<typeof ClaimSchema>;
export type ProcessNode = z.infer<typeof ProcessNodeSchema>;
export type BaseNode = z.infer<typeof BaseNodeSchema>;

// Individual Node Types
export type TowingNode = z.infer<typeof TowingNodeSchema>;
export type ClaimNotificationNode = z.infer<typeof ClaimNotificationNodeSchema>;
export type AppraisalNode = z.infer<typeof AppraisalNodeSchema>;
export type SubstituteRentalNode = z.infer<typeof SubstituteRentalNodeSchema>;
export type FileReviewNode = z.infer<typeof FileReviewNodeSchema>;
export type DeductionNode = z.infer<typeof DeductionNodeSchema>;
export type PaymentNode = z.infer<typeof PaymentNodeSchema>;
export type ClosedNode = z.infer<typeof ClosedNodeSchema>;
export type DynamicNoteNode = z.infer<typeof DynamicNoteNodeSchema>;
export type DynamicAttachmentNode = z.infer<typeof DynamicAttachmentNodeSchema>;
export type UnknownNode = z.infer<typeof UnknownNodeSchema>;