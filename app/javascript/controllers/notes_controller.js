import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["textarea"]

  connect() {
    console.log("Notes controller connected")
  }

  save(event) {
    const textarea = event.target
    const imageId = textarea.dataset.id
    const notes = textarea.value.trim()

    fetch(`/images/${imageId}/update_notes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": this.getCSRFToken(),
      },
      body: JSON.stringify({ notes: notes }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(`Notes for image ${imageId} saved successfully!`)
        textarea.classList.add("border-green-500", "ring-2", "ring-green-300")
        
        setTimeout(() => {
          textarea.classList.remove("border-green-500", "ring-2", "ring-green-300")
        }, 3000)
      } else {
        console.error(`Error saving notes: ${data.errors.join(", ")}`)
      }
    })
    .catch((error) => {
      console.error("Unexpected error while saving notes:", error)
    })
  }

  getCSRFToken() {
    const metaTag = document.querySelector('meta[name="csrf-token"]')
    return metaTag ? metaTag.getAttribute("content") : ""
  }
}
