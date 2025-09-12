
export const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, 999)
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return true
}