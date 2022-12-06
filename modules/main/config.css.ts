import { Styles } from "@ijstech/components";

export const textareaStyle = Styles.style({
  $nest: {
    'textarea': {
      border: 'none',
      outline: 'none'
    }
  }
})

export const uploadStyle = Styles.style({
  $nest: {
    '.i-upload_preview-img': {
      maxHeight: '100%',
      display: 'block'
    },
    '.i-upload-wrapper': {
      maxHeight: 'inherit',
      overflow: 'hidden'
    }
  }
})

export const pointerStyle = Styles.style({
  cursor: 'pointer'
})
