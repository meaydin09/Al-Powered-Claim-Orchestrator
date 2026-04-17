import { z } from "zod";

export const BaseNodeSchema = z.object({
  title: z.string(),
  status: z.string(),
});

export const TowingNodeSchema = BaseNodeSchema.extend({
  title: z.literal("Towing Service"),
  pickupLocation: z.string(),
  towingDate: z.string(),
});

export const ClaimNotificationNodeSchema = BaseNodeSchema.extend({
  title: z.literal("Claim Notification"),
  dateTime: z.string(),
  reportType: z.string(),
  reasonForDamage: z.string(),
  reportingParty: z.string(),
  contact: z.string(),
});

export const AppraisalNodeSchema = BaseNodeSchema.extend({
  title: z.literal("Appraisal"),
  expertAssignmentDate: z.string(),
  expertinfo: z.string(),
  contact: z.string(),
});

export const SubstituteRentalNodeSchema = BaseNodeSchema.extend({
  title: z.literal("Substitute Rental Vehicle"),
  vehicleDuration: z.string(),
  vehicleModel: z.string(),
  extraDuration: z.string(),
});

export const FileReviewNodeSchema = BaseNodeSchema.extend({
  title: z.literal("File Review"),
  reviewReferralDate: z.string(),
  reviewCompletionDate: z.string().optional(),
});

export const DeductionNodeSchema = BaseNodeSchema.extend({
  title: z.literal("Deduction Reason"),
  actionRequired: z.string().optional(),
  occupationalDeduction: z.string(),
  appreciationDeduction: z.string(),
  policyDeductible: z.string(),
  nonDamageAmount: z.string(),
});

export const PaymentNodeSchema = BaseNodeSchema.extend({
  title: z.literal("Payment Information"),
  paidTo: z.string(),
  iban: z.string(),
  paymentAmount: z.string(),
  note: z.string().optional(),
});

export const ClosedNodeSchema = BaseNodeSchema.extend({
  title: z.literal("Closed"),
  completionDate: z.string(),
});

// Dynamic Node Schema for user-added nodes
export const DynamicNoteNodeSchema = BaseNodeSchema.extend({
  title: z.literal("Information Note"),
  noteContent: z.string(),
  addedAt: z.string(),
  isDynamic: z.literal(true).default(true),
});

export const DynamicAttachmentNodeSchema = BaseNodeSchema.extend({
  title: z.literal("Additional Attachment"),
  fileName: z.string(),
  fileSize: z.string(),
  fileType: z.string(),
  addedAt: z.string(),
  isDynamic: z.literal(true).default(true),
});

export const UnknownNodeSchema = z.object({
  title: z.literal("Unknown Step"),
  status: z.string(),
  _raw: z.any(),
});

// Using discriminated union based on "title" for polymorphic nodes
export const ProcessNodeSchema = z.discriminatedUnion("title", [
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
  UnknownNodeSchema,
]).catch((ctx) => {
    // Fallback for unknown nodes
    return {
        title: "Unknown Step",
        status: "Unknown",
        _raw: ctx.input
    };
});

export const ClaimSchema = z.object({
  title: z.string(),
  fileNo: z.string(),
  estimatedRemainingTime: z.string(),
  currentStatus: z.string(),
  processDetails: z.array(ProcessNodeSchema),
});