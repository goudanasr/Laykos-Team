// Three.js Scene Setup for Lykos Team
let scene, camera, renderer, heroObject;
let sectionScene, sectionCamera, sectionRenderer, sectionObject;
let container, sectionContainer;

function init() {
    container = document.querySelector('#hero-3d-canvas-container');
    if (container) {
        // 1. Hero Scene & Camera
        scene = new THREE.Scene();
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 7;

        // 2. Renderer
        renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#hero-canvas'),
            alpha: true,
            antialias: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 3. Create the "Lykos Cyber Core"
        createHeroCore();

        // 4. Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const cyanLight = new THREE.PointLight(0x00f2fe, 5, 20);
        cyanLight.position.set(5, 5, 5);
        scene.add(cyanLight);

        const magentaLight = new THREE.PointLight(0xff0055, 3, 20);
        magentaLight.position.set(-5, -5, 5);
        scene.add(magentaLight);
    }

    // New 3D Section Initialization
    sectionContainer = document.querySelector('#advanced-3d-container');
    if (sectionContainer) {
        initAdvancedSection();
    }

    window.addEventListener('resize', onWindowResize);
    animate();
}

function createHeroCore() {
    heroObject = new THREE.Group();

    // Outer Geometric Shell (Icosahedron Wireframe)
    const shellGeo = new THREE.IcosahedronGeometry(2, 1);
    const shellMat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
        emissive: 0x00f2fe,
        emissiveIntensity: 0.5
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    heroObject.add(shell);

    // Inner Core (Floating Dodecahedron)
    const coreGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        roughness: 0,
        metalness: 1,
        emissive: 0x4facfe,
        emissiveIntensity: 1
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    heroObject.add(core);

    // Glowing Nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const nucleusMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x00f2fe,
        emissiveIntensity: 2,
        shininess: 100
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    heroObject.add(nucleus);

    // Orbiting Points (Data Particles)
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 6;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.8
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    heroObject.add(particles);

    scene.add(heroObject);
}

function initAdvancedSection() {
    sectionContainer = document.getElementById('advanced-3d-container');
    if (!sectionContainer) return;

    sectionScene = new THREE.Scene();
    sectionCamera = new THREE.PerspectiveCamera(75, sectionContainer.clientWidth / sectionContainer.clientHeight, 0.1, 1000);
    sectionCamera.position.z = 5;

    sectionRenderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('advanced-canvas'),
        alpha: true,
        antialias: true
    });
    sectionRenderer.setSize(sectionContainer.clientWidth, sectionContainer.clientHeight);
    sectionRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    sectionObject = new THREE.Group();

    // Central Tech Core
    const coreGeom = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMat = new THREE.MeshPhongMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    sectionObject.add(core);

    // Orbits
    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(2.5, 0.02, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.1 })
    );
    ring1.rotation.x = Math.PI / 2;
    sectionObject.add(ring1);

    // Squad Orbs (Simple & Professional)
    const orbGeom = new THREE.SphereGeometry(0.15, 16, 16);
    
    const goudaOrb = new THREE.Mesh(orbGeom, new THREE.MeshPhongMaterial({ color: 0x00f2fe, emissive: 0x00f2fe }));
    goudaOrb.position.set(2.5, 0, 0);
    goudaOrb.name = "GoudaOrb";
    sectionObject.add(goudaOrb);

    const yasserOrb = new THREE.Mesh(orbGeom, new THREE.MeshPhongMaterial({ color: 0x4facfe, emissive: 0x4facfe }));
    yasserOrb.position.set(-2.5, 0, 0);
    yasserOrb.name = "YasserOrb";
    sectionObject.add(yasserOrb);

    sectionScene.add(sectionObject);

    const light = new THREE.PointLight(0x00f2fe, 1);
    light.position.set(5, 5, 5);
    sectionScene.add(light);
    sectionScene.add(new THREE.AmbientLight(0x404040));
}

function onWindowResize() {
    if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    if (sectionContainer) {
        const width = sectionContainer.clientWidth;
        const height = sectionContainer.clientHeight;
        sectionCamera.aspect = width / height;
        sectionCamera.updateProjectionMatrix();
        sectionRenderer.setSize(width, height);
        sectionRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
}

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;

    if (heroObject) {
        heroObject.rotation.y += 0.004;
        heroObject.children[0].rotation.z += 0.008;
        heroObject.children[1].rotation.x -= 0.012;
        heroObject.children[2].scale.setScalar(1 + Math.sin(time * 3) * 0.15);
        heroObject.position.y = Math.sin(time * 2) * 0.15;
    }

    if (sectionObject) {
        sectionObject.rotation.y += 0.005;
        
        // Orb Animations
        const goudaOrb = sectionObject.getObjectByName("GoudaOrb");
        const yasserOrb = sectionObject.getObjectByName("YasserOrb");
        
        if (goudaOrb) {
            goudaOrb.position.x = Math.cos(time * 1.5) * 2.5;
            goudaOrb.position.z = Math.sin(time * 1.5) * 2.5;
            goudaOrb.position.y = Math.sin(time * 2) * 0.5;
        }
        
        if (yasserOrb) {
            yasserOrb.position.x = Math.cos(time * 1.5 + Math.PI) * 2.5;
            yasserOrb.position.z = Math.sin(time * 1.5 + Math.PI) * 2.5;
            yasserOrb.position.y = Math.cos(time * 2) * 0.5;
        }
    }

    if (renderer && scene && camera) renderer.render(scene, camera);
    if (sectionRenderer && sectionScene && sectionCamera) sectionRenderer.render(sectionScene, sectionCamera);
}




// GSAP Interactions
function setupInteracts() {
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Scroll Background
    ScrollTrigger.create({
        start: 'top -50',
        onEnter: () => gsap.to('nav > div', { backgroundColor: 'rgba(5, 6, 8, 0.9)', backdropFilter: 'blur(20px)', margin: '0', borderRadius: '0', width: '100%', duration: 0.4 }),
        onLeaveBack: () => gsap.to('nav > div', { backgroundColor: 'transparent', backdropFilter: 'blur(12px)', margin: 'auto', borderRadius: '1rem', width: 'auto', duration: 0.4 })
    });

    // Stats Counter
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.innerText.replace(/[0-9]/g, '');
        
        ScrollTrigger.create({
            trigger: counter,
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 3,
                    ease: "power3.out",
                    onUpdate: () => {
                        counter.innerText = Math.ceil(obj.val) + suffix;
                    }
                });
            }
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupInteracts();
    
    // AOS Init
    AOS.init({
        duration: 1000,
        easing: 'ease-out',
        once: true
    });
});
