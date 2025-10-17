import React from 'react'

// Handle file selection event
 const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check if it's an audio file
      if (file.type.startsWith('audio/')) {
        console.log('Selected Audio File:', file.name)
      } else {
        alert('Please Select an Audio File')
        // Reset the input
        event.target.value = ''
      }
    }
  }
    export default handleFileChange