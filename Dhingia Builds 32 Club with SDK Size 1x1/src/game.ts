import { movePlayerTo } from '@decentraland/RestrictedActions'
import { createdancearea,createscreen} from "modules3"
import resources from './resources'
import { NPC, NPCDelay, Dialog } from '@dcl/npc-scene-utils'
import { setTimeout } from '@dcl/ecs-scene-utils'


const scene = new Entity('scene')
engine.addEntity(scene)
const transform = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: Quaternion.Euler(0, 0, 0),
  scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)

let screen1 = createscreen(new Vector3(10.6,11.5,7.7),"",0,16/9,2.5,1.0)
engine.addEntity(screen1)

let dancearea = [[9.62,10,9.21],[14.09,20,13.53]]
createdancearea(dancearea)

//Alice
export const AliceDialog: Dialog[] = [
  {
    text: "First Line here",
  },
  {
    text: "Second Line Here",
  },
  {
    text: "Third Line Here",
  },
  {
    text: "Fourth Line Here",
    isEndOfDialog: true,
    triggeredByNext: () => {
      Alice.playAnimation('Goodbye', true, 2)
    },
  },
]

export const Alice = new NPC(
  {
    position: new Vector3(9.87,0.94,13.92),
    rotation: Quaternion.Euler(0, 0, 0),
  },
  resources.models.robots.alice,
  () => {
    // animations
    Alice.playAnimation('Hello', true, 2)

    let dummyent = new Entity()
    dummyent.addComponent(
      new NPCDelay(2, () => {
        Alice.playAnimation('Talk')
      })
    )
    engine.addEntity(dummyent)

    // sound
    Alice.addComponentOrReplace(new AudioSource(resources.sounds.alice))
    Alice.getComponent(AudioSource).playOnce()

    // dialog UI
    Alice.talk(AliceDialog)
  },
  {
    faceUser: true,
    reactDistance: 3,
    coolDownDuration: 3,
    portrait: {
      path: 'images/portraits/alice.png',
      height: 256,
      width: 256,
      section: {
        sourceHeight: 512,
        sourceWidth: 512,
      },
    },
    onWalkAway: () => {
      Alice.playAnimation('Goodbye', true, 2)

      setTimeout(2000, ()=> {
        npcdefault()
      });
    },
  }
)


const ringShape = resources.models.robots.rings



const Alicerings = new Entity()
Alicerings.addComponent(ringShape)
Alicerings.addComponent(
  new Transform({
    position: new Vector3(0, -0.65, 0),
  })
)
Alicerings.setParent(Alice)


function npcdefault() {
}

setTimeout(1000,()=>{

  npcdefault()
});

//Copy Sounds, Images, Robot Folder




//3D Models
const Building = new Entity('Building')
Building.setParent(scene)
Building.addComponent(new GLTFShape('Models/BN49 Final.glb'))
Building.addComponent(new Transform({
  position: new Vector3(0,0,0),
  rotation: Quaternion.Euler (0, 0, 0),
  scale: new Vector3(1, 1, 1)
}))
engine.addEntity(Building)

const Lights = new Entity('Lights')
Lights.setParent(scene)
Lights.addComponent(new GLTFShape('Models/Lights.glb'))
Lights.addComponent(new Transform({
  position: new Vector3(0,0,0),
  rotation: Quaternion.Euler (0, 0, 0),
  scale: new Vector3(1, 1, 1)
}))
engine.addEntity(Lights)

//Ground Floor
let Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(11,2,3), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,0)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 11, y: 6.7, z: 5 }, { x: 11.5, y: 6.7, z: 0 })
    },
    { hoverText: "UP" }
  )
)
engine.addEntity(Button)

//First Floor
Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(12.5,7.5,1), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,0)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 11, y: 11, z: 5}, { x: 11.5, y: 11, z: 0 })
    },
    { hoverText: "UP" }
  )
)
engine.addEntity(Button)

Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(11,7.5,1), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,180)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 9.5, y: 1, z: 6 }, { x: 10, y: 1, z: 0 })
    },
    { hoverText: "Down" }
  )
)
engine.addEntity(Button)

//Second Floor
Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(12,11.5,.6), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,0)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 11, y: 15, z: 5}, { x: 11.5, y: 15, z: 0 })
    },
    { hoverText: "UP" }
  )
)
engine.addEntity(Button)

Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(10.5,11.5,.6), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,180)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 11, y: 6.7, z: 5 }, { x: 11.5, y: 6.7, z: 0 })
    },
    { hoverText: "Down" }
  )
)
engine.addEntity(Button)

//Third Floor
Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(10.5,15.5,.6), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,180)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 11, y: 11, z: 5}, { x: 11.5, y: 11, z: 0 })
    },
    { hoverText: "Down" }
  )
)
engine.addEntity(Button)





