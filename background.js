// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('bg-canvas').appendChild(renderer.domElement);

// 创建球体几何体
const geometry = new THREE.SphereGeometry(3, 64, 64);

// 创建材质
const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // 改进的柏林噪声函数
        float noise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            
            float n = i.x + i.y * 157.0 + 113.0 * i.z;
            return mix(
                mix(
                    mix(fract(sin(n + 0.0) * 43758.5453123),
                        fract(sin(n + 1.0) * 43758.5453123), f.x),
                    mix(fract(sin(n + 157.0) * 43758.5453123),
                        fract(sin(n + 158.0) * 43758.5453123), f.x), f.y),
                mix(
                    mix(fract(sin(n + 113.0) * 43758.5453123),
                        fract(sin(n + 114.0) * 43758.5453123), f.x),
                    mix(fract(sin(n + 270.0) * 43758.5453123),
                        fract(sin(n + 271.0) * 43758.5453123), f.x), f.y), f.z);
        }
        
        // 星云效果
        float nebula(vec3 p) {
            float n = 0.0;
            float amplitude = 1.0;
            float frequency = 1.0;
            
            for(int i = 0; i < 5; i++) {
                n += amplitude * noise(p * frequency + time * 0.1);
                amplitude *= 0.5;
                frequency *= 2.0;
            }
            
            return n;
        }
        
        void main() {
            // 深邃的宇宙色彩
            vec3 color1 = vec3(0.05, 0.1, 0.2); // 深蓝色
            vec3 color2 = vec3(0.2, 0.3, 0.5); // 中蓝色
            vec3 color3 = vec3(0.5, 0.2, 0.5); // 紫色
            vec3 color4 = vec3(0.1, 0.2, 0.3); // 暗蓝色
            
            // 创建多层次的星云效果
            float n1 = nebula(vPosition * 0.5);
            float n2 = nebula(vPosition * 1.0 + 10.0);
            
            // 混合颜色
            vec3 color = mix(color1, color2, n1);
            color = mix(color, color3, n2 * 0.5);
            color = mix(color, color4, noise(vPosition * 2.0 + time * 0.05));
            
            // 添加星星
            float stars = step(0.98, noise(vPosition * 15.0));
            stars += step(0.95, noise(vPosition * 25.0)) * 0.5;
            
            // 让一些星星闪烁
            float twinkle = noise(vPosition + time * 2.0);
            stars *= (0.8 + 0.2 * twinkle);
            
            color += vec3(stars) * 0.8;
            
            // 添加一些星云的发光效果
            float glow = max(0.0, noise(vPosition + time * 0.1));
            color += vec3(0.2, 0.3, 0.5) * glow * 0.2;
            
            gl_FragColor = vec4(color, 0.95);
        }
    `,
    transparent: true,
    side: THREE.BackSide // 从内部渲染球体
});

// 创建网格
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 窗口大小调整处理
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.005; // 降低动画速度
    sphere.rotation.y += 0.0005; // 降低旋转速度
    renderer.render(scene, camera);
}

// 确保在页面加载完成后再开始动画
window.addEventListener('load', () => {
    animate();
}); 