import { movePlayerTo } from '@decentraland/RestrictedActions'
import { createdancearea,createscreen} from "modules3"
import resources from './resources'
import { NPC, NPCDelay, Dialog } from '@dcl/npc-scene-utils'
import { setTimeout } from '@dcl/ecs-scene-utils'

const scene = new Entity('scene')
engine.addEntity(scene)
const transform = new Transform({
  position: new Vector3(16, 0, 0),
  rotation: Quaternion.Euler(0, -90, 0),
  scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)

let screen1 = createscreen(new Vector3(15.5,9.5,8),"",-90,16/9,5,1.0)
engine.addEntity(screen1)

let dancearea = [[6.54,7,0.94],[15.30,20,14.90]]
createdancearea(dancearea)

//Alices
export const AliceDialog: Dialog[] = [
  {
    text: "Click on the arrows to go up",
  },
  {
    text: "Enjoy The Party",
    isEndOfDialog: true,
    triggeredByNext: () => {
      Alice.playAnimation('Goodbye', true, 2)
    },
  },
]

export const Alice = new NPC(
  {
    position: new Vector3(3.45,1.2,12.67),
    rotation: Quaternion.Euler(0,-90, 0),
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

//3D Models
const Building = new Entity('Building')
Building.setParent(scene)
Building.addComponent(new GLTFShape('Models/Arabic 3 Final.glb'))
Building.addComponent(new Transform({
  position: new Vector3(8,0,8),
  rotation: Quaternion.Euler (0, 0, 0),
  scale: new Vector3(1, 1, 1)
}))
engine.addEntity(Building)

// const Stage = new Entity('Stage')
// Stage.setParent(scene)
// Stage.addComponent(new GLTFShape('Models/Stage.glb'))
// Stage.addComponent(new Transform({
//   position: new Vector3(5,5.4,4.6),
//   rotation: Quaternion.Euler (0, 0, 0),
//   scale: new Vector3(.6,.6,.6)
// }))
// engine.addEntity(Stage)


//Ground Floor
let Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(8.3,2,15.2), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,180,0)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 8.35, y: 8, z: 10.14}, { x: 8.35, y: 8, z: 16})
    },
    { hoverText: "UP" }
  )
)
engine.addEntity(Button)

//First Floor
Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(7.23,8.3,15.2), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,180,0)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 13, y: 15, z: 3}, { x: 0, y: 15, z: 3})
    },
    { hoverText: "UP" }
  )
)
engine.addEntity(Button)

Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(8.8,8.3,15.2), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,180,180)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 8.35, y: 1, z: 10.14}, { x: 8.35, y: 1, z: 16})
    },
    { hoverText: "DOWN" }
  )
)
engine.addEntity(Button)

//Second Floor
Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(10.85,15.2,4.95), scale: new Vector3(.6,.6,.6), rotation: Quaternion.Euler(0,180,180)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 8.35, y: 8, z: 10.14}, { x: 8.35, y: 8, z: 16})
    },
    { hoverText: "DOWN" }
  )
)
engine.addEntity(Button)

