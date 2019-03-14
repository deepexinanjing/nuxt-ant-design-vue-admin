import Konva from 'konva'

export default class Stage {
  constructor(config) {
    this.stage = new Konva.Stage({
      container: config.container,
      width: config.width,
      height: config.height
    })

    this.layer = new Konva.Layer()
  }
}
