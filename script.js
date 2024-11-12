// Helper function for random array element selection
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

document.addEventListener('DOMContentLoaded', initializePark);

function initializePark() {
    createVegetation();
    setupInteractions();
    startAnimations();
}

function createVegetation() {
    generateGrassPatches();
    generateTrees();
    generateBushes();
}

// Generate grass throughout the park
function generateGrassPatches() {
    const grassGrid = document.querySelector('#grass-grid');
    const grassTemplate = createGrassPatchTemplate();

    for (let x = -20; x <= 20; x += 4) {
        for (let z = -20; z <= 20; z += 4) {
            if (Math.random() > 0.3) { // 70% chance for grass
                const patch = grassTemplate.cloneNode(true);
                const randomScale = 0.8 + Math.random() * 0.4;
                
                patch.setAttribute('position', `${x} 0 ${z}`);
                patch.setAttribute('rotation', `0 ${Math.random() * 360} 0`);
                patch.setAttribute('scale', `${randomScale} ${randomScale} ${randomScale}`);
                
                grassGrid.appendChild(patch);
            }
        }
    }
}

// Create template for grass patches
function createGrassPatchTemplate() {
    const patch = document.createElement('a-entity');
    patch.classList.add('grass-patch');

    const grassBlades = [
        { color: '#4CAF50', height: 0.6, radius: 0.3, pos: '0 0.3 0' },
        { color: '#388E3C', height: 0.5, radius: 0.2, pos: '0.2 0.25 0.2' },
        { color: '#2E7D32', height: 0.4, radius: 0.25, pos: '-0.2 0.2 -0.2' }
    ];

    grassBlades.forEach(blade => {
        const cone = document.createElement('a-cone');
        cone.setAttribute('material', `color: ${blade.color}`);
        cone.setAttribute('height', blade.height);
        cone.setAttribute('radius-bottom', blade.radius);
        cone.setAttribute('position', blade.pos);
        patch.appendChild(cone);
    });

    return patch;
}

// Generate trees throughout the park
function generateTrees() {
    const treeGrid = document.querySelector('#tree-grid');
    const treeColors = ['#2E7D32', '#1B5E20', '#388E3C', '#43A047'];
    const trunkColors = ['#5D4037', '#4E342E', '#3E2723'];

    for (let x = -20; x <= 20; x += 8) {
        for (let z = -20; z <= 20; z += 8) {
            if (isRestrictedArea(x, z)) continue;

            if (Math.random() > 0.3) { // 70% chance for tree
                const tree = createTree(treeColors, trunkColors);
                const xPos = x + (Math.random() * 2 - 1);
                const zPos = z + (Math.random() * 2 - 1);

                tree.setAttribute('position', `${xPos} 0 ${zPos}`);
                tree.setAttribute('rotation', `0 ${Math.random() * 360} 0`);
                
                treeGrid.appendChild(tree);
            }
        }
    }
}

// Check if position is in a restricted area
function isRestrictedArea(x, z) {
    return (Math.abs(x) < 6 && Math.abs(z) < 15) || 
           (Math.abs(x-12) < 6 && Math.abs(z+10) < 6);
}

// Create a single tree entity
function createTree(treeColors, trunkColors) {
    const tree = document.createElement('a-entity');
    const scale = 0.5 + Math.random() * 1;
    const treeColor = getRandomElement(treeColors);
    const trunkColor = getRandomElement(trunkColors);

    // Add trunk
    const trunk = document.createElement('a-cylinder');
    trunk.setAttribute('material', `color: ${trunkColor}`);
    trunk.setAttribute('radius', 0.2 * scale);
    trunk.setAttribute('height', 2 * scale);
    trunk.setAttribute('position', `0 ${1 * scale} 0`);
    tree.appendChild(trunk);

    // Add foliage layers
    for (let i = 0; i < 3; i++) {
        const foliage = document.createElement('a-cone');
        foliage.setAttribute('material', `color: ${treeColor}`);
        foliage.setAttribute('radius-bottom', (1.2 - i * 0.2) * scale);
        foliage.setAttribute('radius-top', 0);
        foliage.setAttribute('height', 2 * scale);
        foliage.setAttribute('position', `0 ${(2 + i) * scale} 0`);
        tree.appendChild(foliage);
    }

    return tree;
}

// Generate bushes along pathways
function generateBushes() {
    const bushGrid = document.querySelector('#bush-grid');
    const bushColors = ['#2E7D32', '#388E3C', '#43A047'];

    for (let z = -15; z <= 15; z += 2) {
        if (Math.random() > 0.3) {
            ['left', 'right'].forEach(side => {
                const bush = document.createElement('a-sphere');
                bush.setAttribute('material', `color: ${getRandomElement(bushColors)}`);
                bush.setAttribute('radius', 0.3 + Math.random() * 0.2);
                
                const xOffset = side === 'left' ? -2.5 : 2.5;
                bush.setAttribute('position', `${xOffset} 0.3 ${z}`);
                
                bushGrid.appendChild(bush);
            });
        }
    }
}