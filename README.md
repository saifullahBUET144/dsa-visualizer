## Data Structure Visualizer: 🌐 https://tree-graph-algorithm-visualizer.vercel.app/

An interactive, single‑page web app to learn data structures and algorithms by seeing them in action. Build and edit structures, simulate algorithms step‑by‑step, and deep‑link to any visualizer with clean URLs.

### Live features
- Data Structures
  - Binary Tree (edit, add/delete nodes, level‑order input with null)
  - Binary Search Tree (insert from unique values, balance button)
  - Trie (build from words; end‑of‑word highlight)
  - M‑ary Tree (M between 2–10; level‑order input with null)
  - Graph (directed/undirected; Edge List or Adjacency List input; validation; drag on desktop; add/delete nodes; arrows for directed)
- Algorithms
  - Binary Search (1s step cadence, modals explain each step)
  - DFS & BFS on trees (1s step cadence, current node highlight, final OK modal with node path like root.right.left)
  - Tree Traversals (preorder/inorder/postorder) with animated output row (hidden on mobile)
- Canvas & UX
  - Pan and zoom (desktop & mobile)
  - In‑place node editing (desktop) and modal editing (mobile)
  - Toast notifications, informative About modal
  - Global Search (desktop icon + mobile menu) to jump to any DS/Algo
- Code generation
  - Generate Python code for trees and graphs (not for Trie/Algorithms)

### Smart routing (no reloads)
- Descriptive, shareable URLs:
  - Data structures: `/binarytree`, `/binarysearchtree`, `/trie`, `/marytree`, `/graph`
  - Algorithms: `/binarysearch`, `/depthfirstsearch`, `/breadthfirstsearch`, `/treetraversals`
- History API with back/forward support (hash fallback under `file://`)

## How to use

- Input formats
  - Binary Tree / M‑ary Tree: level‑order comma list with `null` (e.g., `1, 2, 3, null, 5`)
  - BST: comma list of unique numbers (e.g., `8, 3, 10, 1, 6, 14`)
  - Trie: comma list of words (case normalized)
  - Graph:
    - Edge List: `A-B, B-C, C-D`
    - Adjacency List: one per line, e.g., `A: B, C`
- Controls
  - Desktop: click nodes to edit in place; hover shows add/delete buttons
  - Mobile: tap nodes to open the node editing modal
  - Graph: toggle Directed/Undirected and Edge/Adjacency; add node (+) under each node (desktop)
- Algorithms
  - Binary Search: enter array (or Generate Default) and target, Start Simulation
  - DFS/BFS: enter tree level‑order (or Generate Default) and target, Start Simulation
  - Traversals: choose Pre/In/Post, Visualize, then Start Simulation

## Mobile support
- Traversal output row is hidden on small screens for readability
- Graph layout is tuned for mobile to avoid collinearity; node sizes and layout forces adapt

## Limits & validation
- Graph nodes: max 100; labels ≤ 3 chars
- Traversals: max 30 non‑null nodes
- BST inputs must be unique; M must be between 2–10

## Project structure

- `index.html` — Markup, Tailwind (CDN), modals, header/footer
- `style.css` — Glass/animations, canvas styles, action buttons
- `script.js` — All interactivity (visualizers, algorithms, router, search, toasts, modals)

No build step required (Tailwind via CDN).

## Deep linking and routing

- The app uses the History API to update the URL without reloads
- Back/forward buttons restore the correct view
- Under `file://`, routing transparently falls back to `#/route` style

## Keyboard & mouse

- Canvas pan: drag empty space
- Zoom: mouse wheel / trackpad
- Node drag (graph, desktop): drag a node; edges update live
- Escape: close modals (search, step modals)

## Contributing

- File an issue/PR with:
  - Clear description and repro steps
  - Screenshots/video (if UI)
  - Proposed fix or test case (if applicable)

Ideas welcome:
- Additional algorithms (Dijkstra, A*), weighted graphs
- Export/import of structures
- Module splitting (by DS/Algo) for maintainability

## License

MIT
