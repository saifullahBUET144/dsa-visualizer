document.addEventListener('DOMContentLoaded', () => {
    // Page elements
    const homePage = document.getElementById('home-page');
    const visualizerPage = document.getElementById('visualizer-page');
    const visualizerTitle = document.getElementById('visualizer-title');
    const backBtn = document.getElementById('back-btn');
    const cards = document.querySelectorAll('.card');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const visualizerInfoBtn = document.getElementById('visualizer-info-btn');

    // Visualizer controls
    const inputDescription = document.getElementById('input-description');
    const treeInput = document.getElementById('tree-input');
    const inputHelper = document.getElementById('input-helper');
    const visualizeBtn = document.getElementById('visualize-btn');
    const balanceBstBtn = document.getElementById('balance-bst-btn');
    const generatePyBtn = document.getElementById('generate-py-btn');
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = document.getElementById('canvas');

    // Modal elements
    const codeModal = document.getElementById('code-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const pythonCodeDetailed = document.getElementById('python-code-detailed');
    const pythonCodeOneliner = document.getElementById('python-code-oneliner');
    const copyDetailedBtn = document.getElementById('copy-detailed-btn');
    const copyOnelinerBtn = document.getElementById('copy-oneliner-btn');
    const aboutModal = document.getElementById('about-modal');
    const homeAboutBtn = document.getElementById('home-about-btn');
    const mobileAboutBtn = document.getElementById('mobile-about-btn');
    const homeSearchBtn = document.getElementById('home-search-btn');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const closeAboutModalBtn = document.getElementById('close-about-modal');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchResults = document.getElementById('search-results');
    const toastContainer = document.getElementById('toast-container');
    const algoStepModal = document.getElementById('algo-step-modal');
    const algoStepModalContent = document.getElementById('algo-step-modal-content');
    const mValueContainer = document.getElementById('m-value-container');
    const mValueInput = document.getElementById('m-value-input');
    const addMaryChildBtn = document.getElementById('add-mary-child-btn');
    const graphControls = document.getElementById('graph-controls');
    const undirectedBtn = document.getElementById('undirected-btn');
    const directedBtn = document.getElementById('directed-btn');
    const edgeListBtn = document.getElementById('edge-list-btn');
    const adjacencyListBtn = document.getElementById('adjacency-list-btn');
    // Algorithm controls
    const algoTargetContainer = document.getElementById('algo-target-container');
    const algoTargetInput = document.getElementById('algo-target-input');
    const generateDefaultArrayBtn = document.getElementById('generate-default-array-btn');
    const startSimulationBtn = document.getElementById('start-simulation-btn');
    const traversalControls = document.getElementById('traversal-controls');
    const preorderBtn = document.getElementById('preorder-btn');
    const inorderBtn = document.getElementById('inorder-btn');
    const postorderBtn = document.getElementById('postorder-btn');
    
    // DS Info Modal elements
    const dsInfoModal = document.getElementById('ds-info-modal');
    const dsInfoTitle = document.getElementById('ds-info-title');
    const dsInfoContent = document.getElementById('ds-info-content');
    const closeDsInfoModalBtn = document.getElementById('close-ds-info-modal');

    // Node Edit Modal elements
    const nodeEditModal = document.getElementById('node-edit-modal');
    const closeNodeModalBtn = document.getElementById('close-node-modal-btn');
    const nodeValueInput = document.getElementById('node-value-input');
    const addLeftChildBtn = document.getElementById('add-left-child-btn');
    const addRightChildBtn = document.getElementById('add-right-child-btn');
    const deleteNodeBtn = document.getElementById('delete-node-btn');
    const saveNodeBtn = document.getElementById('save-node-btn');
    const addChildrenButtons = document.getElementById('add-children-buttons');

    let currentTreeType = null;
    let currentRoot = null;
    let currentlyEditingNode = null;
    let currentMValue = 3;
    let currentGraph = null;
    let isDirectedGraph = false;
    let isEdgeListFormat = true;
    let currentAlgorithm = null; // e.g., 'BINARY_SEARCH'
    let currentArray = [];

    // --- Pan and Zoom State ---
    let scale = 1, translateX = 0, translateY = 0, isPanning = false, startX, startY;
    let masterGroup = null;
    
    // --- Graph Drag State ---
    let isDraggingNode = false;
    let draggedGraphNode = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let didDragNode = false;

    // --- Utility ---
    const isMobile = () => window.innerWidth <= 768;

    // --- Data Structure Information ---
    const dsInfoData = {
        BT: {
            title: `<i class="fa-solid fa-code-branch text-cyan-400 mr-3"></i>Binary Tree`,
            content: `
                <p>A <strong>Binary Tree</strong> is a hierarchical data structure where each node has at most two children, referred to as the left child and the right child. It's a foundational structure used to implement more complex trees.</p>
                <h4 class="font-semibold text-slate-100 mt-4">Use Cases:</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>Used in expression trees for evaluating arithmetic expressions.</li>
                    <li>Forms the basis for more advanced structures like Binary Search Trees, heaps, and syntax trees in compilers.</li>
                    <li>Represents hierarchical data, such as file systems.</li>
                </ul>
                <h4 class="font-semibold text-slate-100 mt-4">Input Format:</h4>
                <p>Provide numbers in <strong>level-order traversal</strong>, separated by commas. Use the word <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">null</code> to represent an empty spot where a node could be.</p>
                <p><strong>Example:</strong> <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">8, 3, 10, 1, 6, null, 14</code></p>
            `
        },
        BST: {
            title: `<i class="fa-solid fa-code-fork text-cyan-400 mr-3"></i>Binary Search Tree`,
            content: `
                <p>A <strong>Binary Search Tree (BST)</strong> is a special type of binary tree with a specific ordering property: for any given node, all values in its left subtree are less than the node's value, and all values in its right subtree are greater than or equal to the node's value.</p>
                <h4 class="font-semibold text-slate-100 mt-4">Use Cases:</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>Extremely efficient for searching, insertion, and deletion operations (average time complexity of O(log n)).</li>
                    <li>Used to implement dynamic sets and lookup tables (e.g., dictionaries or maps).</li>
                    <li>Can be used to naturally sort items by performing an in-order traversal.</li>
                </ul>
                <h4 class="font-semibold text-slate-100 mt-4">Input Format:</h4>
                <p>Provide a list of unique numbers separated by commas. The visualizer will automatically construct the BST by inserting the numbers in the given order.</p>
                <p><strong>Example:</strong> <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">8, 3, 10, 1, 6, 14, 4, 7, 13</code></p>
            `
        },
        TRIE: {
            title: `<i class="fa-solid fa-arrow-down-a-z text-cyan-400 mr-3"></i>Trie (Prefix Tree)`,
            content: `
                <p>A <strong>Trie</strong>, also known as a prefix tree, is a tree-like data structure that specializes in storing and retrieving strings. Each node represents a character, and paths from the root to a node represent prefixes. Nodes marking the end of a complete word are highlighted.</p>
                <h4 class="font-semibold text-slate-100 mt-4">Use Cases:</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>Autocomplete and search suggestions in search engines and text editors.</li>
                    <li>Spell checkers and auto-correct features.</li>
                    <li>IP routing tables for efficient prefix matching.</li>
                </ul>
                <h4 class="font-semibold text-slate-100 mt-4">Input Format:</h4>
                <p>Provide words separated by commas. The case will be standardized to lowercase.</p>
                <p><strong>Example:</strong> <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">apple, app, apply, apt, ape</code></p>
            `
        },

        MARY: {
            title: `<i class="fa-solid fa-sitemap text-cyan-400 mr-3"></i>M-ary Tree`,
            content: `
                <p>An <strong>M-ary Tree</strong> is a generalization of a binary tree where each node can have up to M children. When M=2, it becomes a binary tree. This structure is useful for representing hierarchical data with variable branching factors.</p>
                <h4 class="font-semibold text-slate-100 mt-4">Use Cases:</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>File systems where directories can contain multiple subdirectories.</li>
                    <li>Organization charts with multiple direct reports.</li>
                    <li>Game trees in AI for games with multiple possible moves.</li>
                    <li>B-trees and B+ trees (special cases) used in databases and file systems.</li>
                </ul>
                <h4 class="font-semibold text-slate-100 mt-4">Input Format:</h4>
                <p>First, set the M value (maximum children per node). Then provide numbers in <strong>level-order traversal</strong>, separated by commas. Use <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">null</code> for empty child positions.</p>
                <p><strong>Example (M=3):</strong> <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">1, 2, 3, 4, 5, 6, 7, null, 8</code></p>
            `
        },
        GRAPH: {
            title: `<i class="fa-solid fa-project-diagram text-cyan-400 mr-3"></i>Graph`,
            content: `
                <p>A <strong>Graph</strong> is a data structure consisting of a finite set of vertices (nodes) together with a set of edges connecting pairs of vertices. Graphs can be directed (edges have direction) or undirected (edges have no direction).</p>
                <h4 class="font-semibold text-slate-100 mt-4">Use Cases:</h4>
                <ul class="list-disc list-inside space-y-1">
                    <li>Social networks and friend connections.</li>
                    <li>Road networks and navigation systems.</li>
                    <li>Computer networks and routing algorithms.</li>
                    <li>Dependency graphs in software systems.</li>
                    <li>Game maps and level design.</li>
                </ul>
                <h4 class="font-semibold text-slate-100 mt-4">Input Format:</h4>
                <p>Choose between <strong>Edge List</strong> or <strong>Adjacency List</strong> format. Node values can be numbers or characters (up to 3 characters long). Maximum 100 nodes allowed.</p>
                <p><strong>Edge List Example:</strong> <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">A-B, B-C, C-D, D-A</code></p>
                <p><strong>Adjacency List Example:</strong> <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400"><br>A: B, C, D<br>C: A, D<br>B: C</code></p>
            `
        },
        ALG_BINARY_SEARCH: {
            title: `<i class="fa-solid fa-magnifying-glass text-cyan-400 mr-3"></i>Binary Search`,
            content: `
                <p><strong>Binary Search</strong> finds a target value in a <em>sorted</em> array by repeatedly halving the search range.</p>
                <h4 class="font-semibold text-slate-100 mt-4">How it works:</h4>
                <ol class="list-decimal list-inside space-y-1">
                    <li>Check the middle element of the current range.</li>
                    <li>If it's equal to the target, we're done.</li>
                    <li>If it's smaller than the target, discard the left half.</li>
                    <li>If it's larger, discard the right half.</li>
                    <li>Repeat until found or the range is empty.</li>
                </ol>
                <h4 class="font-semibold text-slate-100 mt-4">Complexity:</h4>
                <p>Time complexity is <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">O(log n)</code>, requiring at most <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">⌈log₂(n)⌉</code> comparisons.</p>
                <h4 class="font-semibold text-slate-100 mt-4">Input Format:</h4>
                <p>Provide a
                 list of numbers separated by commas, and a target number to find. Or generate a default sorted array.</p>
            `
        },
        ALG_DFS: {
            title: `<i class="fa-solid fa-route text-cyan-400 mr-3"></i>Depth First Search`,
            content: `
                <p><strong>DFS</strong> explores as far as possible along each branch before backtracking. We'll show pre-order traversal (Node, Left, Right).</p>
                <h4 class="font-semibold text-slate-100 mt-4">Input Format:</h4>
                <p>Provide a tree as level-order traversal (use 'null' for missing children), or generate the default tree.</p>
                <h4 class="font-semibold text-slate-100 mt-4">Complexity:</h4>
                <p>Time complexity: <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">O(n)</code>; Space: up to <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">O(h)</code> where h is height.</p>
            `
        },
        ALG_BFS: {
            title: `<i class="fa-solid fa-arrows-split-up-and-left text-cyan-400 mr-3"></i>Breadth First Search`,
            content: `
                <p><strong>BFS</strong> explores the tree level by level from the root using a queue. It visits all nodes at the current depth before moving to the next depth.</p>
                <h4 class="font-semibold text-slate-100 mt-4">Input Format:</h4>
                <p>Provide a tree as level-order traversal (use 'null' for missing children), or generate the default tree. Values should be unique for clarity.</p>
                <h4 class="font-semibold text-slate-100 mt-4">Complexity:</h4>
                <p>Time: <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">O(n)</code>; Space: up to <code class="bg-slate-700/50 px-1 rounded-md text-cyan-400">O(w)</code> where w is max width.</p>
            `
        },
        ALG_TRAVERSAL: {
            title: `<i\"fa-solid fa-shuffle text-cyan-400 mr-3\"></i>Tree Traversals`,
            content: `
                <p><strong>Tree Traversals</strong> systematically visit all nodes of a tree. They are foundational for algorithms such as evaluating expressions, serialization, and tree-based searching.</p>
                <ul class="list-disc list-inside space-y-1">
                    <li><strong>Preorder</strong>: Node → Left → Right</li>
                    <li><strong>Inorder</strong>: Left → Node → Right</li>
                    <li><strong>Postorder</strong>: Left → Right → Node</li>
                </ul>
                <h4 class="font-semibold text-slate-100 mt-4">Visualization:</h4>
                <p>As nodes are visited, their values fill the boxes above the tree in order. Use the buttons to choose the order and click Start Simulation.</p>
                <h4 class="font-semibold text-slate-100 mt-4">Complexity:</h4>
                <p>All traversals visit each node exactly once: <code class=\"bg-slate-700/50 px-1 rounded-md text-cyan-400\">O(n)</code> time, with space proportional to recursion depth (tree height).</p>
            `
        }
    };


    // --- Animated Background ---
    const bgCanvas = document.getElementById('background-canvas');
    const ctx = bgCanvas.getContext('2d');
    let rootBranches = [];
    const MAX_DEPTH = 4;
    const NUM_ROOTS = 8;

    function resizeBgCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    resizeBgCanvas();
    window.addEventListener('resize', () => {
        resizeBgCanvas();
        rootBranches = []; // Reset on resize
    });

    class VBranch {
        constructor(x, startY, endY, depth, slotWidth) {
            this.x = x;
            this.startY = startY;
            this.endY = endY;
            this.currentY = startY;
            this.depth = depth;
            this.slotWidth = slotWidth;
            this.speed = Math.random() * 0.5 + 0.5;
            this.state = 'descending'; // descending, branching, done
            this.h_progress = 0;
            this.h_len = this.slotWidth / 4;
            this.children = [];
        }
        update() {
            if (this.state === 'descending') {
                if (this.currentY < this.endY) {
                    this.currentY += this.speed;
                } else {
                    this.currentY = this.endY;
                    this.state = 'branching';
                    if (this.depth < MAX_DEPTH) {
                        this.createChildren();
                    }
                }
            } else if (this.state === 'branching') {
                if (this.h_progress < this.h_len) {
                    this.h_progress += this.speed;
                } else {
                    this.h_progress = this.h_len;
                    this.state = 'done';
                }
            }
            this.children.forEach(child => child.update());
        }
        createChildren() {
            const childSlotWidth = this.slotWidth / 2;
            const v_gap = 10;
            const childStartY = this.endY + v_gap;
            let nextLevelHeight = (bgCanvas.height / (MAX_DEPTH + 2));
            let childEndY = childStartY + nextLevelHeight * (Math.random() * 0.5 + 0.5);
            
            if (this.depth + 1 >= MAX_DEPTH) {
                childEndY = bgCanvas.height + 50; // Extend beyond the screen
            }

            const leftChildX = this.x - this.h_len;
            const rightChildX = this.x + this.h_len;
            this.children.push(new VBranch(leftChildX, childStartY, childEndY, this.depth + 1, childSlotWidth));
            this.children.push(new VBranch(rightChildX, childStartY, childEndY, this.depth + 1, childSlotWidth));
        }
        draw(context) {
            context.strokeStyle = `hsla(195, 100%, 50%, ${0.03 + (this.depth / MAX_DEPTH) * 0.15})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(this.x, this.startY);
            context.lineTo(this.x, this.currentY);
            context.stroke();
            if (this.state === 'branching' || this.state === 'done') {
                context.beginPath();
                context.moveTo(this.x, this.endY);
                context.lineTo(this.x - this.h_progress, this.endY);
                context.stroke();
                context.beginPath();
                context.moveTo(this.x, this.endY);
                context.lineTo(this.x + this.h_progress, this.endY);
                context.stroke();
                 if (this.state === 'done' && this.children.length > 0) {
                    context.beginPath();
                    context.moveTo(this.x - this.h_len, this.endY);
                    context.lineTo(this.x - this.h_len, this.children[0].startY);
                    context.stroke();
                    context.beginPath();
                    context.moveTo(this.x + this.h_len, this.endY);
                    context.lineTo(this.x + this.h_len, this.children[1].startY);
                    context.stroke();
                }
            }
            this.children.forEach(child => child.draw(context));
        }
    }

    function animateBackground() {
        ctx.fillStyle = 'rgba(9, 10, 15, 0.1)';
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        if (rootBranches.length < NUM_ROOTS && Math.random() < 0.05) {
            const slotWidth = bgCanvas.width / NUM_ROOTS;
            const slotIndex = Math.floor(Math.random() * NUM_ROOTS);
            const x = slotWidth * slotIndex + slotWidth / 2;
            const isSlotOccupied = rootBranches.some(b => Math.abs(b.x - x) < 1);
            if (!isSlotOccupied) {
                const startY = -20;
                const endY = Math.random() * (bgCanvas.height / (MAX_DEPTH + 1)) * 0.8 + 20;
                rootBranches.push(new VBranch(x, startY, endY, 0, slotWidth));
            }
        }
        rootBranches = rootBranches.filter(b => {
            let lowestY = b.startY;
            function findLowestY(branch) {
                lowestY = Math.max(lowestY, branch.currentY);
                branch.children.forEach(findLowestY);
            }
            findLowestY(b);
            return lowestY < bgCanvas.height + 50;
        });
        rootBranches.forEach(b => {
            b.update();
            b.draw(ctx);
        });
        requestAnimationFrame(animateBackground);
    }
    animateBackground();


    // --- Page Navigation ---
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });
    
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // --- Navbar Scroll Buttons ---
    const dsSectionTop = () => document.getElementById('home-page').querySelector('main').offsetTop - 20;
    const algoHeader = () => Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Visualize Algorithms'));
    function scrollToDS() { window.scrollTo({ top: dsSectionTop(), behavior: 'smooth' }); }
    function scrollToAlgo() {
        const header = algoHeader();
        if (header) {
            const rect = header.getBoundingClientRect();
            const top = window.pageYOffset + rect.top - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }
    const navDsBtn = document.getElementById('nav-ds-btn');
    const navAlgoBtn = document.getElementById('nav-algo-btn');
    const mobileDsBtn = document.getElementById('mobile-ds-btn');
    const mobileAlgoBtn = document.getElementById('mobile-algo-btn');
    if (navDsBtn) navDsBtn.addEventListener('click', scrollToDS);
    if (navAlgoBtn) navAlgoBtn.addEventListener('click', scrollToAlgo);
    if (mobileDsBtn) mobileDsBtn.addEventListener('click', () => { scrollToDS(); mobileMenu.classList.add('hidden'); });
    if (mobileAlgoBtn) mobileAlgoBtn.addEventListener('click', () => { scrollToAlgo(); mobileMenu.classList.add('hidden'); });

    // --- Simple Client-side Router (History API with hash fallback for file://) ---
    const useHashRouting = window.location.protocol === 'file:';
    let suppressRoutePush = false;

    // Descriptive paths
    function getPathForSelection(type, alg) {
        if (type === 'ALG') {
            const a = (alg || '').toUpperCase();
            if (a === 'BINARY_SEARCH') return '/binarysearch';
            if (a === 'DFS') return '/depthfirstsearch';
            if (a === 'BFS') return '/breadthfirstsearch';
            if (a === 'TRAVERSAL') return '/treetraversals';
            return '/';
        }
        if (type === 'BT') return '/binarytree';
        if (type === 'BST') return '/binarysearchtree';
        if (type === 'TRIE') return '/trie';
        if (type === 'MARY') return '/marytree';
        if (type === 'GRAPH') return '/graph';
        return '/';
    }
    const PATH_TO_CARD_SELECTOR = {
        '/binarytree': '.card[data-type="BT"]',
        '/binarysearchtree': '.card[data-type="BST"]',
        '/trie': '.card[data-type="TRIE"]',
        '/marytree': '.card[data-type="MARY"]',
        '/graph': '.card[data-type="GRAPH"]',
        '/binarysearch': '.card[data-type="ALG"][data-alg="BINARY_SEARCH"]',
        '/depthfirstsearch': '.card[data-type="ALG"][data-alg="DFS"]',
        '/breadthfirstsearch': '.card[data-type="ALG"][data-alg="BFS"]',
        '/treetraversals': '.card[data-type="ALG"][data-alg="TRAVERSAL"]'
    };

    function getCurrentRoutePath() {
        if (useHashRouting) {
            const h = window.location.hash || '';
            const p = h.replace(/^#/, '');
            return p || '/';
        }
        return window.location.pathname || '/';
    }
    function setRoutePath(path) {
        if (useHashRouting) {
            if (('#' + path) !== window.location.hash) {
                window.location.hash = path;
            }
        } else {
            if (path !== window.location.pathname) {
                history.pushState({ path }, '', path);
            }
        }
    }
    function showHomeView() {
        visualizerPage.classList.add('hidden');
        homePage.classList.remove('hidden');
        clearCanvas();
        treeInput.value = '';
        currentRoot = null;
        currentGraph = null;
        generatePyBtn.classList.add('hidden');
        balanceBstBtn.classList.add('hidden');
    }
    function applyRoute(path) {
        if (!path || path === '/') { showHomeView(); return; }
        const selector = PATH_TO_CARD_SELECTOR[path];
        if (!selector) { showHomeView(); return; }
        const card = document.querySelector(selector);
        if (card) {
            suppressRoutePush = true;
            card.click();
            suppressRoutePush = false;
        } else {
            showHomeView();
        }
    }

    // Initialize router listeners
    window.addEventListener(useHashRouting ? 'hashchange' : 'popstate', () => {
        applyRoute(getCurrentRoutePath());
    });
    // On initial load, apply current route
    applyRoute(getCurrentRoutePath());


    cards.forEach(card => {
        card.addEventListener('click', () => {
            currentTreeType = card.dataset.type;
            currentAlgorithm = null;
            if (currentTreeType === 'ALG') {
                currentAlgorithm = card.dataset.alg;
            }
            const cardTitleHTML = card.querySelector('h2').innerHTML;
            visualizerTitle.innerHTML = cardTitleHTML;
            
            balanceBstBtn.classList.add('hidden');
            mValueContainer.classList.add('hidden');
            graphControls.classList.add('hidden');
            algoTargetContainer.classList.add('hidden');
            generateDefaultArrayBtn.classList.add('hidden');
            startSimulationBtn.classList.add('hidden');
            if (traversalControls) traversalControls.classList.add('hidden');
            
            if (currentTreeType === 'BST') {
                inputDescription.textContent = 'Input an array to convert to a BST.';
                inputHelper.textContent = "Enter numbers separated by commas. e.g., 8, 3, 10, 1, 6, 14";
                treeInput.placeholder = "e.g., 8, 3, 10, 1, 6, 14";
                balanceBstBtn.classList.remove('hidden');
            } else if (currentTreeType === 'BT') {
                inputDescription.textContent = 'Input is level-by-level order.';
                inputHelper.textContent = "Enter numbers separated by commas. Use 'null' for empty nodes.";
                treeInput.placeholder = "e.g., 1, 2, 3, null, 5";
            } else if (currentTreeType === 'TRIE') {
                inputDescription.textContent = 'Input words to build the Trie.';
                inputHelper.textContent = "Enter words separated by commas.";
                treeInput.placeholder = "e.g., apple, app, apply";
            } else if (currentTreeType === 'MARY') {
                inputDescription.textContent = 'Input is level-by-level order for M-ary tree.';
                inputHelper.textContent = "Enter numbers separated by commas. Use 'null' for empty nodes.";
                treeInput.placeholder = "e.g., 1, 2, 3, 4, 5, 6, 7";
                mValueContainer.classList.remove('hidden');
            } else if (currentTreeType === 'GRAPH') {
                inputDescription.textContent = 'Input graph data in the selected format.';
                inputHelper.textContent = "Choose input format above and enter graph data.";
                treeInput.placeholder = "e.g., A-B, B-C, C-D, D-A";
                graphControls.classList.remove('hidden');
                updateGraphInputHelper();
            } else if (currentTreeType === 'ALG' && currentAlgorithm === 'BINARY_SEARCH') {
                inputDescription.textContent = 'Input a sorted array.';
                inputHelper.textContent = "Enter numbers separated by commas, or generate default.";
                treeInput.placeholder = "e.g., 1, 3, 5, 7, 9, 11";
                algoTargetContainer.classList.remove('hidden');
                generateDefaultArrayBtn.classList.remove('hidden');
                startSimulationBtn.classList.remove('hidden');
                generatePyBtn.classList.add('hidden');
                // Hook info button to algorithm info
                visualizerInfoBtn.onclick = () => {
                    const info = dsInfoData.ALG_BINARY_SEARCH;
                    if (info) {
                        dsInfoTitle.innerHTML = info.title;
                        dsInfoContent.innerHTML = info.content;
                        dsInfoModal.classList.remove('opacity-0', 'pointer-events-none');
                        requestAnimationFrame(() => dsInfoModal.classList.add('show'));
                    }
                };
            } else if (currentTreeType === 'ALG' && (currentAlgorithm === 'DFS' || currentAlgorithm === 'BFS')) {
                inputDescription.textContent = 'Input is level-by-level order.';
                inputHelper.textContent = "Enter numbers separated by commas. Use 'null' for empty nodes.";
                treeInput.placeholder = "e.g., 1, 2, 3, 4, 5, 6, 7";
                algoTargetContainer.classList.remove('hidden');
                generateDefaultArrayBtn.classList.remove('hidden');
                startSimulationBtn.classList.remove('hidden');
                generatePyBtn.classList.add('hidden');
                visualizerInfoBtn.onclick = () => {
                    const info = currentAlgorithm === 'DFS' ? dsInfoData.ALG_DFS : dsInfoData.ALG_BFS;
                    if (info) {
                        dsInfoTitle.innerHTML = info.title;
                        dsInfoContent.innerHTML = info.content;
                        dsInfoModal.classList.remove('opacity-0', 'pointer-events-none');
                        requestAnimationFrame(() => dsInfoModal.classList.add('show'));
                    }
                };
            } else if (currentTreeType === 'ALG' && currentAlgorithm === 'TRAVERSAL') {
                inputDescription.textContent = 'Input is level-by-level order.';
                inputHelper.textContent = "Enter numbers separated by commas. Use 'null' for empty nodes.";
                treeInput.placeholder = "e.g., 1, 2, 3, 4, 5, 6, 7";
                algoTargetContainer.classList.add('hidden');
                generateDefaultArrayBtn.classList.remove('hidden');
                startSimulationBtn.classList.remove('hidden');
                generatePyBtn.classList.add('hidden');
                traversalControls.classList.remove('hidden');
                // default selection preorder
                if (preorderBtn && inorderBtn && postorderBtn) {
                    preorderBtn.className = 'flex-1 bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
                    inorderBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
                    postorderBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
                }
                visualizerInfoBtn.onclick = () => {
                    const info = dsInfoData.ALG_TRAVERSAL;
                    if (info) {
                        dsInfoTitle.innerHTML = info.title;
                        dsInfoContent.innerHTML = info.content;
                        dsInfoModal.classList.remove('opacity-0', 'pointer-events-none');
                        requestAnimationFrame(() => dsInfoModal.classList.add('show'));
                    }
                };
            }

            homePage.classList.add('hidden');
            visualizerPage.classList.remove('hidden');

            // Router: push descriptive path for both DS and algorithms
            const path = getPathForSelection(currentTreeType, currentAlgorithm) || '/';
            if (!suppressRoutePush && path && path !== getCurrentRoutePath()) {
                setRoutePath(path);
            }
        });
    });

    backBtn.addEventListener('click', () => {
        visualizerPage.classList.add('hidden');
        homePage.classList.remove('hidden');
        clearCanvas();
        treeInput.value = '';
        currentRoot = null;
        currentGraph = null;
        currentArray = [];
        generatePyBtn.classList.add('hidden');
        balanceBstBtn.classList.add('hidden');
        if (!suppressRoutePush && getCurrentRoutePath() !== '/') {
            setRoutePath('/');
        }
    });

    // Graph control event listeners
    undirectedBtn.addEventListener('click', () => {
        isDirectedGraph = false;
        undirectedBtn.className = 'flex-1 bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        directedBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        if (currentGraph) {
            drawGraph(currentGraph);
            updateGraphInputFromCurrentGraph();
        }
    });

    directedBtn.addEventListener('click', () => {
        isDirectedGraph = true;
        directedBtn.className = 'flex-1 bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        undirectedBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        if (currentGraph) {
            drawGraph(currentGraph);
            updateGraphInputFromCurrentGraph();
        }
    });

    edgeListBtn.addEventListener('click', () => {
        isEdgeListFormat = true;
        edgeListBtn.className = 'flex-1 bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        adjacencyListBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        updateGraphInputHelper();
        if (currentGraph) updateGraphInputFromCurrentGraph();
    });

    adjacencyListBtn.addEventListener('click', () => {
        isEdgeListFormat = false;
        adjacencyListBtn.className = 'flex-1 bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        edgeListBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        updateGraphInputHelper();
        if (currentGraph) updateGraphInputFromCurrentGraph();
    });

    function updateGraphInputHelper() {
        if (isEdgeListFormat) {
            inputHelper.textContent = "Enter edges as 'A-B, B-C, C-D'. Node values can be numbers or characters (max 3 chars).";
            treeInput.placeholder = "e.g., A-B, B-C, C-D, D-A";
        } else {
            inputHelper.textContent = "Enter adjacency list as 'A: B, C, D' (one node per line). Node values can be numbers or characters (max 3 chars).";
            treeInput.placeholder = "e.g., A: B, C, D\nB: A, D\nC: A, D\nD: B, C";
        }
    }

    // --- Tree Logic ---

    class Node { // For BT and BST
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
            this.parent = null;
            this.x = 0; this.y = 0;
        }
    }

    class TrieNode {
        constructor(value = '') {
            this.value = value;
            this.children = {};
            this.isEndOfWord = false;
            this.x = 0;
            this.y = 0;
            this.width = 0;
        }
    }

    class MaryNode {
        constructor(value) {
            this.value = value;
            this.children = [];
            this.parent = null;
            this.x = 0;
            this.y = 0;
            this.width = 0;
        }
    }

    class GraphNode {
        constructor(value) {
            this.value = value;
            this.x = 0;
            this.y = 0;
            this.radius = 20;
        }
    }


    function parseInput(input, type) {
        if (!input.trim()) return [];
        if (type === 'TRIE') {
            return input.split(',').map(item => item.trim().toLowerCase()).filter(Boolean);
        }
        if (type === 'GRAPH') {
            return input.trim();
        }
        return input.split(',').map(item => {
            const trimmed = item.trim();
            if (trimmed.toLowerCase() === 'null' || trimmed === '') return null;
            const num = Number(trimmed);
            return isNaN(num) ? 'error' : num;
        });
    }

    // --- Tree Construction ---
    function buildTrie(words) {
        const root = new TrieNode('root');
        words.forEach(word => {
            let currentNode = root;
            for (const char of word) {
                if (!currentNode.children[char]) {
                    currentNode.children[char] = new TrieNode(char);
                }
                currentNode = currentNode.children[char];
            }
            currentNode.isEndOfWord = true;
        });
        return root;
    }


    function buildTreeFromLevelOrder(arr) {
        if (!arr || arr.length === 0 || arr[0] === null) return null;
        const root = new Node(arr[0]);
        const queue = [root];
        let i = 1;
        while (queue.length > 0 && i < arr.length) {
            const currentNode = queue.shift();
            if (arr[i] !== null && arr[i] !== undefined) {
                currentNode.left = new Node(arr[i]);
                currentNode.left.parent = currentNode;
                queue.push(currentNode.left);
            }
            i++;
            if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
                currentNode.right = new Node(arr[i]);
                currentNode.right.parent = currentNode;
                queue.push(currentNode.right);
            }
            i++;
        }
        return root;
    }
    
    function buildBST(arr) {
        if (!arr || arr.length === 0 || arr[0] === null) return null;
        const root = new Node(arr[0]);
        function insertNode(node, value) {
            if (value < node.value) {
                if (node.left === null) {
                    node.left = new Node(value);
                    node.left.parent = node;
                } else insertNode(node.left, value);
            } else {
                if (node.right === null) {
                    node.right = new Node(value);
                    node.right.parent = node;
                } else insertNode(node.right, value);
            }
        }
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] !== null) {
               insertNode(root, arr[i]);
            }
        }
        return root;
    }

    function treeToLevelOrderArray(root) {
        if (!root) return [];
        const queue = [root];
        const result = [];
        let lastNonNullIndex = 0;
        while(queue.length > 0) {
            const node = queue.shift();
            if (node) {
                result.push(node.value);
                lastNonNullIndex = result.length -1;
                queue.push(node.left);
                queue.push(node.right);
            } else {
                result.push(null);
            }
        }
        return result.slice(0, lastNonNullIndex + 1);
    }

    function buildMaryTreeFromLevelOrder(arr, m) {
        if (!arr || arr.length === 0 || arr[0] === null) return null;
        const root = new MaryNode(arr[0]);
        const queue = [root];
        let i = 1;
        
        while (queue.length > 0 && i < arr.length) {
            const currentNode = queue.shift();
            for (let j = 0; j < m && i < arr.length; j++) {
                if (arr[i] !== null && arr[i] !== undefined) {
                    const child = new MaryNode(arr[i]);
                    child.parent = currentNode;
                    currentNode.children.push(child);
                    queue.push(child);
                }
                i++;
            }
        }
        return root;
    }

    function maryTreeToLevelOrderArray(root, m) {
        if (!root) return [];
        const queue = [root];
        const result = [];
        let lastNonNullIndex = 0;
        
        while(queue.length > 0) {
            const node = queue.shift();
            if (node) {
                result.push(node.value);
                lastNonNullIndex = result.length - 1;
                for (let j = 0; j < m; j++) {
                    if (j < node.children.length) {
                        queue.push(node.children[j]);
                    } else {
                        queue.push(null);
                    }
                }
            } else {
                result.push(null);
            }
        }
        return result.slice(0, lastNonNullIndex + 1);
    }

    // --- Graph Construction ---
    function buildGraphFromEdgeList(input) {
        const nodes = new Map();
        const edges = [];
        
        // Parse edge list format: "A-B, B-C, C-D"
        const edgeStrings = input.split(',').map(s => s.trim()).filter(s => s);
        
        for (const edgeStr of edgeStrings) {
            const parts = edgeStr.split('-').map(s => s.trim()).filter(s => s);
            if (parts.length === 2) {
                const [from, to] = parts;
                
                // Create nodes if they don't exist
                if (!nodes.has(from)) {
                    nodes.set(from, new GraphNode(from));
                }
                if (!nodes.has(to)) {
                    nodes.set(to, new GraphNode(to));
                }
                
                // Avoid duplicates for undirected graphs
                if (isDirectedGraph) {
                    edges.push({ from, to });
                } else {
                    const exists = edges.some(e =>
                        (e.from === from && e.to === to) || (e.from === to && e.to === from)
                    );
                    if (!exists) {
                edges.push({ from, to });
                    }
                }
            }
        }
        
        return { nodes: Array.from(nodes.values()), edges };
    }

    function buildGraphFromAdjacencyList(input) {
        const nodes = new Map();
        const edges = [];
        
        // Parse adjacency list format: "A: B, C, D\nC: A, D\nB: C"
        const nodeStrings = input.split('\n').map(s => s.trim()).filter(s => s);
        
        for (const nodeStr of nodeStrings) {
            const [nodeValue, neighborsStr] = nodeStr.split(':').map(s => s.trim());
            if (!nodeValue) continue;
            
            // Create node if it doesn't exist
            if (!nodes.has(nodeValue)) {
                nodes.set(nodeValue, new GraphNode(nodeValue));
            }
            
            if (neighborsStr) {
                const neighbors = neighborsStr.split(',').map(s => s.trim()).filter(s => s);
                for (const neighbor of neighbors) {
                    // Create neighbor node if it doesn't exist
                    if (!nodes.has(neighbor)) {
                        nodes.set(neighbor, new GraphNode(neighbor));
                    }
                    
                    // Add edge (avoid duplicates)
                    let edgeExists = edges.some(e => 
                        (e.from === nodeValue && e.to === neighbor) || 
                        (!isDirectedGraph && e.from === neighbor && e.to === nodeValue)
                    );
                    if (!edgeExists) {
                        edges.push({ from: nodeValue, to: neighbor });
                    }
                }
            }
        }
        
        return { nodes: Array.from(nodes.values()), edges };
    }

    function validateGraphInput(input, format) {
        if (!input.trim()) return { valid: false, error: 'Input cannot be empty.' };
        
        const nodes = new Set();
        
        if (format === 'edge-list') {
            const edgeStrings = input.split(',').map(s => s.trim()).filter(s => s);
            for (const edgeStr of edgeStrings) {
                const parts = edgeStr.split('-').map(s => s.trim()).filter(s => s);
                if (parts.length !== 2) {
                    return { valid: false, error: `Invalid edge format: ${edgeStr}. Use format: A-B` };
                }
                const [from, to] = parts;
                
                // Validate node values
                if (from.length > 3 || to.length > 3) {
                    return { valid: false, error: 'Node values must be 3 characters or less.' };
                }
                
                nodes.add(from);
                nodes.add(to);
            }
        } else {
            const nodeStrings = input.split('\n').map(s => s.trim()).filter(s => s);
            for (const nodeStr of nodeStrings) {
                const [nodeValue, neighborsStr] = nodeStr.split(':').map(s => s.trim());
                if (!nodeValue) {
                    return { valid: false, error: `Invalid node format: ${nodeStr}. Use format: A: B, C` };
                }
                
                if (nodeValue.length > 3) {
                    return { valid: false, error: 'Node values must be 3 characters or less.' };
                }
                
                nodes.add(nodeValue);
                
                if (neighborsStr) {
                    const neighbors = neighborsStr.split(',').map(s => s.trim()).filter(s => s);
                    for (const neighbor of neighbors) {
                        if (neighbor.length > 3) {
                            return { valid: false, error: 'Node values must be 3 characters or less.' };
                        }
                        nodes.add(neighbor);
                    }
                }
            }
        }
        
        if (nodes.size > 100) {
            return { valid: false, error: 'Maximum 100 nodes allowed.' };
        }
        
        return { valid: true };
    }

    // Visualization

    function clearCanvas() {
        canvas.innerHTML = '';
        masterGroup = null;
        scale = 1;
        translateX = 0;
        translateY = 0;
    }
    
    // --- Algorithms: Binary Search ---
    function showAlgoModal(message, { showOk = false } = {}) {
        if (!algoStepModal || !algoStepModalContent) return;
        algoStepModalContent.innerHTML = message;
        algoStepModal.classList.remove('hidden');
        algoStepModal.classList.add('show');
        const okBtn = document.getElementById('algo-step-modal-ok');
        if (okBtn) {
            okBtn.classList.toggle('hidden', !showOk);
        }
    }
    function hideAlgoModal() {
        if (!algoStepModal) return;
        algoStepModal.classList.remove('show');
        setTimeout(() => { algoStepModal.classList.add('hidden'); }, 0);
    }
    
    function generateDefaultSortedArray(len = 50) {
        const arr = [];
        let current = Math.floor(Math.random() * 5);
        for (let i = 0; i < len; i++) {
            current += Math.floor(Math.random() * 3) + 1;
            arr.push(current);
        }
        return arr;
    }

    function generateDefaultTraversalTreeArray() {
        // Level-order for the provided default tree
        return [
            1,
            2, 3,
            4, 5, 6, 7,
            8, null, 9, 10, null, 11, 12, 13,
            null, 14, 15, null, 16, null, null, null, 17
        ];
    }
    
    function parseNumberArray(input) {
        if (!input.trim()) return [];
        const arr = input.split(',').map(s => s.trim()).filter(s => s.length);
        const nums = [];
        for (const x of arr) {
            const n = Number(x);
            if (isNaN(n)) return null;
            nums.push(n);
        }
        return nums;
    }
    
    function drawArrayGrid(array, highlight = {}) {
        // highlight: { leftIndex, rightIndex, midIndex, discardRange: [l, r], keepRange: [l, r] }
        clearCanvas();
        const svgNS = "http://www.w3.org/2000/svg";
        masterGroup = document.createElementNS(svgNS, 'g');
        canvas.appendChild(masterGroup);
        
        const elemWidth = 40;
        const elemHeight = 40;
        const gap = 8;
        const canvasWidth = canvasContainer.clientWidth;
        const canvasHeight = canvasContainer.clientHeight;
        
        const perRow = Math.max(1, Math.floor((canvasWidth - 40) / (elemWidth + gap)));
        const numRows = Math.ceil(array.length / perRow);
        
        const totalGridWidth = Math.min(array.length, perRow) * (elemWidth + gap) - gap;
        const totalGridHeight = numRows * (elemHeight + gap) - gap;
        const startX = -totalGridWidth / 2;
        const startY = -totalGridHeight / 2;
        
        // Center group
        translateX = canvasWidth / 2;
        translateY = canvasHeight / 2;
        scale = 1;
        updateTransform();
        
        for (let i = 0; i < array.length; i++) {
            const row = Math.floor(i / perRow);
            const col = i % perRow;
            const x = startX + col * (elemWidth + gap);
            const y = startY + row * (elemHeight + gap);
            
            const g = document.createElementNS(svgNS, 'g');
            g.setAttribute('transform', `translate(${x}, ${y})`);
            g.setAttribute('class', 'array-cell');
            g.dataset.idx = i;
            
            const rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('width', elemWidth);
            rect.setAttribute('height', elemHeight);
            rect.setAttribute('rx', 6);
            rect.setAttribute('ry', 6);
            rect.setAttribute('fill', '#0f172a');
            rect.setAttribute('stroke', '#6366f1');
            rect.setAttribute('stroke-width', '2');
            
            // Highlight logic
            if (highlight) {
                const { leftIndex, rightIndex, midIndex, discardRange, keepRange } = highlight;
                if (i === leftIndex || i === rightIndex || i === midIndex) {
                    rect.setAttribute('fill', '#854d0e');
                    rect.setAttribute('stroke', '#fbbf24');
                }
                if (discardRange && i >= discardRange[0] && i <= discardRange[1]) {
                    rect.setAttribute('fill', '#7f1d1d');
                    rect.setAttribute('stroke', '#ef4444');
                }
                if (keepRange && i >= keepRange[0] && i <= keepRange[1]) {
                    rect.setAttribute('fill', '#064e3b');
                    rect.setAttribute('stroke', '#10b981');
                }
            }
            
            const text = document.createElementNS(svgNS, 'text');
            text.setAttribute('x', elemWidth / 2);
            text.setAttribute('y', elemHeight / 2);
            text.setAttribute('dy', '.3em');
            text.setAttribute('text-anchor', 'middle');
            text.textContent = array[i];
            text.setAttribute('fill', '#f1f5f9');
            
            g.appendChild(rect);
            g.appendChild(text);
            masterGroup.appendChild(g);
            
            // Floating index labels for L/R/M
            if (highlight && (i === highlight.leftIndex || i === highlight.rightIndex || i === highlight.midIndex)) {
                const label = document.createElementNS(svgNS, 'g');
                label.setAttribute('transform', `translate(${x + elemWidth / 2}, ${y - 20})`);
                const circle = document.createElementNS(svgNS, 'circle');
                circle.setAttribute('r', 12);
                circle.setAttribute('fill', '#1e293b');
                circle.setAttribute('stroke', '#fbbf24');
                circle.setAttribute('stroke-width', '2');
                const t = document.createElementNS(svgNS, 'text');
                t.setAttribute('text-anchor', 'middle');
                t.setAttribute('dy', '.35em');
                label.setAttribute('class', 'array-index-label');
                t.textContent = `${i}`;
                label.appendChild(circle);
                label.appendChild(t);
                masterGroup.appendChild(label);
            }
        }
    }
    
    function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }
    
    async function runBinarySearchSimulation(array, target) {
        let left = 0, right = array.length - 1;
        let steps = 0;
        while (left <= right) {
            steps++;
            drawArrayGrid(array, { leftIndex: left, rightIndex: right });
            await sleep(1000);
            showAlgoModal(`The left position is <strong>${left}</strong> and the right position is <strong>${right}</strong>, so we check the middle position: <strong>${Math.floor((left + right) / 2)}</strong>.`);
            await sleep(1000);
            hideAlgoModal();
            
            const mid = Math.floor((left + right) / 2);
            drawArrayGrid(array, { midIndex: mid });
            await sleep(1000);
            
            if (array[mid] === target) {
                showAlgoModal(`Found it! <strong>${array[mid]}</strong> equals the target <strong>${target}</strong>.`);
                await sleep(1000);
                hideAlgoModal();
                drawArrayGrid(array, { keepRange: [mid, mid] });
                await sleep(1000);
                showAlgoModal(`Completed in <strong>${steps}</strong> steps (≤ ⌈log₂(${array.length})⌉). Position: <strong>${mid}</strong>.`, { showOk: true });
                await new Promise(resolve => {
                    const okBtn = document.getElementById('algo-step-modal-ok');
                    if (!okBtn) { resolve(); return; }
                    const handler = () => { okBtn.removeEventListener('click', handler); hideAlgoModal(); resolve(); };
                    okBtn.addEventListener('click', handler);
                });
                return;
            } else if (array[mid] < target) {
                showAlgoModal(`<strong>${array[mid]}</strong> is smaller than target <strong>${target}</strong>. Discard left half.`);
                await sleep(1000);
                hideAlgoModal();
                drawArrayGrid(array, { discardRange: [left, mid], keepRange: [mid + 1, right] });
                await sleep(1000);
                left = mid + 1;
            } else {
                showAlgoModal(`<strong>${array[mid]}</strong> is greater than target <strong>${target}</strong>. Discard right half.`);
                await sleep(1000);
                hideAlgoModal();
                drawArrayGrid(array, { discardRange: [mid, right], keepRange: [left, mid - 1] });
                await sleep(1000);
                right = mid - 1;
            }
        }
        showAlgoModal(`Not found after <strong>${steps}</strong> steps (≤ ⌈log₂(${array.length})⌉).`, { showOk: true });
        await new Promise(resolve => {
            const okBtn = document.getElementById('algo-step-modal-ok');
            if (!okBtn) { resolve(); return; }
            const handler = () => { okBtn.removeEventListener('click', handler); hideAlgoModal(); resolve(); };
            okBtn.addEventListener('click', handler);
        });
    }
    
    function getTreeDepth(node) {
        if (!node) return 0;
        return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
    }

    function drawTrie(root) {
        clearCanvas();
        if (!root) {
            generatePyBtn.classList.add('hidden');
            return;
        }
        generatePyBtn.classList.add('hidden');

        const svgNS = "http://www.w3.org/2000/svg";
        masterGroup = document.createElementNS(svgNS, 'g');
        canvas.appendChild(masterGroup);

        const nodeRadius = isMobile() ? 14 : 20;
        const horizontalSpacing = 50;
        const verticalSpacing = 80;
        
        const nodes = [];
        const edges = [];

        function calculateTrieLayout(node, depth = 0) {
            const children = Object.values(node.children);
            let subtreeWidth = 0;
            
            if (children.length === 0) {
                node.width = horizontalSpacing;
                return;
            }
            
            children.forEach(child => {
                calculateTrieLayout(child, depth + 1);
                subtreeWidth += child.width;
            });
            
            node.width = Math.max(subtreeWidth, horizontalSpacing);
        }

        function assignTrieCoordinates(node, x, y) {
            node.x = x;
            node.y = y;
            nodes.push(node);
            
            const children = Object.values(node.children);
            const totalChildrenWidth = children.reduce((acc, child) => acc + child.width, 0);
            
            let currentX = x - totalChildrenWidth / 2;
            
            children.forEach(child => {
                const childX = currentX + child.width / 2;
                assignTrieCoordinates(child, childX, y + verticalSpacing);
                edges.push({ from: node, to: child });
                currentX += child.width;
            });
        }
        
        calculateTrieLayout(root);
        assignTrieCoordinates(root, 0, 0);

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        nodes.forEach(node => {
            minX = Math.min(minX, node.x);
            maxX = Math.max(maxX, node.x);
            minY = Math.min(minY, node.y);
            maxY = Math.max(maxY, node.y);
        });
        
        const treeWidth = maxX - minX;
        const treeHeight = maxY - minY;

        const canvasWidth = canvasContainer.clientWidth;
        const canvasHeight = canvasContainer.clientHeight;
        const scaleX = canvasWidth / (treeWidth + horizontalSpacing * 2);
        const scaleY = canvasHeight / (treeHeight + verticalSpacing * 2);
        scale = Math.min(1, scaleX, scaleY);

        translateX = (canvasWidth / 2) - ((minX + maxX) / 2) * scale;
        translateY = (canvasHeight - treeHeight * scale) / 2 - minY * scale;
        updateTransform();

        edges.forEach(edge => {
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', edge.from.x);
            line.setAttribute('y1', edge.from.y);
            line.setAttribute('x2', edge.to.x);
            line.setAttribute('y2', edge.to.y);
            line.setAttribute('class', 'edge');
            masterGroup.appendChild(line);
        });

        nodes.forEach(node => {
            const g = document.createElementNS(svgNS, 'g');
            g.setAttribute('class', 'node');
             if (node.isEndOfWord) {
                g.classList.add('is-end-of-word');
            }
            g.setAttribute('transform', `translate(${node.x}, ${node.y})`);

            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('r', nodeRadius);
            circle.setAttribute('fill', '#0f172a');

            const text = document.createElementNS(svgNS, 'text');
            text.setAttribute('dy', '.3em');
            text.setAttribute('text-anchor', 'middle');
            text.textContent = node.value === 'root' ? ' ' : node.value;

            g.appendChild(circle);
            g.appendChild(text);
            masterGroup.appendChild(g);
        });
    }

    function drawMaryTree(root, m) {
        clearCanvas();
        if (!root) {
            generatePyBtn.classList.add('hidden');
            return;
        }
        if (currentTreeType !== 'ALG') generatePyBtn.classList.remove('hidden'); else generatePyBtn.classList.add('hidden');

        const svgNS = "http://www.w3.org/2000/svg";
        masterGroup = document.createElementNS(svgNS, 'g');
        canvas.appendChild(masterGroup);

        const nodeRadius = isMobile() ? 14 : 20;
        const horizontalSpacing = 40;
        const verticalSpacing = 80;
        
        const nodes = [];
        const edges = [];

        function calculateMaryLayout(node, depth = 0) {
            if (node.children.length === 0) {
                node.width = horizontalSpacing;
                return;
            }
            
            let subtreeWidth = 0;
            node.children.forEach(child => {
                calculateMaryLayout(child, depth + 1);
                subtreeWidth += child.width;
            });
            
            node.width = Math.max(subtreeWidth, horizontalSpacing);
        }

        function assignMaryCoordinates(node, x, y) {
            node.x = x;
            node.y = y;
            nodes.push(node);
            
            const totalChildrenWidth = node.children.reduce((acc, child) => acc + child.width, 0);
            let currentX = x - totalChildrenWidth / 2;
            
            node.children.forEach(child => {
                const childX = currentX + child.width / 2;
                assignMaryCoordinates(child, childX, y + verticalSpacing);
                edges.push({ from: node, to: child });
                currentX += child.width;
            });
        }
        
        calculateMaryLayout(root);
        assignMaryCoordinates(root, 0, 0);

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        nodes.forEach(node => {
            minX = Math.min(minX, node.x);
            maxX = Math.max(maxX, node.x);
            minY = Math.min(minY, node.y);
            maxY = Math.max(maxY, node.y);
        });
        
        const treeWidth = maxX - minX;
        const treeHeight = maxY - minY;

        const canvasWidth = canvasContainer.clientWidth;
        const canvasHeight = canvasContainer.clientHeight;
        const scaleX = canvasWidth / (treeWidth + horizontalSpacing * 2);
        const scaleY = canvasHeight / (treeHeight + verticalSpacing * 2);
        scale = Math.min(1, scaleX, scaleY);

        translateX = (canvasWidth / 2) - ((minX + maxX) / 2) * scale;
        translateY = (canvasHeight - treeHeight * scale) / 2 - minY * scale;
        updateTransform();

        edges.forEach(edge => {
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', edge.from.x);
            line.setAttribute('y1', edge.from.y);
            line.setAttribute('x2', edge.to.x);
            line.setAttribute('y2', edge.to.y);
            line.setAttribute('class', 'edge');
            masterGroup.appendChild(line);
        });

        nodes.forEach(node => {
            const g = document.createElementNS(svgNS, 'g');
            g.setAttribute('class', 'node');
            g.setAttribute('transform', `translate(${node.x}, ${node.y})`);

            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('r', nodeRadius);
            circle.setAttribute('fill', '#0f172a');

            const text = document.createElementNS(svgNS, 'text');
            text.setAttribute('dy', '.3em');
            text.setAttribute('text-anchor', 'middle');
            text.textContent = node.value;

            g.appendChild(circle);
            g.appendChild(text);
            masterGroup.appendChild(g);

            // Click listener
            g.addEventListener('click', (event) => {
                event.stopPropagation();
                if (isMobile()) {
                    openNodeEditModal(node);
                } else {
                    // Desktop in-place editing (same as binary tree)
                    if (g.querySelector('foreignObject')) return;
                    const textElement = g.querySelector('text');
                    textElement.style.visibility = 'hidden';
                    const fo = document.createElementNS(svgNS, 'foreignObject');
                    fo.setAttribute('x', -nodeRadius);
                    fo.setAttribute('y', -15);
                    fo.setAttribute('width', nodeRadius * 2);
                    fo.setAttribute('height', 30);
                    const input = document.createElement('input');
                    input.setAttribute('type', 'number');
                    input.value = node.value;
                    input.style.cssText = `width: 100%; height: 100%; background-color: #1e293b; border: 1px solid #6366f1; border-radius: 4px; color: #f1f5f9; text-align: center; font-size: 1rem; font-weight: 600; font-family: 'Poppins', sans-serif; outline: none;`;
                    fo.appendChild(input);
                    g.appendChild(fo);
                    input.focus();
                    input.select();
                    const finishEdit = () => {
                        const newValueRaw = input.value;
                        if (g.contains(fo)) g.removeChild(fo);
                        textElement.style.visibility = 'visible';
                        if (newValueRaw === null || newValueRaw.trim() === '') return;
                        const newValue = Number(newValueRaw);
                        if (isNaN(newValue) || node.value === newValue) return;
                        updateMaryNodeValue(node, newValue);
                    };
                    input.addEventListener('blur', finishEdit, { once: true });
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') input.blur();
                        if (e.key === 'Escape') { if (g.contains(fo)) g.removeChild(fo); textElement.style.visibility = 'visible'; }
                    });
                }
            });

            if (!isMobile()) {
                // Add child button for desktop (only if not at max children)
                if (node.children.length < m) {
                    const addBtn = document.createElementNS(svgNS, 'g');
                    addBtn.setAttribute('class', 'action-btn add-btn');
                    addBtn.setAttribute('transform', `translate(0, 35)`);
                    const btnCircle = document.createElementNS(svgNS, 'circle');
                    btnCircle.setAttribute('r', '10');
                    const btnText = document.createElementNS(svgNS, 'text');
                    btnText.setAttribute('dy', '.35em');
                    btnText.setAttribute('text-anchor', 'middle');
                    btnText.textContent = '+';
                    addBtn.appendChild(btnCircle);
                    addBtn.appendChild(btnText);
                    g.appendChild(addBtn);
                    addBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        addMaryChild(node);
                    });
                }
                
                // Delete button
                const deleteBtn = document.createElementNS(svgNS, 'g');
                deleteBtn.setAttribute('class', 'action-btn delete-btn');
                deleteBtn.setAttribute('transform', 'translate(0, -35)');
                const btnCircle = document.createElementNS(svgNS, 'circle');
                btnCircle.setAttribute('r', '10');
                const btnText = document.createElementNS(svgNS, 'text');
                btnText.setAttribute('dy', '.35em');
                btnText.setAttribute('text-anchor', 'middle');
                btnText.textContent = '×';
                deleteBtn.appendChild(btnCircle);
                deleteBtn.appendChild(btnText);
                g.appendChild(deleteBtn);
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteMaryNode(node);
                });
            }
        });
    }

    function updateMaryNodeValue(node, newValue) {
        node.value = newValue;
        const newArray = maryTreeToLevelOrderArray(currentRoot, currentMValue);
        treeInput.value = newArray.map(v => v === null ? 'null' : v).join(', ');
        visualizeBtn.click();
    }

    function addMaryChild(node) {
        node.children.push(new MaryNode(0));
        node.children[node.children.length - 1].parent = node;
        const newArray = maryTreeToLevelOrderArray(currentRoot, currentMValue);
        treeInput.value = newArray.map(v => v === null ? 'null' : v).join(', ');
        visualizeBtn.click();
    }

    function deleteMaryNode(node) {
        if (!node.parent) {
            currentRoot = null;
        } else {
            const index = node.parent.children.indexOf(node);
            if (index > -1) {
                node.parent.children.splice(index, 1);
            }
        }
        const newArray = maryTreeToLevelOrderArray(currentRoot, currentMValue);
        treeInput.value = newArray.map(v => v === null ? 'null' : v).join(', ');
        visualizeBtn.click();
    }

    function drawTree(root) {
        clearCanvas();
        if (!root) {
            generatePyBtn.classList.add('hidden');
            return;
        }
        if (currentTreeType !== 'ALG') generatePyBtn.classList.remove('hidden'); else generatePyBtn.classList.add('hidden');

        const svgNS = "http://www.w3.org/2000/svg";
        masterGroup = document.createElementNS(svgNS, 'g');
        canvas.appendChild(masterGroup);

        const nodeRadius = 20;
        const horizontalSpacing = 50;
        const verticalSpacing = 80;

        const depth = getTreeDepth(root);
        const requiredWidth = Math.pow(2, depth - 1) * horizontalSpacing;

        const nodes = [];
        const edges = [];

        function assignCoordinates(node, level, index) {
            if (!node) return;
            node.y = level * verticalSpacing;
            const nodesAtLevel = Math.pow(2, level);
            const segmentWidth = requiredWidth / nodesAtLevel;
            node.x = segmentWidth * (index - (nodesAtLevel - 1) / 2);
            
            nodes.push(node);
            if (node.left) {
                edges.push({ from: node, to: node.left });
                assignCoordinates(node.left, level + 1, index * 2);
            }
            if (node.right) {
                edges.push({ from: node, to: node.right });
                assignCoordinates(node.right, level + 1, index * 2 + 1);
            }
        }

        assignCoordinates(root, 0, 0);

        let minX = Infinity, maxX = -Infinity, maxY = -Infinity;
        nodes.forEach(node => {
            minX = Math.min(minX, node.x);
            maxX = Math.max(maxX, node.x);
            maxY = Math.max(maxY, node.y);
        });

        const treeWidth = maxX - minX;
        const treeHeight = maxY;

        const canvasWidth = canvasContainer.clientWidth;
        const canvasHeight = canvasContainer.clientHeight;
        const scaleX = canvasWidth / (treeWidth + horizontalSpacing * 2);
        const scaleY = canvasHeight / (treeHeight + verticalSpacing * 2);
        scale = Math.min(1, scaleX, scaleY);

        translateX = (canvasWidth / 2) - (minX * scale + treeWidth * scale / 2);
        translateY = (canvasHeight - treeHeight * scale) / 2;
        updateTransform();

        edges.forEach(edge => {
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', edge.from.x);
            line.setAttribute('y1', edge.from.y);
            line.setAttribute('x2', edge.to.x);
            line.setAttribute('y2', edge.to.y);
            line.setAttribute('class', 'edge');
            masterGroup.appendChild(line);
        });

        nodes.forEach(node => {
            const g = document.createElementNS(svgNS, 'g');
            g.setAttribute('class', 'node');
            g.setAttribute('transform', `translate(${node.x}, ${node.y})`);

            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('r', nodeRadius);
            circle.setAttribute('fill', '#0f172a');

            const text = document.createElementNS(svgNS, 'text');
            text.setAttribute('dy', '.3em');
            text.setAttribute('text-anchor', 'middle');
            text.textContent = node.value;

            g.appendChild(circle);
            g.appendChild(text);
            masterGroup.appendChild(g);

            // Click listener for mobile/desktop
            g.addEventListener('click', (event) => {
                event.stopPropagation();
                if (isMobile()) {
                    openNodeEditModal(node);
                } else {
                    // Desktop in-place editing
                    if (g.querySelector('foreignObject')) return;
                    const textElement = g.querySelector('text');
                    textElement.style.visibility = 'hidden';
                    const fo = document.createElementNS(svgNS, 'foreignObject');
                    fo.setAttribute('x', -nodeRadius);
                    fo.setAttribute('y', -15);
                    fo.setAttribute('width', nodeRadius * 2);
                    fo.setAttribute('height', 30);
                    const input = document.createElement('input');
                    input.setAttribute('type', 'number');
                    input.value = node.value;
                    input.style.cssText = `width: 100%; height: 100%; background-color: #1e293b; border: 1px solid #6366f1; border-radius: 4px; color: #f1f5f9; text-align: center; font-size: 1rem; font-weight: 600; font-family: 'Poppins', sans-serif; outline: none;`;
                    fo.appendChild(input);
                    g.appendChild(fo);
                    input.focus();
                    input.select();
                    const finishEdit = () => {
                        const newValueRaw = input.value;
                        if (g.contains(fo)) g.removeChild(fo);
                        textElement.style.visibility = 'visible';
                        if (newValueRaw === null || newValueRaw.trim() === '') return;
                        const newValue = Number(newValueRaw);
                        if (isNaN(newValue) || node.value === newValue) return;
                        updateNodeValue(node, newValue);
                    };
                    input.addEventListener('blur', finishEdit, { once: true });
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') input.blur();
                        if (e.key === 'Escape') { if (g.contains(fo)) g.removeChild(fo); textElement.style.visibility = 'visible'; }
                    });
                }
            });

            if (!isMobile()) {
                // Add Child Buttons for desktop
                if (currentTreeType !== 'BST') {
                    const directions = [{ side: 'left', x: -25, y: 25 }, { side: 'right', x: 25, y: 25 }];
                    directions.forEach(({ side, x, y }) => {
                        if (node[side] === null) {
                            const addBtn = document.createElementNS(svgNS, 'g');
                            addBtn.setAttribute('class', 'action-btn add-btn');
                            addBtn.setAttribute('transform', `translate(${x}, ${y})`);
                            const btnCircle = document.createElementNS(svgNS, 'circle');
                            btnCircle.setAttribute('r', '10');
                            const btnText = document.createElementNS(svgNS, 'text');
                            btnText.setAttribute('dy', '.35em');
                            btnText.setAttribute('text-anchor', 'middle');
                            btnText.textContent = '+';
                            addBtn.appendChild(btnCircle);
                            addBtn.appendChild(btnText);
                            g.appendChild(addBtn);
                            addBtn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                addChildNode(node, side);
                            });
                        }
                    });
                }
                
                // Delete Button for desktop
                const deleteBtn = document.createElementNS(svgNS, 'g');
                deleteBtn.setAttribute('class', 'action-btn delete-btn');
                deleteBtn.setAttribute('transform', 'translate(0, -35)');
                const btnCircle = document.createElementNS(svgNS, 'circle');
                btnCircle.setAttribute('r', '10');
                const btnText = document.createElementNS(svgNS, 'text');
                btnText.setAttribute('dy', '.35em');
                btnText.setAttribute('text-anchor', 'middle');
                btnText.textContent = '×';
                deleteBtn.appendChild(btnCircle);
                deleteBtn.appendChild(btnText);
                g.appendChild(deleteBtn);
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteNodeAndDescendants(node);
                });
            }
        });
    }

    function drawGraph(graph) {
        clearCanvas();
        if (!graph || !graph.nodes || graph.nodes.length === 0) {
            generatePyBtn.classList.add('hidden');
            return;
        }
        // Hide for algorithm tabs only; but graphs are DS; keep button visible for graphs
        generatePyBtn.classList.remove('hidden');

        const svgNS = "http://www.w3.org/2000/svg";
        masterGroup = document.createElementNS(svgNS, 'g');
        canvas.appendChild(masterGroup);

        const nodeRadius = 20;
        const canvasWidth = canvasContainer.clientWidth;
        const canvasHeight = canvasContainer.clientHeight;
        
        // Simple force-directed layout for uniform spacing
        const nodes = graph.nodes;
        const edges = graph.edges;
        
        // Determine if positions are already initialized (from drag or prior draw)
        const positionsInitialized = nodes.length > 0 && nodes.every(n => typeof n.x === 'number' && typeof n.y === 'number' && n._positionInitialized === true);

        if (!positionsInitialized) {
            function computeStd(values) {
                if (!values.length) return 0;
                const mean = values.reduce((a, b) => a + b, 0) / values.length;
                const variance = values.reduce((sum, v) => sum + (v - mean) * (v - mean), 0) / values.length;
                return Math.sqrt(variance);
            }
            function initializePositions(variant) {
        const centerX = 0;
        const centerY = 0;
                const baseRadius = Math.min(canvasWidth, canvasHeight) * (isMobile() ? 0.28 : 0.25);
        nodes.forEach((node, index) => {
                    const angle = (2 * Math.PI * index) / Math.max(1, nodes.length);
                    let r = baseRadius * (0.9 + Math.random() * 0.2);
                    let x, y;
                    if (variant === 0) {
                        x = centerX + r * Math.cos(angle);
                        y = centerY + r * Math.sin(angle);
                    } else if (variant === 1) {
                        x = centerX + r * Math.cos(angle) * 1.2;
                        y = centerY + r * Math.sin(angle) * 0.8;
                    } else {
                        const ring = (index % 3);
                        const rr = r * (0.7 + ring * 0.15);
                        x = centerX + rr * Math.cos(angle + ring * 0.4);
                        y = centerY + rr * Math.sin(angle + ring * 0.2);
                    }
                    x += (Math.random() - 0.5) * 40;
                    y += (Math.random() - 0.5) * 40;
                    node.x = x;
                    node.y = y;
                });
            }
            let attempt = 0;
            let layoutOk = false;
            while (attempt < 3 && !layoutOk) {
                initializePositions(attempt);

        // Improved force simulation for better layout
        const minDistance = isMobile() ? 80 : 100; // tighter on mobile to spread better
        const maxIterations = isMobile() ? 300 : 200; // a few more iterations on mobile
        
        for (let iteration = 0; iteration < maxIterations; iteration++) {
            // Repulsion between nodes with minimum distance enforcement
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[j].x - nodes[i].x;
                    const dy = nodes[j].y - nodes[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 0) {
                        let force = 0;
                        if (distance < minDistance) {
                            // Very strong repulsion when nodes are too close
                            force = (minDistance - distance) * 2.0;
                        } else {
                            // Normal repulsion with distance falloff
                            force = 2000 / (distance * distance);
                        }
                        const fx = (dx / distance) * force;
                        const fy = (dy / distance) * force;
                        nodes[i].x -= fx * 0.005;
                        nodes[i].y -= fy * 0.005;
                        nodes[j].x += fx * 0.005;
                        nodes[j].y += fy * 0.005;
                    }
                }
            }
            
            // Attraction between connected nodes (weaker to prioritize separation)
            edges.forEach(edge => {
                const fromNode = nodes.find(n => n.value === edge.from);
                const toNode = nodes.find(n => n.value === edge.to);
                if (fromNode && toNode) {
                    const dx = toNode.x - fromNode.x;
                    const dy = toNode.y - fromNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 0) {
                        const targetDistance = 150; // Increased target distance
                        const force = (distance - targetDistance) * 0.03; // Weaker attraction
                        const fx = (dx / distance) * force;
                        const fy = (dy / distance) * force;
                        fromNode.x += fx;
                        fromNode.y += fy;
                        toNode.x -= fx;
                        toNode.y -= fy;
                    }
                }
            });
            
            // Boundary constraints to keep nodes within canvas
            const margin = 80;
            nodes.forEach(node => {
                node.x = Math.max(margin, Math.min(canvasWidth - margin, node.x));
                node.y = Math.max(margin, Math.min(canvasHeight - margin, node.y));
            });
        }
        
        // Final pass to ensure no overlaps
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[j].x - nodes[i].x;
                const dy = nodes[j].y - nodes[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = isMobile() ? 80 : 100;
                if (distance < minDistance) {
                    // Force separation
                    const separation = minDistance - distance;
                    const fx = (dx / distance) * separation * 0.5;
                    const fy = (dy / distance) * separation * 0.5;
                    nodes[i].x -= fx;
                    nodes[i].y -= fy;
                    nodes[j].x += fx;
                    nodes[j].y += fy;
                }
            }
            }

            // Check orientation variance; if too collinear, try another initialization
            const xs = nodes.map(n => n.x);
            const ys = nodes.map(n => n.y);
            const meanX = xs.reduce((a,b)=>a+b,0)/xs.length;
            const meanY = ys.reduce((a,b)=>a+b,0)/ys.length;
            const stdX = Math.sqrt(xs.reduce((s,v)=>s+(v-meanX)*(v-meanX),0)/xs.length);
            const stdY = Math.sqrt(ys.reduce((s,v)=>s+(v-meanY)*(v-meanY),0)/ys.length);
            const minStdX = canvasWidth * 0.08;
            const minStdY = canvasHeight * 0.08;
            layoutOk = (stdX >= minStdX && stdY >= minStdY);
            attempt++;
            }

            // Mark positions initialized so we preserve them on future redraws
            nodes.forEach(n => { n._positionInitialized = true; });
        }

        // Calculate bounds for scaling
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        nodes.forEach(node => {
            minX = Math.min(minX, node.x);
            maxX = Math.max(maxX, node.x);
            minY = Math.min(minY, node.y);
            maxY = Math.max(maxY, node.y);
        });

        const graphWidth = maxX - minX;
        const graphHeight = maxY - minY;

        const scaleX = canvasWidth / (graphWidth + nodeRadius * 4);
        const scaleY = canvasHeight / (graphHeight + nodeRadius * 4);
        scale = Math.min(1, scaleX, scaleY);

        translateX = (canvasWidth / 2) - ((minX + maxX) / 2) * scale;
        translateY = (canvasHeight / 2) - ((minY + maxY) / 2) * scale;
        updateTransform();

        // Draw edges first (lower z-index)
        edges.forEach(edge => {
            const fromNode = nodes.find(n => n.value === edge.from);
            const toNode = nodes.find(n => n.value === edge.to);
            if (fromNode && toNode) {
                const line = document.createElementNS(svgNS, 'line');
                line.setAttribute('x1', fromNode.x);
                line.setAttribute('y1', fromNode.y);
                line.setAttribute('x2', toNode.x);
                line.setAttribute('y2', toNode.y);
                line.setAttribute('class', 'edge');
                masterGroup.appendChild(line);
                edge.lineEl = line;

                // Add arrow for directed graphs
                if (isDirectedGraph) {
                    const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
                    const arrowLength = 15;
                    const arrowAngle = Math.PI / 6;
                    
                    const arrowX = toNode.x - (nodeRadius + arrowLength) * Math.cos(angle);
                    const arrowY = toNode.y - (nodeRadius + arrowLength) * Math.sin(angle);
                    
                    const arrow1X = arrowX - arrowLength * Math.cos(angle - arrowAngle);
                    const arrow1Y = arrowY - arrowLength * Math.sin(angle - arrowAngle);
                    const arrow2X = arrowX - arrowLength * Math.cos(angle + arrowAngle);
                    const arrow2Y = arrowY - arrowLength * Math.sin(angle + arrowAngle);
                    
                    const arrow = document.createElementNS(svgNS, 'polygon');
                    arrow.setAttribute('points', `${arrowX},${arrowY} ${arrow1X},${arrow1Y} ${arrow2X},${arrow2Y}`);
                    arrow.setAttribute('fill', '#475569');
                    arrow.setAttribute('class', 'edge');
                    masterGroup.appendChild(arrow);
                    edge.arrowEl = arrow;
                }
            }
        });

        // Draw nodes
        nodes.forEach(node => {
            const g = document.createElementNS(svgNS, 'g');
            g.setAttribute('class', 'node');
            g.setAttribute('transform', `translate(${node.x}, ${node.y})`);
            g.dataset.value = node.value;
            node.domRef = g;

            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('r', nodeRadius);
            circle.setAttribute('fill', '#0f172a');

            const text = document.createElementNS(svgNS, 'text');
            text.setAttribute('dy', '.3em');
            text.setAttribute('text-anchor', 'middle');
            text.textContent = node.value;

            g.appendChild(circle);
            g.appendChild(text);
            masterGroup.appendChild(g);

            // Drag handlers (desktop only)
            if (!isMobile()) {
                g.addEventListener('mousedown', (e) => {
                    // Avoid starting drag when interacting with action buttons or text inputs
                    if (e.button !== 0) return; // Left mouse only
                    const isActionBtn = e.target.closest && e.target.closest('g.action-btn');
                    if (isActionBtn) return;
                    e.stopPropagation();
                    canvasContainer.classList.add('dragging');
                    const rect = canvasContainer.getBoundingClientRect();
                    const screenX = e.clientX - rect.left;
                    const screenY = e.clientY - rect.top;
                    const worldX = (screenX - translateX) / scale;
                    const worldY = (screenY - translateY) / scale;
                    isDraggingNode = true;
                    didDragNode = false;
                    draggedGraphNode = node;
                    dragOffsetX = worldX - node.x;
                    dragOffsetY = worldY - node.y;

                    const onMouseMove = (ev) => {
                        if (!isDraggingNode || draggedGraphNode !== node) return;
                        const r = canvasContainer.getBoundingClientRect();
                        const sx = ev.clientX - r.left;
                        const sy = ev.clientY - r.top;
                        const wx = (sx - translateX) / scale;
                        const wy = (sy - translateY) / scale;
                        const newX = wx - dragOffsetX;
                        const newY = wy - dragOffsetY;
                        if (Math.abs(newX - node.x) > 0.5 || Math.abs(newY - node.y) > 0.5) didDragNode = true;
                        node.x = newX;
                        node.y = newY;
                        node._positionInitialized = true;
                        // Update this node and all edges positions without full redraw
                        if (node.domRef) node.domRef.setAttribute('transform', `translate(${node.x}, ${node.y})`);
                        updateGraphEdgesPositions(nodes, edges, nodeRadius);
                    };

                    const onMouseUp = () => {
                        isDraggingNode = false;
                        draggedGraphNode = null;
                        canvasContainer.classList.remove('dragging');
                        window.removeEventListener('mousemove', onMouseMove);
                        window.removeEventListener('mouseup', onMouseUp);
                        // Keep positions; nothing else to do
                    };

                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp, { once: true });
                });
            }

            // Add plus button for adding new connected nodes
            if (!isMobile()) {
                const addBtn = document.createElementNS(svgNS, 'g');
                addBtn.setAttribute('class', 'action-btn add-btn');
                addBtn.setAttribute('transform', `translate(0, 35)`);
                const btnCircle = document.createElementNS(svgNS, 'circle');
                btnCircle.setAttribute('r', '10');
                const btnText = document.createElementNS(svgNS, 'text');
                btnText.setAttribute('dy', '.35em');
                btnText.setAttribute('text-anchor', 'middle');
                btnText.textContent = '+';
                addBtn.appendChild(btnCircle);
                addBtn.appendChild(btnText);
                g.appendChild(addBtn);
                addBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addGraphNodeConnectedTo(node);
                });
            }

            // Add delete button for removing nodes
            if (!isMobile()) {
                const deleteBtn = document.createElementNS(svgNS, 'g');
                deleteBtn.setAttribute('class', 'action-btn delete-btn');
                deleteBtn.setAttribute('transform', 'translate(0, -35)');
                const btnCircle = document.createElementNS(svgNS, 'circle');
                btnCircle.setAttribute('r', '10');
                const btnText = document.createElementNS(svgNS, 'text');
                btnText.setAttribute('dy', '.35em');
                btnText.setAttribute('text-anchor', 'middle');
                btnText.textContent = '×';
                deleteBtn.appendChild(btnCircle);
                deleteBtn.appendChild(btnText);
                g.appendChild(deleteBtn);
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteGraphNode(node);
                });
            }

            // Click listener for editing
            g.addEventListener('click', (event) => {
                event.stopPropagation();
                if (isDraggingNode || didDragNode) { didDragNode = false; return; }
                if (isMobile()) {
                    openNodeEditModal(node);
                } else {
                    // Desktop in-place editing
                    if (g.querySelector('foreignObject')) return;
                    const textElement = g.querySelector('text');
                    textElement.style.visibility = 'hidden';
                    const fo = document.createElementNS(svgNS, 'foreignObject');
                    fo.setAttribute('x', -nodeRadius);
                    fo.setAttribute('y', -15);
                    fo.setAttribute('width', nodeRadius * 2);
                    fo.setAttribute('height', 30);
                    const input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    input.value = node.value;
                    input.style.cssText = `width: 100%; height: 100%; background-color: #1e293b; border: 1px solid #6366f1; border-radius: 4px; color: #f1f5f9; text-align: center; font-size: 1rem; font-weight: 600; font-family: 'Poppins', sans-serif; outline: none;`;
                    fo.appendChild(input);
                    g.appendChild(fo);
                    input.focus();
                    input.select();
                    const finishEdit = () => {
                        const newValue = input.value.trim();
                        if (g.contains(fo)) g.removeChild(fo);
                        textElement.style.visibility = 'visible';
                        if (newValue === '' || newValue.length > 3 || node.value === newValue) return;
                        const success = updateGraphNodeValue(node, newValue);
                        if (!success) {
                            // If update failed, revert the input value
                            input.value = node.value;
                        }
                    };
                    input.addEventListener('blur', finishEdit, { once: true });
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') input.blur();
                        if (e.key === 'Escape') { if (g.contains(fo)) g.removeChild(fo); textElement.style.visibility = 'visible'; }
                    });
                }
            });
        });
    }

    function updateGraphEdgesPositions(nodes, edges, nodeRadius) {
        // Recompute line and arrow positions based on node coordinates
        edges.forEach(edge => {
            const fromNode = nodes.find(n => n.value === edge.from);
            const toNode = nodes.find(n => n.value === edge.to);
            if (!fromNode || !toNode) return;
            if (edge.lineEl) {
                edge.lineEl.setAttribute('x1', fromNode.x);
                edge.lineEl.setAttribute('y1', fromNode.y);
                edge.lineEl.setAttribute('x2', toNode.x);
                edge.lineEl.setAttribute('y2', toNode.y);
            }
            if (edge.arrowEl) {
                const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
                const arrowLength = 15;
                const arrowAngle = Math.PI / 6;
                const arrowX = toNode.x - (nodeRadius + arrowLength) * Math.cos(angle);
                const arrowY = toNode.y - (nodeRadius + arrowLength) * Math.sin(angle);
                const arrow1X = arrowX - arrowLength * Math.cos(angle - arrowAngle);
                const arrow1Y = arrowY - arrowLength * Math.sin(angle - arrowAngle);
                const arrow2X = arrowX - arrowLength * Math.cos(angle + arrowAngle);
                const arrow2Y = arrowY - arrowLength * Math.sin(angle + arrowAngle);
                edge.arrowEl.setAttribute('points', `${arrowX},${arrowY} ${arrow1X},${arrow1Y} ${arrow2X},${arrow2Y}`);
            }
        });
    }

    function updateGraphNodeValue(node, newValue) {
        // Check if the new value already exists in another node
        const existingNode = currentGraph.nodes.find(n => n.value === newValue && n !== node);
        if (existingNode) {
            showToast('Node value already exists. Please choose a different value.', 'error');
            return false;
        }
        
        // Update all edges that reference the old value
        const oldValue = node.value;
        node.value = newValue;
        
        currentGraph.edges.forEach(edge => {
            if (edge.from === oldValue) {
                edge.from = newValue;
            }
            if (edge.to === oldValue) {
                edge.to = newValue;
            }
        });
        
        updateGraphInputFromCurrentGraph();
        drawGraph(currentGraph);
        return true;
    }

    function generateUniqueNodeValue(existingValues) {
        // Try numeric values first
        for (let i = 1; i <= 999; i++) {
            if (!existingValues.has(i.toString())) {
                return i.toString();
            }
        }
        
        // Try alphabetic values
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < alphabet.length; i++) {
            const char = alphabet[i];
            if (!existingValues.has(char)) {
                return char;
            }
        }
        
        // Try combinations
        for (let i = 0; i < alphabet.length; i++) {
            for (let j = 0; j < alphabet.length; j++) {
                const combo = alphabet[i] + alphabet[j];
                if (!existingValues.has(combo)) {
                    return combo;
                }
            }
        }
        
        // Fallback
        return 'X' + Math.floor(Math.random() * 1000);
    }

    function addGraphNodeConnectedTo(existingNode) {
        if (!currentGraph) return;
        
        // Get existing node values
        const existingValues = new Set(currentGraph.nodes.map(n => n.value));
        
        // Generate unique value for new node
        const newValue = generateUniqueNodeValue(existingValues);
        
        // Create new node
        const newNode = new GraphNode(newValue);
        // Initialize position near the existing node (preserve layout)
        const angle = Math.random() * Math.PI * 2;
        const distance = 140; // reasonable spacing
        // Use world coordinates (masterGroup space)
        newNode.x = existingNode.x + distance * Math.cos(angle);
        newNode.y = existingNode.y + distance * Math.sin(angle);
        newNode._positionInitialized = true;
        
        currentGraph.nodes.push(newNode);
        
        // Add edge from existing node to new node
        currentGraph.edges.push({ from: existingNode.value, to: newValue });
        
        // Update input field
        updateGraphInputFromCurrentGraph();
        
        // Redraw graph
        drawGraph(currentGraph);
    }

    function updateGraphInputFromCurrentGraph() {
        if (!currentGraph) return;
        
        // Build adjacency list first from current graph edges
            const adjacencyList = {};
            currentGraph.nodes.forEach(node => {
                adjacencyList[node.value] = [];
            });
            currentGraph.edges.forEach(edge => {
            if (!adjacencyList[edge.from]) adjacencyList[edge.from] = [];
                adjacencyList[edge.from].push(edge.to);
            if (!isDirectedGraph) {
                if (!adjacencyList[edge.to]) adjacencyList[edge.to] = [];
                if (!adjacencyList[edge.to].includes(edge.from)) adjacencyList[edge.to].push(edge.from);
            }
        });

        // Clean and sort
        const nodeOrder = Object.keys(adjacencyList).sort((a, b) => a.localeCompare(b));
        nodeOrder.forEach(node => {
            const uniq = Array.from(new Set(adjacencyList[node]));
            uniq.sort((a, b) => a.localeCompare(b));
            adjacencyList[node] = uniq;
        });

        if (isEdgeListFormat) {
            // Build edge list from adjacency (for undirected ensure canonical ordering)
            const seen = new Set();
            const edgeStrings = [];
            nodeOrder.forEach(from => {
                adjacencyList[from].forEach(to => {
                    if (isDirectedGraph) {
                        edgeStrings.push(`${from}-${to}`);
                    } else {
                        const a = from <= to ? from : to;
                        const b = from <= to ? to : from;
                        const key = `${a}-${b}`;
                        if (!seen.has(key)) {
                            seen.add(key);
                            edgeStrings.push(key);
                        }
                    }
                });
            });
            treeInput.value = edgeStrings.join(', ');
        } else {
            const adjacencyStrings = nodeOrder
                .map(node => `${node}: ${adjacencyList[node].join(', ')}`)
                .join('\n');
                    treeInput.value = adjacencyStrings;
        }
    }

    function deleteGraphNode(node) {
        if (!currentGraph) return;
        
        // Remove the node from nodes array
        const nodeIndex = currentGraph.nodes.findIndex(n => n.value === node.value);
        if (nodeIndex > -1) {
            currentGraph.nodes.splice(nodeIndex, 1);
        }
        
        // Remove all edges connected to this node
        currentGraph.edges = currentGraph.edges.filter(edge => 
            edge.from !== node.value && edge.to !== node.value
        );
        
        // Update input field
        updateGraphInputFromCurrentGraph();
        
        // Redraw graph
        drawGraph(currentGraph);
    }

    // --- Mobile Node Edit Modal ---
    function openNodeEditModal(node) {
        currentlyEditingNode = node;
        nodeValueInput.value = node.value;

        // Set input type based on data structure type
        if (currentTreeType === 'GRAPH') {
            nodeValueInput.type = 'text';
            nodeValueInput.placeholder = 'Enter node value (max 3 chars)';
        } else {
            nodeValueInput.type = 'number';
            nodeValueInput.placeholder = 'Enter node value';
        }

        if (currentTreeType === 'BT') {
            addChildrenButtons.classList.remove('hidden');
            addMaryChildBtn.classList.add('hidden');
            addLeftChildBtn.disabled = node.left !== null;
            addRightChildBtn.disabled = node.right !== null;
        } else if (currentTreeType === 'MARY') {
            addChildrenButtons.classList.add('hidden');
            addMaryChildBtn.classList.remove('hidden');
            addMaryChildBtn.textContent = 'Add Child';
            addMaryChildBtn.disabled = node.children.length >= currentMValue;
        } else if (currentTreeType === 'GRAPH') {
            addChildrenButtons.classList.add('hidden');
            addMaryChildBtn.classList.remove('hidden');
            addMaryChildBtn.textContent = 'Add Connected Node';
            addMaryChildBtn.disabled = false;
            deleteNodeBtn.textContent = 'Delete Node';
            // For graphs, we allow editing the node value and adding connected nodes
        } else {
            addChildrenButtons.classList.add('hidden');
            addMaryChildBtn.classList.add('hidden');
        }
        
        nodeEditModal.classList.remove('hidden');
        
        // Focus the input field after modal is shown
        setTimeout(() => {
            nodeValueInput.focus();
            nodeValueInput.select();
        }, 100);
    }

    function closeNodeEditModal() {
        nodeEditModal.classList.add('hidden');
        currentlyEditingNode = null;
    }

    function updateNodeValue(node, newValue) {
        if (currentTreeType === 'BST') {
            const bstValues = [];
            function getValues(n) { if (!n) return; bstValues.push(n.value); getValues(n.left); getValues(n.right); }
            getValues(currentRoot);
            const index = bstValues.indexOf(node.value);
            if (index > -1) bstValues[index] = newValue;
            treeInput.value = bstValues.join(', ');
        } else if (currentTreeType === 'MARY') {
            node.value = newValue;
            const newArray = maryTreeToLevelOrderArray(currentRoot, currentMValue);
            treeInput.value = newArray.map(v => v === null ? 'null' : v).join(', ');
        } else {
            node.value = newValue;
            const newArray = treeToLevelOrderArray(currentRoot);
            treeInput.value = newArray.map(v => v === null ? 'null' : v).join(', ');
        }
        visualizeBtn.click();
    }

    function addChildNode(node, side) {
        node[side] = new Node(0);
        node[side].parent = node;
        const newArray = treeToLevelOrderArray(currentRoot);
        treeInput.value = newArray.map(v => v === null ? 'null' : v).join(', ');
        visualizeBtn.click();
    }

    function deleteNodeAndDescendants(node) {
        if (!node.parent) {
            currentRoot = null;
        } else {
            if (node.parent.left === node) {
                node.parent.left = null;
            } else {
                node.parent.right = null;
            }
        }
        const newArray = treeToLevelOrderArray(currentRoot);
        treeInput.value = newArray.map(v => v === null ? 'null' : v).join(', ');
        visualizeBtn.click();
    }
    
    // Listeners for mobile edit modal
    saveNodeBtn.addEventListener('click', () => {
        if (!currentlyEditingNode) return;
        
        if (currentTreeType === 'GRAPH') {
            const newValue = nodeValueInput.value.trim();
            if (newValue !== '' && newValue.length <= 3 && currentlyEditingNode.value !== newValue) {
                const success = updateGraphNodeValue(currentlyEditingNode, newValue);
                if (success) {
                    closeNodeEditModal();
                }
            } else if (newValue.length > 3) {
                showToast('Node value must be 3 characters or less.', 'error');
            }
        } else {
            const newValue = Number(nodeValueInput.value);
            if (!isNaN(newValue) && currentlyEditingNode.value !== newValue) {
                updateNodeValue(currentlyEditingNode, newValue);
            }
            closeNodeEditModal();
        }
    });

    addLeftChildBtn.addEventListener('click', () => {
        if (currentlyEditingNode) {
            addChildNode(currentlyEditingNode, 'left');
        }
        closeNodeEditModal();
    });

    addRightChildBtn.addEventListener('click', () => {
        if (currentlyEditingNode) {
            addChildNode(currentlyEditingNode, 'right');
        }
        closeNodeEditModal();
    });

    deleteNodeBtn.addEventListener('click', () => {
        if (currentlyEditingNode) {
            if (currentTreeType === 'MARY') {
                deleteMaryNode(currentlyEditingNode);
            } else if (currentTreeType === 'GRAPH') {
                deleteGraphNode(currentlyEditingNode);
            } else {
                deleteNodeAndDescendants(currentlyEditingNode);
            }
        }
        closeNodeEditModal();
    });

    addMaryChildBtn.addEventListener('click', () => {
        if (currentlyEditingNode) {
            if (currentTreeType === 'MARY') {
                addMaryChild(currentlyEditingNode);
            } else if (currentTreeType === 'GRAPH') {
                addGraphNodeConnectedTo(currentlyEditingNode);
            }
        }
        closeNodeEditModal();
    });
    
    closeNodeModalBtn.addEventListener('click', closeNodeEditModal);
    nodeEditModal.addEventListener('click', (e) => {
        if (e.target === nodeEditModal) closeNodeEditModal();
    });


    
    // --- Pan and Zoom Handlers ---
    function updateTransform() {
        if (masterGroup) {
            masterGroup.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${scale})`);
        }
    }
    canvasContainer.addEventListener('mousedown', (e) => { isPanning = true; startX = e.clientX - translateX; startY = e.clientY - translateY; canvasContainer.classList.add('panning'); });
    canvasContainer.addEventListener('mousemove', (e) => { if (!isPanning) return; e.preventDefault(); translateX = e.clientX - startX; translateY = e.clientY - startY; updateTransform(); });
    canvasContainer.addEventListener('mouseup', () => { isPanning = false; canvasContainer.classList.remove('panning'); });
    canvasContainer.addEventListener('mouseleave', () => { isPanning = false; canvasContainer.classList.remove('panning'); });
    canvasContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomFactor = 1.1;
        const { clientX, clientY } = e;
        const rect = canvasContainer.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const newScale = e.deltaY < 0 ? scale * zoomFactor : scale / zoomFactor;
        translateX = x - (x - translateX) * (newScale / scale);
        translateY = y - (y - translateY) * (newScale / scale);
        scale = newScale;
        updateTransform();
    });

    // --- Toast Notification Logic ---
    function showToast(message, type = 'info') {
        const colors = {
            success: 'bg-green-600',
            error: 'bg-red-600',
            info: 'bg-cyan-600'
        };
        const toast = document.createElement('div');
        toast.className = `glass-panel ${colors[type]} text-white px-4 py-2 rounded-lg shadow-xl transition-all duration-300 opacity-0 transform translate-y-5`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.classList.remove('opacity-0', 'translate-y-5');
        });

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-5');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 2000);
    }

    // --- Event Listeners ---
    visualizeBtn.addEventListener('click', () => {
        const rawInput = treeInput.value;
        
        if (currentTreeType === 'MARY') {
            currentMValue = parseInt(mValueInput.value) || 3;
            if (currentMValue < 2 || currentMValue > 10) {
                showToast('M value must be between 2 and 10.', 'error');
                return;
            }
        }
        
        const parsedArr = parseInput(rawInput, currentTreeType);
        
        if (currentTreeType !== 'TRIE' && parsedArr.includes('error')) {
            showToast('Invalid input. Please use numbers and commas only.', 'error');
            currentRoot = null; clearCanvas(); generatePyBtn.classList.add('hidden'); return;
        }

        if (currentTreeType === 'BST' || currentTreeType === 'BT') {
            const cleanArr = parsedArr.filter(val => val !== null);
            if (currentTreeType === 'BST' && new Set(cleanArr).size !== cleanArr.length) {
                showToast('BST input cannot contain duplicate values.', 'error');
                currentRoot = null; clearCanvas(); generatePyBtn.classList.add('hidden'); return;
            }
            currentRoot = (currentTreeType === 'BST') ? buildBST(cleanArr) : buildTreeFromLevelOrder(parsedArr);
            drawTree(currentRoot);
        } else if (currentTreeType === 'TRIE') {
            currentRoot = buildTrie(parsedArr);
            drawTrie(currentRoot);
        } else if (currentTreeType === 'MARY') {
            currentRoot = buildMaryTreeFromLevelOrder(parsedArr, currentMValue);
            drawMaryTree(currentRoot, currentMValue);
        } else if (currentTreeType === 'GRAPH') {
            const format = isEdgeListFormat ? 'edge-list' : 'adjacency-list';
            const validation = validateGraphInput(rawInput, format);
            if (!validation.valid) {
                showToast(validation.error, 'error');
                currentGraph = null; clearCanvas(); generatePyBtn.classList.add('hidden'); return;
            }
            
            currentGraph = isEdgeListFormat ? buildGraphFromEdgeList(rawInput) : buildGraphFromAdjacencyList(rawInput);
            // For undirected graphs, normalize and reflect reciprocity in the input box
            if (!isDirectedGraph) {
                updateGraphInputFromCurrentGraph();
            }
            drawGraph(currentGraph);
        } else if (currentTreeType === 'ALG' && (currentAlgorithm === 'DFS' || currentAlgorithm === 'BFS' || currentAlgorithm === 'TRAVERSAL')) {
            const arr = parseInput(rawInput, 'BT');
            if (!arr || arr.length === 0 || arr[0] === null || arr.includes('error')) {
                showToast('Please enter a valid level-order tree.', 'error');
                currentRoot = null; clearCanvas(); generatePyBtn.classList.add('hidden'); return;
            }
            currentRoot = buildTreeFromLevelOrder(arr);
            drawTreeTraversal(currentRoot, null);
            showToast('Tree ready for simulation.', 'success');
        } else if (currentTreeType === 'ALG' && currentAlgorithm === 'BINARY_SEARCH') {
            const arr = parseNumberArray(rawInput);
            if (arr === null || arr.length === 0) { showToast('Please enter a valid number array.', 'error'); return; }
            const sorted = [...arr].sort((a, b) => a - b);
            currentArray = sorted;
            drawArrayGrid(sorted, {});
            showToast('Array ready for simulation.', 'success');
        }
        
        if(currentRoot) {
            showToast('Visualization complete!', 'success');
        }
    });

    window.addEventListener('resize', () => { 
        if(currentRoot) { 
            if (currentTreeType === 'TRIE') {
                drawTrie(currentRoot);
            } else if (currentTreeType === 'MARY') {
                drawMaryTree(currentRoot, currentMValue);
            } else if (currentTreeType === 'ALG') {
                // For algorithm modes that use a tree, redraw traversal-aware view
                drawTreeTraversal(currentRoot, null);
            } else {
                drawTree(currentRoot); 
            }
        } else if (currentGraph) {
            drawGraph(currentGraph);
        }
    });

    // Balance BST Logic
    function balanceBST(root) {
        const sortedValues = [];
        function inOrderTraversal(node) {
            if (!node) return;
            inOrderTraversal(node.left);
            sortedValues.push(node.value);
            inOrderTraversal(node.right);
        }
        inOrderTraversal(root);

        function buildBalancedTree(values) {
            if (!values.length) return null;
            const midIndex = Math.floor(values.length / 2);
            const node = new Node(values[midIndex]);
            node.left = buildBalancedTree(values.slice(0, midIndex));
            if (node.left) node.left.parent = node;
            node.right = buildBalancedTree(values.slice(midIndex + 1));
            if (node.right) node.right.parent = node;
            return node;
        }
        return buildBalancedTree(sortedValues);
    }

    balanceBstBtn.addEventListener('click', () => {
        if (!currentRoot || currentTreeType !== 'BST') {
            showToast('Can only balance a Binary Search Tree.', 'error');
            return;
        }
        currentRoot = balanceBST(currentRoot);
        const newArray = treeToLevelOrderArray(currentRoot);
        treeInput.value = newArray.map(v => v === null ? 'null' : v).join(', ');
        drawTree(currentRoot);
        showToast('BST has been balanced!', 'success');
    });


    // --- Python Code Generation ---
    function generatePythonCode(dataStructure) {
        if (!dataStructure) return { detailed: "# Data structure is empty", oneliner: "# Data structure is empty" };
        
        if (currentTreeType === 'GRAPH') {
            if (!currentGraph) return { detailed: "# Graph is empty", oneliner: "# Graph is empty" };
            
            let detailedCode = 'class GraphNode:\n';
            detailedCode += '    def __init__(self, val):\n';
            detailedCode += '        self.val = val\n';
            detailedCode += '        self.neighbors = []\n\n';
            
            const nodeMap = new Map();
            const creationLines = [];
            const connectionLines = [];
            
            // Create nodes
            currentGraph.nodes.forEach((node, index) => {
                const nodeName = `node_${index}`;
                nodeMap.set(node.value, nodeName);
                creationLines.push(`${nodeName} = GraphNode("${node.value}")`);
            });
            
            // Create adjacency list (reflect reciprocity for undirected graphs)
            const adjacencyList = {};
            currentGraph.nodes.forEach(node => {
                adjacencyList[node.value] = [];
            });
            currentGraph.edges.forEach(edge => {
                if (!adjacencyList[edge.from]) adjacencyList[edge.from] = [];
                adjacencyList[edge.from].push(edge.to);
                if (!isDirectedGraph) {
                    if (!adjacencyList[edge.to]) adjacencyList[edge.to] = [];
                    adjacencyList[edge.to].push(edge.from);
                }
            });
            // Deduplicate and sort neighbors for stable output
            Object.keys(adjacencyList).forEach(node => {
                const uniq = Array.from(new Set(adjacencyList[node]));
                uniq.sort((a, b) => a.localeCompare(b));
                adjacencyList[node] = uniq;
            });
            
            // Add connections
            Object.entries(adjacencyList).sort((a, b) => a[0].localeCompare(b[0])).forEach(([nodeValue, neighbors]) => {
                if (neighbors.length > 0) {
                    const nodeName = nodeMap.get(nodeValue);
                    const neighborNames = neighbors.map(n => nodeMap.get(n));
                    connectionLines.push(`${nodeName}.neighbors = [${neighborNames.join(', ')}]`);
                }
            });
            
            detailedCode += '# Node definitions\n' + creationLines.join('\n') + '\n\n# Connections\n' + connectionLines.join('\n');
            
            // One-liner representation
            const adjacencyStr = Object.entries(adjacencyList)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([node, neighbors]) => `"${node}": [${neighbors.map(n => `"${n}"`).join(', ')}]`)
                .join(', ');
            const oneLiner = `graph = {${adjacencyStr}}`;
            
            return { detailed: detailedCode, oneliner: oneLiner };
        }
        
        let detailedCode = 'class TreeNode:\n';

        if (currentTreeType === 'MARY') {
            detailedCode = 'class MaryNode:\n';
            detailedCode += '    def __init__(self, val=0, children=None):\n';
            detailedCode += '        self.val = val\n';
            detailedCode += '        self.children = children if children is not None else []\n\n';
            
            const nodesToProcess = [dataStructure];
            const nodeMap = new Map();
            nodeMap.set(dataStructure, 'root');
            let nodeId = 0;
            const creationLines = [`root = MaryNode(${dataStructure.value})`];
            const connectionLines = [];
            
            while (nodesToProcess.length > 0) {
                const currentNode = nodesToProcess.shift();
                const parentName = nodeMap.get(currentNode);
                
                if (currentNode.children && currentNode.children.length > 0) {
                    const childNames = [];
                    currentNode.children.forEach((child, index) => {
                        nodeId++;
                        const childName = `node_${nodeId}`;
                        nodeMap.set(child, childName);
                        creationLines.push(`${childName} = MaryNode(${child.value})`);
                        childNames.push(childName);
                        nodesToProcess.push(child);
                    });
                    connectionLines.push(`${parentName}.children = [${childNames.join(', ')}]`);
                }
            }
            
            detailedCode += '# Node definitions\n' + creationLines.join('\n') + '\n\n# Connections\n' + connectionLines.join('\n');
            
            function generateMaryOneLiner(node) {
                if (!node.children || node.children.length === 0) return `MaryNode(${node.value})`;
                const childrenStr = node.children.map(child => generateMaryOneLiner(child)).join(', ');
                return `MaryNode(${node.value}, [${childrenStr}])`;
            }
            
            const oneLiner = `root = ${generateMaryOneLiner(dataStructure)}`;
            return { detailed: detailedCode, oneliner: oneLiner };
        } else {
            detailedCode += '    def __init__(self, val=0, left=None, right=None):\n';
            detailedCode += '        self.val = val\n';
            detailedCode += '        self.left = left\n';
            detailedCode += '        self.right = right\n\n';
            const nodesToProcess = [dataStructure];
            const nodeMap = new Map();
            nodeMap.set(dataStructure, 'root');
            let nodeId = 0;
            const creationLines = [`root = TreeNode(${dataStructure.value})`];
            const connectionLines = [];
            while (nodesToProcess.length > 0) {
                const currentNode = nodesToProcess.shift();
                const parentName = nodeMap.get(currentNode);
                if (currentNode.left) {
                    nodeId++; const leftChildName = `node_${nodeId}`;
                    nodeMap.set(currentNode.left, leftChildName);
                    creationLines.push(`${leftChildName} = TreeNode(${currentNode.left.value})`);
                    connectionLines.push(`${parentName}.left = ${leftChildName}`);
                    nodesToProcess.push(currentNode.left);
                }
                if (currentNode.right) {
                    nodeId++; const rightChildName = `node_${nodeId}`;
                    nodeMap.set(currentNode.right, rightChildName);
                    creationLines.push(`${rightChildName} = TreeNode(${currentNode.right.value})`);
                    connectionLines.push(`${parentName}.right = ${rightChildName}`);
                    nodesToProcess.push(currentNode.right);
                }
            }
            detailedCode += '# Node definitions\n' + creationLines.join('\n') + '\n\n# Connections\n' + connectionLines.join('\n');
            function generateOneLiner(node) {
                if (!node) return 'None';
                if (!node.left && !node.right) return `TreeNode(${node.value})`;
                return `TreeNode(${node.value}, ${generateOneLiner(node.left)}, ${generateOneLiner(node.right)})`;
            }
            const oneLiner = `root = ${generateOneLiner(dataStructure)}`;
            return { detailed: detailedCode, oneliner: oneLiner };
        }
    }

    generatePyBtn.addEventListener('click', () => {
        if (!currentRoot && !currentGraph) { 
            showToast("Please visualize a data structure first.", "error"); 
            return; 
        }
        if (currentTreeType === 'TRIE') {
            showToast("Code generation not available for Tries.", "error");
            return;
        }
        const { detailed, oneliner } = generatePythonCode(currentTreeType === 'GRAPH' ? currentGraph : currentRoot);
        pythonCodeDetailed.textContent = detailed;
        pythonCodeOneliner.textContent = oneliner;
        codeModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => codeModal.classList.add('hidden'));
    codeModal.addEventListener('click', (e) => { if (e.target === codeModal) { codeModal.classList.add('hidden'); } });
    
    // --- Modal Logic ---
    function showAboutModal() {
        aboutModal.classList.remove('opacity-0', 'pointer-events-none');
        requestAnimationFrame(() => aboutModal.classList.add('show'));
    }
    function hideAboutModal() {
        aboutModal.classList.remove('show');
        setTimeout(() => aboutModal.classList.add('opacity-0', 'pointer-events-none'), 300);
    }
    
    function showDsInfoModal() {
        const info = dsInfoData[currentTreeType];
        if (info) {
            dsInfoTitle.innerHTML = info.title;
            dsInfoContent.innerHTML = info.content;
            dsInfoModal.classList.remove('opacity-0', 'pointer-events-none');
            requestAnimationFrame(() => dsInfoModal.classList.add('show'));
        }
    }
    function hideDsInfoModal() {
        dsInfoModal.classList.remove('show');
        setTimeout(() => dsInfoModal.classList.add('opacity-0', 'pointer-events-none'), 300);
    }

    homeAboutBtn.addEventListener('click', showAboutModal);
    mobileAboutBtn.addEventListener('click', showAboutModal);
    function openSearch() {
        searchModal.classList.remove('hidden');
        searchModal.classList.add('show');
        setTimeout(() => { searchInput.focus(); }, 50);
    }
    function closeSearch() {
        searchModal.classList.remove('show');
        searchModal.classList.add('hidden');
        searchResults.innerHTML = '';
        searchInput.value = '';
    }
    if (homeSearchBtn) homeSearchBtn.addEventListener('click', openSearch);
    if (mobileSearchBtn) mobileSearchBtn.addEventListener('click', () => { openSearch(); mobileMenu.classList.add('hidden'); });
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
    if (searchModal) searchModal.addEventListener('click', (e) => { if (e.target === searchModal) closeSearch(); });

    const SEARCH_INDEX = [
        { label: 'Binary Tree', path: '/binarytree', keywords: ['bt','binary tree','tree'] },
        { label: 'Binary Search Tree', path: '/binarysearchtree', keywords: ['bst','binary search tree','search'] },
        { label: 'Trie', path: '/trie', keywords: ['trie','prefix','string'] },
        { label: 'M-ary Tree', path: '/marytree', keywords: ['mary','m-ary','n-ary','multi'] },
        { label: 'Graph', path: '/graph', keywords: ['graph','nodes','edges'] },
        { label: 'Binary Search (Algorithm)', path: '/binarysearch', keywords: ['binary search','search array','algorithm'] },
        { label: 'Depth First Search (Algorithm)', path: '/depthfirstsearch', keywords: ['dfs','depth first search','algorithm'] },
        { label: 'Breadth First Search (Algorithm)', path: '/breadthfirstsearch', keywords: ['bfs','breadth first search','algorithm'] },
        { label: 'Tree Traversals (Algorithm)', path: '/treetraversals', keywords: ['traversal','preorder','inorder','postorder','algorithm'] }
    ];
    function renderSearchResults(items) {
        searchResults.innerHTML = '';
        if (!items.length) {
            const empty = document.createElement('div');
            empty.className = 'text-slate-400 text-sm py-2';
            empty.textContent = 'No matches';
            searchResults.appendChild(empty);
            return;
        }
        items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'result-item px-3 py-2 text-slate-200';
            row.textContent = item.label;
            row.addEventListener('click', () => {
                closeSearch();
                // Navigate via router
                setRoutePath(item.path);
                applyRoute(getCurrentRoutePath());
            });
            searchResults.appendChild(row);
        });
    }
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value.trim().toLowerCase();
            if (!q) { searchResults.innerHTML = ''; return; }
            const matches = SEARCH_INDEX.filter(it =>
                it.label.toLowerCase().includes(q) || it.keywords.some(k => k.includes(q))
            );
            renderSearchResults(matches);
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearch();
        });
    }
    closeAboutModalBtn.addEventListener('click', hideAboutModal);
    aboutModal.addEventListener('click', (e) => { if (e.target === aboutModal) hideAboutModal(); });
    
    visualizerInfoBtn.addEventListener('click', showDsInfoModal);
    closeDsInfoModalBtn.addEventListener('click', hideDsInfoModal);
    dsInfoModal.addEventListener('click', (e) => { if (e.target === dsInfoModal) hideDsInfoModal(); });


    function copyToClipboard(text, button) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            button.textContent = 'Copied!';
        } catch (err) {
            button.textContent = 'Failed!';
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textarea);
        setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    }
    copyDetailedBtn.addEventListener('click', () => copyToClipboard(pythonCodeDetailed.textContent, copyDetailedBtn));
    copyOnelinerBtn.addEventListener('click', () => copyToClipboard(pythonCodeOneliner.textContent, copyOnelinerBtn));
    
    // --- Algorithms: Binary Search bindings ---
    if (generateDefaultArrayBtn) {
        generateDefaultArrayBtn.addEventListener('click', () => {
            if (currentTreeType === 'ALG' && currentAlgorithm === 'BINARY_SEARCH') {
                const arr = generateDefaultSortedArray(50);
                currentArray = arr;
                treeInput.value = arr.join(', ');
                showToast('Generated a default sorted array of length 50.', 'success');
                if (algoTargetInput) algoTargetInput.value = '12';
            } else if (currentTreeType === 'ALG' && (currentAlgorithm === 'DFS' || currentAlgorithm === 'BFS')) {
                const arr = generateDefaultTraversalTreeArray();
                treeInput.value = arr.map(v => v === null ? 'null' : v).join(', ');
                showToast('Loaded default tree.', 'success');
                if (algoTargetInput) algoTargetInput.value = '12';
            } else if (currentTreeType === 'ALG' && currentAlgorithm === 'TRAVERSAL') {
                const arr = generateDefaultTraversalTreeArray();
                treeInput.value = arr.map(v => v === null ? 'null' : v).join(', ');
                showToast('Loaded default tree.', 'success');
            }
        });
    }
    if (startSimulationBtn) {
        startSimulationBtn.addEventListener('click', async () => {
            if (currentTreeType !== 'ALG') return;
            if (currentAlgorithm === 'BINARY_SEARCH') {
                const arr = parseNumberArray(treeInput.value);
                if (arr === null || arr.length === 0) { showToast('Please enter a valid number array.', 'error'); return; }
                const targetRaw = (algoTargetInput && typeof algoTargetInput.value === 'string') ? algoTargetInput.value.trim() : '';
                if (targetRaw === '' || isNaN(Number(targetRaw))) { showAlgoModal('Please enter a target value.', { showOk: true }); return; }
                const target = Number(targetRaw);
                const sorted = [...arr].sort((a, b) => a - b);
                currentArray = sorted;
                drawArrayGrid(sorted, {});
                await new Promise(r => setTimeout(r, 500));
                await runBinarySearchSimulation(sorted, target);
            } else if (currentAlgorithm === 'DFS' || currentAlgorithm === 'BFS') {
                const arr = parseInput(treeInput.value, 'BT');
                if (!arr || arr.length === 0 || arr[0] === null || arr.includes('error')) { showToast('Please enter a valid level-order tree.', 'error'); return; }
                const root = buildTreeFromLevelOrder(arr);
                currentRoot = root;
                drawTreeTraversal(root, null);
                const targetRaw = (algoTargetInput && typeof algoTargetInput.value === 'string') ? algoTargetInput.value.trim() : '';
                if (targetRaw === '' || isNaN(Number(targetRaw))) { showAlgoModal('Please enter a target value.', { showOk: true }); return; }
                const target = Number(targetRaw);
                await new Promise(r => setTimeout(r, 500));
                if (currentAlgorithm === 'DFS') await runDfsSimulation(root, target);
                else await runBfsSimulation(root, target);
            } else if (currentAlgorithm === 'TRAVERSAL') {
                const arr = parseInput(treeInput.value, 'BT');
                if (!arr || arr.length === 0 || arr[0] === null || arr.includes('error')) { showToast('Please enter a valid level-order tree.', 'error'); return; }
                if (arr.filter(v => v !== null).length > 30) { showToast('Maximum 30 nodes allowed for traversal.', 'error'); return; }
                const root = buildTreeFromLevelOrder(arr);
                currentRoot = root;
                drawTreeTraversal(root, null);
                await new Promise(r => setTimeout(r, 500));
                await runTraversalSimulation(root);
            }
        });
    }

    // Traversal buttons
    if (preorderBtn) preorderBtn.addEventListener('click', () => {
        currentTraversalType = 'PRE';
        preorderBtn.className = 'flex-1 bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        inorderBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        postorderBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
    });
    if (inorderBtn) inorderBtn.addEventListener('click', () => {
        currentTraversalType = 'IN';
        inorderBtn.className = 'flex-1 bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        preorderBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        postorderBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
    });
    if (postorderBtn) postorderBtn.addEventListener('click', () => {
        currentTraversalType = 'POST';
        postorderBtn.className = 'flex-1 bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        preorderBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
        inorderBtn.className = 'flex-1 bg-slate-700/80 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm';
    });

    function getNodePath(root, targetValue) {
        const path = [];
        let found = false;
        function dfs(node) {
            if (!node || found) return false;
            if (node.value === targetValue) { found = true; return true; }
            path.push('left');
            if (dfs(node.left)) return true;
            path.pop();
            path.push('right');
            if (dfs(node.right)) return true;
            path.pop();
            return false;
        }
        dfs(root);
        return 'root' + (path.length ? '.' + path.join('.') : '');
    }

    function drawTreeTraversal(root, highlightValue, traversalVisitedValues = null) {
        // Reuse drawTree but color by value highlight
        clearCanvas();
        if (!root) return;
        const originalGenerateBtnState = generatePyBtn.classList.contains('hidden');
        // Hide code button for algorithm modes; only show for DS (except graph already disabled elsewhere)
        if (currentTreeType === 'ALG') {
            generatePyBtn.classList.add('hidden');
        }
        const svgNS = "http://www.w3.org/2000/svg";
        masterGroup = document.createElementNS(svgNS, 'g');
        canvas.appendChild(masterGroup);
        const nodeRadius = 20;
        const horizontalSpacing = 50;
        const verticalSpacing = 80;
        const depth = getTreeDepth(root);
        const requiredWidth = Math.pow(2, depth - 1) * horizontalSpacing;
        const nodes = [];
        const edges = [];
        function assign(node, level, index) {
            if (!node) return;
            node.y = level * verticalSpacing;
            const nodesAtLevel = Math.pow(2, level);
            const segmentWidth = requiredWidth / nodesAtLevel;
            node.x = segmentWidth * (index - (nodesAtLevel - 1) / 2);
            nodes.push(node);
            if (node.left) { edges.push({ from: node, to: node.left }); assign(node.left, level + 1, index * 2); }
            if (node.right) { edges.push({ from: node, to: node.right }); assign(node.right, level + 1, index * 2 + 1); }
        }
        assign(root, 0, 0);
        let minX = Infinity, maxX = -Infinity, maxY = -Infinity;
        nodes.forEach(n => { minX = Math.min(minX, n.x); maxX = Math.max(maxX, n.x); maxY = Math.max(maxY, n.y); });
        const treeWidth = maxX - minX;
        const treeHeight = maxY;
        const canvasWidth = canvasContainer.clientWidth;
        const canvasHeight = canvasContainer.clientHeight;
        const scaleX = canvasWidth / (treeWidth + horizontalSpacing * 2);
        const scaleY = canvasHeight / (treeHeight + verticalSpacing * 2);
        scale = Math.min(1, scaleX, scaleY);
        translateX = (canvasWidth / 2) - (minX * scale + treeWidth * scale / 2);
        translateY = (canvasHeight - treeHeight * scale) / 2;
        updateTransform();

        // Optional traversal output row at top (only for traversal algorithm)
        if (currentTreeType === 'ALG' && currentAlgorithm === 'TRAVERSAL') {
            const outputGroup = document.createElementNS(svgNS, 'g');
            outputGroup.setAttribute('class', 'traversal-output-row');
            // Align midpoint between 4th and 5th box above the root (screen coords)
            const rootScreenX = translateX + scale * 0 + scale * 0 + scale * 0 + scale * (0 + (root && typeof root.x === 'number' ? root.x : 0));
            outputGroup.setAttribute('transform', `translate(${rootScreenX}, ${50}) scale(1)`);
            canvas.appendChild(outputGroup);
            // Build list of nodes in level order just to count; we'll fill externally during simulation
            const nodesList = [];
            (function collect(n){ if(!n) return; nodesList.push(n); collect(n.left); collect(n.right);} )(root);
            const boxW = 30, boxH = 30, gap = 6;
            const perRow = isMobile() ? 8 : nodesList.length;
            const rows = Math.ceil(nodesList.length / perRow);
            for (let i = 0; i < nodesList.length; i++) {
                const row = Math.floor(i / perRow);
                const col = i % perRow;
                const isLastRow = row === rows - 1;
                const columnsInThisRow = isLastRow ? (nodesList.length - row * perRow) : perRow;
                const rowWidth = columnsInThisRow * (boxW + gap) - gap;
                const rowStartX = -rowWidth / 2;
                const x = rowStartX + col * (boxW + gap);
                const y = row * (boxH + gap);

                const cell = document.createElementNS(svgNS, 'g');
                cell.setAttribute('class', 'array-cell traversal-output');
                cell.setAttribute('transform', `translate(${x}, ${y})`);
                const rect = document.createElementNS(svgNS, 'rect');
                rect.setAttribute('width', boxW);
                rect.setAttribute('height', boxH);
                rect.setAttribute('rx', 6);
                rect.setAttribute('ry', 6);
                rect.setAttribute('fill', '#0b1220');
                rect.setAttribute('stroke', '#6366f1');
                rect.setAttribute('stroke-width', '2');
                const t = document.createElementNS(svgNS, 'text');
                t.setAttribute('x', boxW/2);
                t.setAttribute('y', boxH/2);
                t.setAttribute('dy', '.3em');
                t.setAttribute('text-anchor', 'middle');
                t.setAttribute('fill', '#f1f5f9');
                if (Array.isArray(traversalVisitedValues) && i < traversalVisitedValues.length) {
                    t.textContent = String(traversalVisitedValues[i]);
                } else {
                    t.textContent = '';
                }
                cell.appendChild(rect); cell.appendChild(t);
                outputGroup.appendChild(cell);
            }
            canvas.dataset.traversalCells = nodesList.length;
        }
        edges.forEach(edge => {
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', edge.from.x);
            line.setAttribute('y1', edge.from.y);
            line.setAttribute('x2', edge.to.x);
            line.setAttribute('y2', edge.to.y);
            line.setAttribute('class', 'edge');
            masterGroup.appendChild(line);
        });
        nodes.forEach(node => {
            const g = document.createElementNS(svgNS, 'g');
            g.setAttribute('class', 'node');
            g.setAttribute('transform', `translate(${node.x}, ${node.y})`);
            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('r', nodeRadius);
            let fillColor = '#0f172a';
            if (highlightValue && highlightValue.value === node.value) {
                fillColor = highlightValue.color === 'found' ? '#064e3b' : '#854d0e';
            } else if (highlightValue === node.value) {
                fillColor = '#854d0e';
            }
            circle.setAttribute('fill', fillColor);
            const text = document.createElementNS(svgNS, 'text');
            text.setAttribute('dy', '.3em');
            text.setAttribute('text-anchor', 'middle');
            text.textContent = node.value;
            g.appendChild(circle);
            g.appendChild(text);
            masterGroup.appendChild(g);
        });
        if (!originalGenerateBtnState && currentTreeType !== 'ALG') generatePyBtn.classList.remove('hidden');
    }

    async function runDfsSimulation(root, target) {
        const stack = [root];
        const visited = new Set();
        while (stack.length) {
            const node = stack.pop();
            if (!node || visited.has(node)) continue;
            visited.add(node);
            drawTreeTraversal(root, node.value);
            await sleep(1000);
            if (node.value === target) {
                drawTreeTraversal(root, { value: node.value, color: 'found' });
                await sleep(1000);
                const pathStr = getNodePath(root, target);
                showAlgoModal(`Found target <strong>${target}</strong> at node <strong>${pathStr}</strong>.`, { showOk: true });
                await new Promise(resolve => {
                    const okBtn = document.getElementById('algo-step-modal-ok');
                    if (!okBtn) { resolve(); return; }
                    const handler = () => { okBtn.removeEventListener('click', handler); hideAlgoModal(); resolve(); };
                    okBtn.addEventListener('click', handler);
                });
                return;
            }
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        showAlgoModal(`Target <strong>${target}</strong> not found.`, { showOk: true });
        await new Promise(resolve => {
            const okBtn = document.getElementById('algo-step-modal-ok');
            if (!okBtn) { resolve(); return; }
            const handler = () => { okBtn.removeEventListener('click', handler); hideAlgoModal(); resolve(); };
            okBtn.addEventListener('click', handler);
        });
    }

    async function runBfsSimulation(root, target) {
        const queue = [root];
        const visited = new Set();
        while (queue.length) {
            const node = queue.shift();
            if (!node || visited.has(node)) continue;
            visited.add(node);
            drawTreeTraversal(root, node.value);
            await sleep(1000);
            if (node.value === target) {
                drawTreeTraversal(root, { value: node.value, color: 'found' });
                await sleep(1000);
                const pathStr = getNodePath(root, target);
                showAlgoModal(`Found target <strong>${target}</strong> at node <strong>${pathStr}</strong>.`, { showOk: true });
                await new Promise(resolve => {
                    const okBtn = document.getElementById('algo-step-modal-ok');
                    if (!okBtn) { resolve(); return; }
                    const handler = () => { okBtn.removeEventListener('click', handler); hideAlgoModal(); resolve(); };
                    okBtn.addEventListener('click', handler);
                });
                return;
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        showAlgoModal(`Target <strong>${target}</strong> not found.`, { showOk: true });
        await new Promise(resolve => {
            const okBtn = document.getElementById('algo-step-modal-ok');
            if (!okBtn) { resolve(); return; }
            const handler = () => { okBtn.removeEventListener('click', handler); hideAlgoModal(); resolve(); };
            okBtn.addEventListener('click', handler);
        });
    }

    let currentTraversalType = 'PRE';
    function getTraversalOrder(root, type) {
        const result = [];
        const visit = (n) => { if (!n) return; result.push(n.value); };
        function pre(n){ if(!n) return; result.push(n.value); pre(n.left); pre(n.right);} 
        function ino(n){ if(!n) return; ino(n.left); result.push(n.value); ino(n.right);} 
        function post(n){ if(!n) return; post(n.left); post(n.right); result.push(n.value);} 
        if (type === 'PRE') pre(root); else if (type === 'IN') ino(root); else post(root);
        return result;
    }

    async function runTraversalSimulation(root) {
        // Ask user for type via simple buttons if not present; reuse three buttons in a mini prompt modal
        let type = 'PRE';
        // Prefer a quick prompt for now
        type = currentTraversalType;
        const order = getTraversalOrder(root, type);
        // Fill output boxes above
        const svg = canvas; // root svg
        const cells = svg.querySelectorAll('.traversal-output');
        const visited = [];
        for (let i = 0; i < order.length; i++) {
            visited.push(order[i]);
            drawTreeTraversal(root, order[i], visited);
            await sleep(1000);
        }
        showAlgoModal(`Traversal result: [${order.join(', ')}]`, { showOk: true });
        await new Promise(resolve => {
            const okBtn = document.getElementById('algo-step-modal-ok');
            if (!okBtn) { resolve(); return; }
            const handler = () => { okBtn.removeEventListener('click', handler); hideAlgoModal(); resolve(); };
            okBtn.addEventListener('click', handler);
        });
    }
});

