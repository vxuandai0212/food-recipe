export default class Image {
  constructor({ data }) {
    this.data = data
    this.wrapper = undefined
  }

  static get toolbox() {
    return {
      title: 'Ảnh',
      icon: '<svg width="29.71" height="26" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.00195 4.5C6.00195 4.89782 5.84392 5.27936 5.56261 5.56066C5.28131 5.84196 4.89978 6 4.50195 6C4.10413 6 3.7226 5.84196 3.44129 5.56066C3.15999 5.27936 3.00195 4.89782 3.00195 4.5C3.00195 4.10218 3.15999 3.72064 3.44129 3.43934C3.7226 3.15804 4.10413 3 4.50195 3C4.89978 3 5.28131 3.15804 5.56261 3.43934C5.84392 3.72064 6.00195 4.10218 6.00195 4.5V4.5Z" fill="black"/><path d="M2.00195 0C1.47152 0 0.962812 0.210714 0.58774 0.585786C0.212667 0.960859 0.00195313 1.46957 0.00195312 2V12C0.00195313 12.5304 0.212667 13.0391 0.58774 13.4142C0.962812 13.7893 1.47152 14 2.00195 14H14.002C14.5324 14 15.0411 13.7893 15.4162 13.4142C15.7912 13.0391 16.002 12.5304 16.002 12V2C16.002 1.46957 15.7912 0.960859 15.4162 0.585786C15.0411 0.210714 14.5324 0 14.002 0H2.00195V0ZM14.002 1C14.2672 1 14.5215 1.10536 14.7091 1.29289C14.8966 1.48043 15.002 1.73478 15.002 2V8.5L11.225 6.553C11.1312 6.50602 11.025 6.48973 10.9215 6.50642C10.8179 6.52311 10.7222 6.57194 10.648 6.646L6.93795 10.356L4.27795 8.584C4.18191 8.52006 4.06672 8.4913 3.95189 8.5026C3.83707 8.5139 3.72969 8.56456 3.64795 8.646L1.00195 11V2C1.00195 1.73478 1.10731 1.48043 1.29485 1.29289C1.48238 1.10536 1.73674 1 2.00195 1H14.002Z" fill="black"/></svg>'
    }
  }

  render() {
    this.wrapper = document.createElement('div')
    const noteWrapper = document.createElement('div')
    noteWrapper.style.marginBottom = '10px'

    const noteLable = document.createElement('p')
    noteLable.style.marginBottom = '10px'
    noteLable.innerHTML = 'Ảnh'
    noteWrapper.appendChild(noteLable)

    const note = document.createElement('textarea')
    note.classList.add('cdx-input')
    note.placeholder = 'Nhập link ảnh'
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
