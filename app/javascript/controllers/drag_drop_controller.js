import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["zone", "input", "list"]

  connect() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.zoneTarget.addEventListener(eventName, this.preventDefaults.bind(this), false)
    })

    ;['dragenter', 'dragover'].forEach(eventName => {
      this.zoneTarget.addEventListener(eventName, this.highlight.bind(this), false)
    })

    ;['dragleave', 'drop'].forEach(eventName => {
      this.zoneTarget.addEventListener(eventName, this.unhighlight.bind(this), false)
    })

    this.zoneTarget.addEventListener('drop', this.handleDrop.bind(this), false)
  }

  preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  highlight(e) {
    this.zoneTarget.classList.add('dragover')
  }

  unhighlight(e) {
    this.zoneTarget.classList.remove('dragover')
  }

  handleDrop(e) {
    const dt = e.dataTransfer
    const files = dt.files
    
    const dataTransfer = new DataTransfer()
    Array.from(files).forEach(file => {
      dataTransfer.items.add(file)
    })
    this.inputTarget.files = dataTransfer.files
    
    this.handleFiles(files)
  }

  handleFiles(files) {
    if (files && files.length > 0) {
      this.listTarget.innerHTML = ''
      Array.from(files).forEach(file => {
        const fileItem = document.createElement('div')
        fileItem.className = 'text-sm text-gray-600 dark:text-gray-300'
        fileItem.textContent = `${file.name} (${this.formatFileSize(file.size)})`
        this.listTarget.appendChild(fileItem)
      })
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  browse() {
    this.inputTarget.click()
  }
}
