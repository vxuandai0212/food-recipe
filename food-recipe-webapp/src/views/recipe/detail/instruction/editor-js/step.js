export default class Step {
  constructor({ data }) {
    this.data = data
    this.wrapper = undefined
  }

  static get toolbox() {
    return {
      title: 'Bước làm',
      icon: '<svg class="svg-icon" viewBox="0 0 20 20"><path d="M15.396,2.292H4.604c-0.212,0-0.385,0.174-0.385,0.386v14.646c0,0.212,0.173,0.385,0.385,0.385h10.792c0.211,0,0.385-0.173,0.385-0.385V2.677C15.781,2.465,15.607,2.292,15.396,2.292 M15.01,16.938H4.99v-2.698h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.519,1.156-1.156s-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.321-1.089,0.771H4.99v-3.083h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.518,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V6.531h1.609C6.755,6.98,7.185,7.302,7.688,7.302c0.638,0,1.156-0.519,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V3.062h10.02V16.938z M7.302,13.854c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386s-0.173,0.385-0.385,0.385S7.302,14.066,7.302,13.854 M7.302,10c0-0.212,0.173-0.385,0.385-0.385S8.073,9.788,8.073,10s-0.173,0.385-0.385,0.385S7.302,10.212,7.302,10 M7.302,6.146c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386S7.899,6.531,7.688,6.531S7.302,6.358,7.302,6.146"></path></svg>'
    }
  }

  render() {
    this.wrapper = document.createElement('div')
    const stepWrapper = document.createElement('div')
    stepWrapper.style.marginBottom = '10px'

    const stepLable = document.createElement('p')
    stepLable.style.marginBottom = '10px'
    stepLable.innerHTML = 'Bước làm'
    stepWrapper.appendChild(stepLable)

    const step = document.createElement('textarea')
    step.classList.add('cdx-input')
    step.placeholder = 'Nhập bước làm'
    step.value = this.data && this.data.description ? this.data.description : ''
    stepWrapper.appendChild(step)

    this.wrapper.appendChild(stepWrapper)
    return this.wrapper
  }

  save(blockContent) {
    const step = blockContent.querySelector('textarea')
    return {
      description: step.value
    }
  }
}
