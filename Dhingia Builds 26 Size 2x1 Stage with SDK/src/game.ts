import { createdancearea,createscreen} from "modules3"
import resources from './resources'
import { NPC, NPCDelay, Dialog } from '@dcl/npc-scene-utils'
import { setTimeout } from '@dcl/ecs-scene-utils'

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

let screen1 = createscreen(new Vector3(16,8,1.7),"",0,16/9,7,1.0)
screen1.setParent(_scene)
engine.addEntity(screen1)

let dancearea = [[12.11,3,9.15],[19.78,20,13.48]]
createdancearea(dancearea)


//Alice
export const AliceDialog: Dialog[] = [
  {
    text: "First Line Here",
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
    position: new Vector3(24.96,0.91,14.23),
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

//Builder Code
const Building = new Entity('Building')
Building.setParent(_scene)
Building.addComponent(new GLTFShape('Models/Stage 1 Final.glb'))
Building.addComponent(new Transform({
  position: new Vector3(16,0,8),
  rotation: Quaternion.Euler (0, 0, 0),
  scale: new Vector3(1, 1, 1)
}))
engine.addEntity(Building)

const Lights = new Entity('Building')
Lights.setParent(_scene)
Lights.addComponent(new GLTFShape('Models/Lights.glb'))
Lights.addComponent(new Transform({
  position: new Vector3(16,0,8),
  rotation: Quaternion.Euler (0, 0, 0),
  scale: new Vector3(1, 1, 1)
}))
engine.addEntity(Lights)