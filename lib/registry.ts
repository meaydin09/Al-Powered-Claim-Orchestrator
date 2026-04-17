import TowingNode from "../components/nodes/TowingNode";
import FileReviewNode from "../components/nodes/FileReviewNode";
import DeductionNode from "../components/nodes/DeductionNode";
import DefaultNode from "../components/nodes/DefaultNode";
import ClaimNotificationNode from "../components/nodes/ClaimNotificationNode";
import AppraisalNode from "../components/nodes/AppraisalNode";
import RentalNode from "../components/nodes/RentalNode";
import PaymentNode from "../components/nodes/PaymentNode";
import ClosedNode from "../components/nodes/ClosedNode";
import NoteNode from "../components/nodes/NoteNode";
import AttachmentNode from "../components/nodes/AttachmentNode";
import React from "react";

// Relative paths instead of @/ can sometimes fix IDE "module not found" errors
export const nodeRegistry: Record<string, React.ComponentType<any>> = {
    "Towing Service": TowingNode,
    "Claim Notification": ClaimNotificationNode,
    "Appraisal": AppraisalNode,
    "Substitute Rental Vehicle": RentalNode,
    "File Review": FileReviewNode,
    "Deduction Reason": DeductionNode,
    "Payment Information": PaymentNode,
    "Closed": ClosedNode,
    "Information Note": NoteNode,
    "Additional Attachment": AttachmentNode,
};

export const getNodeComponent = (title: string): React.ComponentType<any> => {
    return nodeRegistry[title] || DefaultNode;
};