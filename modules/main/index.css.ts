import { Styles } from "@ijstech/components";

export default Styles.style({
  $nest: {
    'i-carousel-slider.--indicators .dots-pagination': {
      display: 'flex',
      position: 'absolute',
      width: '100%',
      justifyContent: 'flex-end',
      gap: '0.5rem',
      bottom: '1.75rem',
      paddingRight: '1.75rem',
      $nest: {
        'li > span': {
          display: 'inline-block',
          height: 4,
          width: 24,
          transition: 'all 0.2s ease 0s',
          borderRadius: '9999px',
          minHeight: 0,
          minWidth: 0,
          border: `1px solid ${Styles.Theme.ThemeVars.colors.primary.main}`
        }
      }
    },
    'i-carousel-slider .dots-pagination': {
      display: 'none'
    },
    '.--carousel-item > img': {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      // borderRadius: 13
    },
    '.--button-wrap:hover': {
      $nest: {
        '.--arrow-button:not(.disabled)': {
          boxShadow: 'none',
          display: 'flex !important',
          background: '#fff !important',
          borderRadius: '50%',
          $nest: {
            '> i-icon': {
              visibility: 'visible'
            }
          }
        }
      }
    },
    '.--arrow-button': {
      boxShadow: 'none',
      $nest: {
        '& > span': {
          display: 'none'
        },
        '& > i-icon': {
          visibility: 'hidden'
        }
      }
    },
  }
})