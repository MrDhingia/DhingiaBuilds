
import { triggerEmote, PredefinedEmote } from "@decentraland/RestrictedActions"

let emotetimer = 5

function getemote(num:number) {
if(num == 0) {
  return PredefinedEmote.TEKTONIK
} else if (num == 1) {

  return PredefinedEmote.ROBOT
} else if (num == 2) {

  return PredefinedEmote.DISCO
} else if (num == 3) {

  return PredefinedEmote.DAB
} else if (num == 4) {

  return PredefinedEmote.HANDS_AIR
} else {

  return PredefinedEmote.TEKTONIK
}
}

function getwaittime(num:number) {

if(num == 0) {
  return 11
} else if (num == 1) {

  return 11
} else if (num == 2) {

  return 11
} else if (num == 3) {

  return 2
} else if (num == 4) {

  return 6
} else {

  return 11
}
}

export function createdancearea(dancearea:any) {
  
class avataremoteSystem {

  async update(dt: number) {
    emotetimer -= dt


    if(emotetimer <= 0) {
      emotetimer = 12
      
      let campos = Camera.instance.position
      log(campos)

      if(campos.x > dancearea[0][0] && campos.x < dancearea[1][0] && campos.y > dancearea[0][1] && campos.y < dancearea[1][1] && campos.z > dancearea[0][2] && campos.z < dancearea[1][2]) {
      try {
          let random = Math.floor(Math.random()*5)
           triggerEmote({ predefined:  getemote(random)})
          emotetimer = getwaittime(random)
      } catch {
  
      }
      } else {
        emotetimer = 8
      }


    }
  }

}


engine.addSystem(new avataremoteSystem())

}






export function checkwearables(wearables:string[], allowedwearables:string[]) {


  try {
    let found = 0
    for (let w1 of allowedwearables){
      for (let w2 of wearables){
        if(w1 == w2){
          found = 1
          break
        }
      }
    }
    if(found == 1){
      return true
    }
    return false
  } catch {
    return false
  }

}



export function createscreen(pos:any, link:string, rotation:number, aspectratio:number, scale:number,volume:number) {
  // #4

const myVideoClip = new VideoClip(link)

// #2

const myVideoTexture = new VideoTexture(myVideoClip)

// #3

const myMaterial = new Material()

myMaterial.albedoTexture = myVideoTexture
myMaterial.roughness = 1
myMaterial.specularIntensity = 0
myMaterial.metallic = 0

const screen = new Entity()

screen.addComponent(new PlaneShape())

screen.addComponent(
  
  new Transform({
    position: pos,
    
    scale: new Vector3(aspectratio*scale, scale, 0.02),
    
    rotation: Quaternion.Euler(0,rotation,0)
  })
)
screen.addComponent(myMaterial)
// screen.addComponent(
  
//   new OnPointerDown(() => {
//     myVideoTexture.playing = !myVideoTexture.playing
//   },
//   {
//     button: ActionButton.POINTER,
//     showFeedback: true,
//     hoverText: "Play/Pause",
//     distance: 50
//   })
// )
// engine.addEntity(screen)

// #5
myVideoTexture.volume=volume
myVideoTexture.play()
return screen
}


