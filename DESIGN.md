# Design System Document: The Sovereign Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Private Bank"**

This design system moves beyond the utility of a standard dashboard into the realm of high-end editorial experiences. For insurance, "trust" is not merely the absence of error; it is the presence of authority and calm. We achieve this through **Organic Precision**—a layout strategy that favors generous breathing room, intentional asymmetry, and a rejection of the "boxed-in" web. 

By utilizing the "Editorial Grid," we allow content to flow across layers of depth. We move away from the rigid, line-heavy interfaces of the past decade and toward a tactile, "physical" UI where importance is signaled through light, tone, and sophisticated typography rather than borders and boxes.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, oceanic Navy (`primary`) to establish immediate gravity, supported by a system of "intelligent neutrals" that define the workspace.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
*   **The Method:** Boundaries must be defined solely through background color shifts. Use `surface-container-low` for large section backgrounds and `surface-container-lowest` (Pure White) for active interactive cards.
*   **The Result:** A layout that feels "carved" from a single block rather than assembled from wireframe parts.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers:
1.  **Base Layer:** `surface` (#f8f9ff) – The infinite canvas.
2.  **Sectional Layer:** `surface-container-low` (#eff4ff) – Used to group large modules (e.g., a side panel or a secondary data grouping).
3.  **Active Layer:** `surface-container-lowest` (#ffffff) – Reserved for the highest-priority interactive cards and input areas.
4.  **Floating Layer:** `surface-bright` – Used for modals and tooltips, always accompanied by an ambient shadow.

### The "Glass & Gradient" Rule (AI Features)
For AI-enhanced insurance insights, use the `tertiary` (#040057) and `tertiary-container` (#0d0093) tokens. To distinguish AI from standard data:
*   **Backdrop Blur:** Use a `surface-variant` color at 60% opacity with a `24px` backdrop blur.
*   **Soulful Gradients:** CTAs for AI actions should utilize a subtle linear gradient from `primary` (#091426) to `tertiary-container` (#0d0093) at a 135-degree angle.

---

## 3. Typography: The Editorial Scale
We pair **Manrope** (Display/Headlines) with **Inter** (UI/Body) to create a "Newsroom meets FinTech" aesthetic.

*   **Display-LG to Headline-SM (Manrope):** These are your "Statement" tiers. Use `on-background` (#0b1c30) with tight letter-spacing (-0.02em). These should feel authoritative and immutable.
*   **Title-LG to Body-SM (Inter):** These are your "Utility" tiers. Use `on-surface-variant` (#45474c) for secondary descriptions to ensure the eye hits the headlines first.
*   **Label-MD (Inter Bold):** Use for high-trust micro-copy (e.g., "Policy Active"). Use `primary` or `secondary` (#006c49) for these to ensure they act as anchors in a dense data environment.

---

## 4. Elevation & Depth

### The Layering Principle
Avoid "Drop Shadows" as a default. Instead, achieve lift by stacking surface tiers. A `surface-container-lowest` card sitting on a `surface-container-low` background provides enough contrast for the eye to perceive depth without visual clutter.

### Ambient Shadows
When a component must float (e.g., a "New Claim" button), use an **Ambient Shadow**:
*   **Color:** `on-surface` (#0b1c30) at 4% - 6% opacity.
*   **Blur:** 32px to 64px.
*   **Spread:** -4px.
*   *Note: Never use pure black (#000) for shadows; always tint them with the primary navy to maintain tonal harmony.*

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., in high-contrast modes), use `outline-variant` (#c5c6cd) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Interaction

### Buttons
*   **Primary:** `primary` (#091426) background with `on-primary` (#ffffff) text. Use `xl` (0.75rem) roundedness. No border.
*   **Secondary:** `surface-container-high` background. This should feel like a "recessed" button rather than a floating one.
*   **AI Action:** Gradient of `tertiary` to `primary_container`. Use a subtle 1px "inner glow" using `tertiary_fixed` at 30% opacity.

### Input Fields
*   **Style:** Minimalist. No bottom line or full box. Use `surface-container-low` as the field background with a `md` (0.375rem) corner radius.
*   **Focus State:** Transition the background to `surface-container-lowest` and add a 2px "ring" of `primary_fixed_dim`.

### Cards & Lists
*   **Forbid Dividers:** Use `8px`, `16px`, or `24px` of vertical white space to separate list items.
*   **Status Indicators:** Use `secondary` (#006c49) for "Completed" and `amber` (#f59e0b) for "In-Progress." These should be small, high-saturation "pills" using `label-sm` typography.

### AI Feature Chips
*   **Visual Style:** Use `tertiary_container` with a glassmorphism effect. These should appear to "shimmer" slightly when hovered, using a transition from `tertiary_fixed` to `tertiary_fixed_dim`.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts. A 3-column grid where the center column is wider feels more "designed" than three equal boxes.
*   **Do** use `surface-dim` (#cbdbf5) for footer areas or low-priority background segments to anchor the page.
*   **Do** prioritize "Glanceability." Use `display-sm` for the most important number on the screen (e.g., total coverage value).

### Don't
*   **Don't** use 100% opaque borders. They create "visual noise" that erodes trust in the sophistication of the tool.
*   **Don't** use standard "Success Green" (#00FF00). Only use the specified Emerald `secondary` (#006c49) to maintain the premium palette.
*   **Don't** crowd the edges. If a card has 24px of padding, the gap between cards should be at least 32px.