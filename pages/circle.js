import Konva from 'konva'
import uuidv1 from 'uuid/v1'
export default class Circle {
  circleList = []

  draggable = false
  isDragging = false

  constructor({ stage, circleFill, strokeColor, strokeWidth }) {
    Object.assign(this, { ...stage, circleFill, strokeColor, strokeWidth })
    this.init()
  }
  init() {
    // 初始化，监听各个事件
    this.stage.on('mousedown', e => {
      this.startTime = new Date().getTime()
      this.lastPos = this.stage._lastPos || { x: 0, y: 0 }
      if (e.target === this.stage && !this.draggable) {
        this.isDragging = true
        this.circle = this.addCircle()
        this.circleList.push(this.circle)
        this.stage.add(this.layer)
        this.initLayerX = e.evt.layerX
        this.initLayerY = e.evt.layerY
      }
    })
    this.stage.on('mousemove', e => {
      if (this.isDragging) {
        const { layerX, layerY } = e.evt
        const scale = Math.abs(layerX - this.initLayerX)
        this.circle.setAttrs({
          radius: scale / 2,
          x: (layerX + this.initLayerX) / 2 - this.lastPos.x,
          y: (layerY + this.initLayerY) / 2 - this.lastPos.y,
          strokeWidth: this.strokeWidth
        })
        this.layer.draw()
      }
    })
    window.onmouseup = () => {
      if (this.isDragging) {
        this.isDragging = false
        if (new Date().getTime() - this.startTime < 100) {
          // 时间太短
          this.circleList.pop()
          this.circle.remove()
          this.layer.draw()
        }
      }
    }
    this.stage.on('click tap', e => {
      // 拖动形状
      // if click on empty area - remove all transformers
      if (e.target === this.stage) {
        this.stage.find('Transformer').destroy()
        this.selectNode = null
        this.layer.draw()
        return
      }
      // do nothing if clicked NOT on our rectangles
      if (!e.target.hasName('circle')) {
        this.selectNode = null
        return
      }
      // remove old transformers
      // TODO: we can skip it if current rect is already selected
      this.stage.find('Transformer').destroy()

      // create new transformer
      const tr = new Konva.Transformer()
      this.layer.add(tr)
      this.selectNode = e.target
      tr.attachTo(e.target)
      this.layer.draw()
    })
    this.stage.on('wheel', e => {
      // 滚轮放大缩小画布
      const wheel = e.evt.wheelDeltaY
      let nowScale
      if (wheel === 120) {
        // 向上变大
        nowScale = this.layer.scale().x * 0.8
      } else {
        // 向下变小
        nowScale = this.layer.scale().x * 1.2
      }
      this.layer.scale({
        x: nowScale,
        y: nowScale
      })
      this.layer.draw()
    })
    window.addEventListener('keyup', this.listenKeyUp)
  }
  listenKeyUp = e => {
    // 监听删除按键点击
    if (e.keyCode === 8 && this.selectNode) {
      this.selectNode.remove()
      this.stage.find('Transformer').destroy()
      this.layer.draw()
    }
  }
  removeEventListener() {
    // 取消事件监听的
    window.removeEventListener('keyup', this.listenKeyUp)
  }
  getCircleList = () => {
    // 取得包含所有的形状的列表
    return this.circleList
  }

  toggleMode = mode => {
    // 更改编辑和移动模式
    this.stage.setAttr('draggable', mode)
    this.draggable = mode
  }

  addCircle() {
    // 创建一个形状
    const circle = new Konva.Circle({
      x: 0,
      y: 0,
      radius: 0,
      fill: this.circleFill,
      stroke: this.strokeColor,
      strokeWidth: 0,
      name: 'circle',
      id: uuidv1()
    })
    circle.draggable(true)
    circle.transformsEnabled('all')
    this.layer.add(circle)
    this.layer.draw()
    return circle
  }
}
