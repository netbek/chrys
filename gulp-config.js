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
  palettes: [
    {
      bokehName: 'Colorblind',
      group: '',
      name: 'colorblind',
      type: 'qualitative'
    },
    {
      bokehName: 'Inferno',
      group: 'mpl',
      name: 'mpl-inferno',
      type: 'sequential'
    },
    {
      bokehName: 'Magma',
      group: 'mpl',
      name: 'mpl-magma',
      type: 'sequential'
    },
    {
      bokehName: 'Plasma',
      group: 'mpl',
      name: 'mpl-plasma',
      type: 'sequential'
    },
    {
      bokehName: 'Viridis',
      group: 'mpl',
      name: 'mpl-viridis',
      type: 'sequential'
    },
    {
      bokehName: 'BrBG',
      group: 'brewer',
      name: 'brewer-brbg',
      type: 'diverging'
    },
    {
      bokehName: 'BuGn',
      group: 'brewer',
      name: 'brewer-bugn',
      type: 'sequential'
    },
    {
      bokehName: 'BuPu',
      group: 'brewer',
      name: 'brewer-bupu',
      type: 'sequential'
    },
    {
      bokehName: 'GnBu',
      group: 'brewer',
      name: 'brewer-gnbu',
      type: 'sequential'
    },
    {
      bokehName: 'OrRd',
      group: 'brewer',
      name: 'brewer-orrd',
      type: 'sequential'
    },
    {
      bokehName: 'PiYG',
      group: 'brewer',
      name: 'brewer-piyg',
      type: 'diverging'
    },
    {
      bokehName: 'PRGn',
      group: 'brewer',
      name: 'brewer-prgn',
      type: 'diverging'
    },
    {
      bokehName: 'PuBu',
      group: 'brewer',
      name: 'brewer-pubu',
      type: 'sequential'
    },
    {
      bokehName: 'PuBuGn',
      group: 'brewer',
      name: 'brewer-pubugn',
      type: 'sequential'
    },
    {
      bokehName: 'PuOr',
      group: 'brewer',
      name: 'brewer-puor',
      type: 'diverging'
    },
    {
      bokehName: 'PuRd',
      group: 'brewer',
      name: 'brewer-purd',
      type: 'sequential'
    },
    {
      bokehName: 'RdBu',
      group: 'brewer',
      name: 'brewer-rdbu',
      type: 'diverging'
    },
    {
      bokehName: 'RdGy',
      group: 'brewer',
      name: 'brewer-rdgy',
      type: 'diverging'
    },
    {
      bokehName: 'RdPu',
      group: 'brewer',
      name: 'brewer-rdpu',
      type: 'sequential'
    },
    {
      bokehName: 'RdYlBu',
      group: 'brewer',
      name: 'brewer-rdylbu',
      type: 'diverging'
    },
    {
      bokehName: 'RdYlGn',
      group: 'brewer',
      name: 'brewer-rdylgn',
      type: 'diverging'
    },
    {
      bokehName: 'Spectral',
      group: 'brewer',
      name: 'brewer-spectral',
      type: 'diverging'
    },
    {
      bokehName: 'YlGn',
      group: 'brewer',
      name: 'brewer-ylgn',
      type: 'sequential'
    },
    {
      bokehName: 'YlGnBu',
      group: 'brewer',
      name: 'brewer-ylgnbu',
      type: 'sequential'
    },
    {
      bokehName: 'YlOrBr',
      group: 'brewer',
      name: 'brewer-ylorbr',
      type: 'sequential'
    },
    {
      bokehName: 'YlOrRd',
      group: 'brewer',
      name: 'brewer-ylorrd',
      type: 'sequential'
    },
    {
      bokehName: 'Blues',
      group: 'brewer',
      name: 'brewer-blues',
      type: 'sequential'
    },
    {
      bokehName: 'Greens',
      group: 'brewer',
      name: 'brewer-greens',
      type: 'sequential'
    },
    {
      bokehName: 'Oranges',
      group: 'brewer',
      name: 'brewer-oranges',
      type: 'sequential'
    },
    {
      bokehName: 'Purples',
      group: 'brewer',
      name: 'brewer-purples',
      type: 'sequential'
    },
    {
      bokehName: 'Reds',
      group: 'brewer',
      name: 'brewer-reds',
      type: 'sequential'
    },
    {
      bokehName: 'Greys',
      group: 'brewer',
      name: 'brewer-greys',
      type: 'sequential'
    },
    {
      bokehName: 'Accent',
      group: 'brewer',
      name: 'brewer-accent',
      type: 'qualitative'
    },
    {
      bokehName: 'Dark2',
      group: 'brewer',
      name: 'brewer-dark2',
      type: 'qualitative'
    },
    {
      bokehName: 'Paired',
      group: 'brewer',
      name: 'brewer-paired',
      type: 'qualitative'
    },
    {
      bokehName: 'Pastel1',
      group: 'brewer',
      name: 'brewer-pastel1',
      type: 'qualitative'
    },
    {
      bokehName: 'Pastel2',
      group: 'brewer',
      name: 'brewer-pastel2',
      type: 'qualitative'
    },
    {
      bokehName: 'Set1',
      group: 'brewer',
      name: 'brewer-set1',
      type: 'qualitative'
    },
    {
      bokehName: 'Set2',
      group: 'brewer',
      name: 'brewer-set2',
      type: 'qualitative'
    },
    {
      bokehName: 'Set3',
      group: 'brewer',
      name: 'brewer-set3',
      type: 'qualitative'
    },
    {
      bokehName: 'Category10',
      group: 'd3',
      name: 'd3-category10',
      type: 'qualitative'
    },
    {
      bokehName: 'Category20',
      group: 'd3',
      name: 'd3-category20',
      type: 'qualitative'
    },
    {
      bokehName: 'Category20b',
      group: 'd3',
      name: 'd3-category20b',
      type: 'qualitative'
    },
    {
      bokehName: 'Category20c',
      group: 'd3',
      name: 'd3-category20c',
      type: 'qualitative'
    }
  ],
  css: {
    params: {
      includePaths: ['src/css'],
      errLogToConsole: true
    }
  },
  illustratorTasks: {
    swatches: {
      document: {
        height: 210, // mm
        width: 297 // mm
      },
      characterStyles: [
        {
          name: 'swatchRectTitle',
          attributes: {
            size: 8 // pt
          }
        }
      ],
      swatchRect: {
        textPosition: 0.125 // Value between 0 and 1
      }
    }
  },
  watchTasks: [
    //
    {
      files: ['src/css/_variables.scss', 'src/demo/**/*', 'src/templates/**/*'],
      tasks: ['build']
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
      default: 'firefox',
      darwin: 'google chrome',
      linux: 'google-chrome',
      win32: 'chrome'
    }
  }
};
