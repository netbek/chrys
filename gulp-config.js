module.exports = {
  autoprefixer: {
    browsers: [
      'last 2 versions',
      'ie >= 8',
      'ff >= 5',
      'chrome >= 20',
      'opera >= 12',
      'safari >= 4',
      'ios >= 6',
      'android >= 2',
      'bb >= 6'
    ]
  },
  // Color names as declared in `$chrys-color-map` in `src/css/_variables.scss`
  colors: [
    'colorblind',
    'mpl-inferno',
    'mpl-magma',
    'mpl-plasma',
    'mpl-viridis',
    'brewer-brbg',
    'brewer-bugn',
    'brewer-bupu',
    'brewer-gnbu',
    'brewer-orrd',
    'brewer-piyg',
    'brewer-prgn',
    'brewer-pubu',
    'brewer-pubugn',
    'brewer-puor',
    'brewer-purd',
    'brewer-rdbu',
    'brewer-rdgy',
    'brewer-rdpu',
    'brewer-rdylbu',
    'brewer-rdylgn',
    'brewer-spectral',
    'brewer-ylgn',
    'brewer-ylgnbu',
    'brewer-ylorbr',
    'brewer-ylorrd',
    'brewer-blues',
    'brewer-greens',
    'brewer-oranges',
    'brewer-purples',
    'brewer-reds',
    'brewer-greys',
    'brewer-accent',
    'brewer-dark2',
    'brewer-paired',
    'brewer-pastel1',
    'brewer-pastel2',
    'brewer-set1',
    'brewer-set2',
    'brewer-set3',
    'd3-category10',
    'd3-category20',
    'd3-category20b',
    'd3-category20c'
  ],
  css: {
    params: {
      includePaths: [
        'src/css'
      ],
      errLogToConsole: true
    }
  },
  illustratorTasks: {
    swatches: {
      document: {
        height: 210, // mm
        width: 297 // mm
      },
      characterStyles: [{
        name: 'swatchRectTitle',
        attributes: {
          size: 8 // pt
        }
      }],
      swatchRect: {
        textPosition: 0.125 // Value between 0 and 1
      }
    }
  },
  watchTasks: [
    //
    {
      files: [
        'src/**/*'
      ],
      tasks: [
        'build'
      ]
    }
  ],
  webserver: {
    host: 'localhost',
    port: 8000,
    path: '/',
    livereload: false,
    directoryListing: false,
    open: '/demo/',
    https: false,
    browsers: {
      'default': 'firefox',
      'darwin': 'google chrome',
      'linux': 'google-chrome',
      'win32': 'chrome'
    }
  }
};
