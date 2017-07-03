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
  // Palette names as declared in `$chrys-color-map` in `src/css/_variables.scss`
  palettes: [{
      name: 'colorblind',
      type: 'qualitative'
    },
    {
      name: 'mpl-inferno',
      type: 'sequential'
    },
    {
      name: 'mpl-magma',
      type: 'sequential'
    },
    {
      name: 'mpl-plasma',
      type: 'sequential'
    },
    {
      name: 'mpl-viridis',
      type: 'sequential'
    },
    {
      name: 'brewer-brbg',
      type: 'diverging'
    },
    {
      name: 'brewer-bugn',
      type: 'sequential'
    },
    {
      name: 'brewer-bupu',
      type: 'sequential'
    },
    {
      name: 'brewer-gnbu',
      type: 'sequential'
    },
    {
      name: 'brewer-orrd',
      type: 'sequential'
    },
    {
      name: 'brewer-piyg',
      type: 'diverging'
    },
    {
      name: 'brewer-prgn',
      type: 'diverging'
    },
    {
      name: 'brewer-pubu',
      type: 'sequential'
    },
    {
      name: 'brewer-pubugn',
      type: 'sequential'
    },
    {
      name: 'brewer-puor',
      type: 'diverging'
    },
    {
      name: 'brewer-purd',
      type: 'sequential'
    },
    {
      name: 'brewer-rdbu',
      type: 'diverging'
    },
    {
      name: 'brewer-rdgy',
      type: 'diverging'
    },
    {
      name: 'brewer-rdpu',
      type: 'sequential'
    },
    {
      name: 'brewer-rdylbu',
      type: 'diverging'
    },
    {
      name: 'brewer-rdylgn',
      type: 'diverging'
    },
    {
      name: 'brewer-spectral',
      type: 'diverging'
    },
    {
      name: 'brewer-ylgn',
      type: 'sequential'
    },
    {
      name: 'brewer-ylgnbu',
      type: 'sequential'
    },
    {
      name: 'brewer-ylorbr',
      type: 'sequential'
    },
    {
      name: 'brewer-ylorrd',
      type: 'sequential'
    },
    {
      name: 'brewer-blues',
      type: 'sequential'
    },
    {
      name: 'brewer-greens',
      type: 'sequential'
    },
    {
      name: 'brewer-oranges',
      type: 'sequential'
    },
    {
      name: 'brewer-purples',
      type: 'sequential'
    },
    {
      name: 'brewer-reds',
      type: 'sequential'
    },
    {
      name: 'brewer-greys',
      type: 'sequential'
    },
    {
      name: 'brewer-accent',
      type: 'qualitative'
    },
    {
      name: 'brewer-dark2',
      type: 'qualitative'
    },
    {
      name: 'brewer-paired',
      type: 'qualitative'
    },
    {
      name: 'brewer-pastel1',
      type: 'qualitative'
    },
    {
      name: 'brewer-pastel2',
      type: 'qualitative'
    },
    {
      name: 'brewer-set1',
      type: 'qualitative'
    },
    {
      name: 'brewer-set2',
      type: 'qualitative'
    },
    {
      name: 'brewer-set3',
      type: 'qualitative'
    },
    {
      name: 'd3-category10',
      type: 'qualitative'
    },
    {
      name: 'd3-category20',
      type: 'qualitative'
    },
    {
      name: 'd3-category20b',
      type: 'qualitative'
    },
    {
      name: 'd3-category20c',
      type: 'qualitative'
    }
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
