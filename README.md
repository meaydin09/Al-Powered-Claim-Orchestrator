# Sovereign AI-Powered Claim Orchestrator

This project is a high-performance, mobile-first insurance claim tracking dashboard designed to reduce call center volume through proactive information hierarchy and AI-driven insights.

## 🚀 Design Strategy & Architectural Decisions

### 1. Polymorphic UI (Registry Pattern)
The core challenge of the case study was handling a heterogeneous array of `processDetails` where each node has a different data shape based on its `title`. 
- **Solution**: Implemented a **Registry Pattern** in `lib/registry.ts`.
- **Benefit**: This avoids messy `if/else` or `switch` clusters in the UI. Adding a new step type is as simple as creating a component and registering it.

### 2. State-of-the-Art State Management
- **Zustand**: Used for managing global orchestration state. It provides a lightweight alternative to Redux, perfect for handling dynamic node insertion/removal without performance overhead.
- **TanStack React Query**: Used for server-state management, ensuring the "3-second response" rule is met through efficient data fetching and caching.

### 3. Bulletproof Validation
- **Zod**: Every piece of data from the API and user input is validated against strict schemas. This ensures the polymorphic UI never receives unexpected data shapes, significantly reducing runtime errors.

### 4. Experience & Aesthetics
- **Mobile-First Sidebar/Drawer**: AI insights open as a bottom drawer on mobile and a fixed sidebar on desktop, maintaining UX consistency across devices.
- **Dynamic Node Management**: Users can inject "Information Notes" and "Attachments" anywhere in the timeline, which are stored in the global state.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Validation**: Zod
- **State**: Zustand + React Query
- **Animations**: tw-animate-css

## 🤖 AI Tools Usage
This project was developed with the assistance of **Antigravity (Google DeepMind)**. 
- **Code Assistance**: Used for generating boilerplate for complex Tailwind layouts and Zod schemas.
- **Refactoring**: Used to automate the migration of inline AI boxes to the portal-based sidebar architecture.
- **Logic**: Helped in designing the splice-based dynamic node insertion logic in Zustand.

## 📈 Future Improvements (With More Time)
1. **Real-time Synchronization**: Implement WebSockets or SSE to show "Live" orchestration updates as they happen background.
2. **Persistence**: Connect the Zustand store to a backend database or at least `localStorage` for session persistence.
3. **Advanced AI Validation**: Integrate a real OCR/Vision API for the "Document Analyzer" node instead of the current simulation.
4. **Enhanced Transitions**: Sophisticated page transitions and "Staggered" animations for the timeline cards using Framer Motion.
5. **i18n Support**: Full multi-language support (TR/EN) to cater to a broader user base as per typical insurance standards.

---
*Created for the Technical Case Study Challenge*
