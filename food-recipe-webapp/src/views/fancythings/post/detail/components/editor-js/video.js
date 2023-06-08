export default class Video {
  constructor({ data }) {
    this.data = data
    this.wrapper = undefined
  }

  static get toolbox() {
    return {
      title: 'Video',
      icon: '<svg width="32.5" height="26" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 1H5C2.79086 1 1 2.79086 1 5V13C1 15.2091 2.79086 17 5 17H17C19.2091 17 21 15.2091 21 13V5C21 2.79086 19.2091 1 17 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 9L9 6V12L14 9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    }
  }

  render() {
    this.wrapper = document.createElement('div')
    const noteWrapper = document.createElement('div')
    noteWrapper.style.marginBottom = '10px'

    const noteLable = document.createElement('p')
    noteLable.style.marginBottom = '10px'
    noteLable.innerHTML = 'Video'
    noteWrapper.appendChild(noteLable)

    const note = document.createElement('textarea')
    note.classList.add('cdx-input')
    note.placeholder = 'Nhập link video'
    note.value = this.data && this.data.description ? this.data.description : ''
    noteWrapper.appendChild(note)

    this.wrapper.appendChild(noteWrapper)

    return this.wrapper
  }

  save(blockContent) {
    const note = blockContent.querySelector('textarea')

    return {
      description: note.value
    }
  }
}
