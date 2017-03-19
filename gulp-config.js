module.exports = {
  'autoprefixer': {
    'browsers': [
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
  'css': {
    'params': {
      'includePaths': [
        'src/'
      ],
      'errLogToConsole': true
    }
  },
  'watchTasks': [
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
  'webserver': {
    'host': 'localhost',
    'port': 8000,
    'path': '/',
    'livereload': false,
    'directoryListing': false,
    'open': '/demo/',
    'https': false,
    'browsers': {
      'default': 'firefox',
      'darwin': 'google chrome',
      'linux': 'google-chrome',
      'win32': 'chrome'
    }
  }
};
