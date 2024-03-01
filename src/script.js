import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { SMAAPass }  from 'three/addons/postprocessing/SMAAPass.js'
import GUI from 'lil-gui'

/* Vars & Function */
let cursorX = 0
let cursorY = 0

window.addEventListener('mousemove', (event) => {
    // per avere cursorX da -1 a 1
    cursorX = ((event.clientX / sizes.width) - 0.5) * 2
    cursorY = ((event.clientY / sizes.height) - 0.5) * -2

    pointLight.position.x = cursorX * 3
    pointLight.position.y = cursorY * 3
})
console.log(cursorX)

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts
*/
const fontLoader = new FontLoader()

// OCCHIO BEVEL CAMBIA MISURE!!!!!
/*
font: font,
size: 0.5,
height: 0.2,
curveSegments: 12,
bevelEnabled: true,
bevelThickness: 0.03,
bevelSize: 0.02,
bevelOffset: 0,
bevelSegments: 5
*/
const params = {
    size: 1.2,
    height: 0.05,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 10
}

/* group */
const letters = new THREE.Group()
const groupS = new THREE.Group()
const groupL = new THREE.Group()
letters.position.z = params.height * 0.5
letters.position.x = 0.3
scene.add(letters)

// Material
const material = new THREE.MeshLambertMaterial({ color: '#0047FF' })
fontLoader.load(
    '/fonts/Overpass ExtraBold_Regular.json',
    (font) => {

        // geometry
        const SGeometry = new TextGeometry('S',{font: font,size: params.size,height: params.height * 3,curveSegments: params.curveSegments,bevelEnabled: params.bevelEnabled,bevelThickness: params.bevelThickness,bevelSize: params.bevelSize,bevelOffset: params.bevelOffset,bevelSegments: params.bevelSegments})
        const IGeometry = new TextGeometry('I',{font: font,size: params.size,height: params.height,curveSegments: params.curveSegments,bevelEnabled: params.bevelEnabled,bevelThickness: params.bevelThickness,bevelSize: params.bevelSize,bevelOffset: params.bevelOffset,bevelSegments: params.bevelSegments})
        const LGeometry = new TextGeometry('L',{font: font,size: params.size,height: params.height * 2,curveSegments: params.curveSegments,bevelEnabled: params.bevelEnabled,bevelThickness: params.bevelThickness,bevelSize: params.bevelSize,bevelOffset: params.bevelOffset,bevelSegments: params.bevelSegments})
        const I2Geometry = new TextGeometry('I',{font: font,size: params.size,height: params.height,curveSegments: params.curveSegments,bevelEnabled: params.bevelEnabled,bevelThickness: params.bevelThickness,bevelSize: params.bevelSize,bevelOffset: params.bevelOffset,bevelSegments: params.bevelSegments})
        const KGeometry = new TextGeometry('K',{font: font,size: params.size,height: params.height,curveSegments: params.curveSegments,bevelEnabled: params.bevelEnabled,bevelThickness: params.bevelThickness,bevelSize: params.bevelSize,bevelOffset: params.bevelOffset,bevelSegments: params.bevelSegments})

        SGeometry.center()
        IGeometry.center()
        LGeometry.center()
        I2Geometry.center()
        KGeometry.center()

        const letterS = new THREE.Mesh(SGeometry, material)
        const letterI = new THREE.Mesh(IGeometry, material)
        const letterL = new THREE.Mesh(LGeometry, material)
        const letterI2 = new THREE.Mesh(I2Geometry, material)
        const letterK = new THREE.Mesh(KGeometry, material)

        letterS.position.set(-1, 0.5, 0)
        letterI.position.set(-1.05, 0.1, 0)
        letterL.position.set(-0.28, -0.2, 0)
        letterI2.position.set(-0.32, 0.5, 0)
        letterK.position.set(0.4, -0.4, 0)

        letterS.castShadow = true
        letterI.castShadow = true
        letterL.castShadow = true
        letterI2.castShadow = true
        letterK.castShadow = true

        letterS.receiveShadow = true
        letterI.receiveShadow = true
        letterL.receiveShadow = true
        letterI2.receiveShadow = true
        letterK.receiveShadow = true

        groupS.add(letterS)
        groupL.add(letterL)

        groupS.position.z = params.height
        groupL.position.z = params.height * 0.5

        letters.add(groupS, letterI, groupL, letterI2, letterK)
    }
)

/* OBJ */
const geometryPlane = new THREE.PlaneGeometry(20, 20)
const meshPlane = new THREE.Mesh(geometryPlane, material)
meshPlane.receiveShadow = true
scene.add(meshPlane)

/* Lights */
const pointLight = new THREE.PointLight(0xffffff, 30, 100)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
pointLight.position.set(2,2,2)
pointLight.castShadow = true
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 6
pointLight.shadow.mapSize.width = 2048 * 2
pointLight.shadow.mapSize.height = 2048 * 2
scene.add(pointLight, ambientLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)

// Controls
/*
*/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()