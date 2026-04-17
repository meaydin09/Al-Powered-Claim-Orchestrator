import { getNodeComponent } from "@/lib/registry";
import { ProcessNode } from "@/types/claim";

export default function NodeRenderer({ node, index }: { node: ProcessNode; index: number }) {
    const Component = getNodeComponent(node.title);
    return <Component node={node as any} index={index} />;
}