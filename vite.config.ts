import browserslist from 'browserslist';
import {resolveToEsbuildTarget} from 'esbuild-plugin-browserslist';
import {isAbsolute, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig, type Plugin} from 'vite';

const srcDir = fileURLToPath(new URL('./src/js', import.meta.url));
const entry = fileURLToPath(new URL('./src/js/index.ts', import.meta.url));
const packageDir = fileURLToPath(new URL('.', import.meta.url));

/**
 * Reduces esbuild targets to the minimum version per engine.
 *
 * Rolldown rejects multiple versions of the same engine, and only the oldest
 * version affects the output.
 *
 * @param targets esbuild targets, e.g. `['chrome93', 'chrome156']`.
 * @returns The lowest target per engine.
 */
function minimumTargets(targets: string[]): string[] {
  const minimums = new Map<string, {target: string; version: number}>();

  for (const target of targets) {
    const match = /^([a-z]+)([\d.]+)$/.exec(target);

    if (!match) {
      continue;
    }

    const [, engine, rawVersion] = match;
    const version = Number.parseFloat(rawVersion);
    const current = minimums.get(engine);

    if (!current || version < current.version) {
      minimums.set(engine, {target, version});
    }
  }

  return [...minimums.values()].map(({target}) => target);
}

const target = minimumTargets(
  resolveToEsbuildTarget(browserslist(undefined, {path: packageDir}), {
    printUnknownTargets: false
  })
);

type Chunk = {
  facadeModuleId?: string | null;
};

/**
 * Creates a file name resolver that preserves the source module structure.
 *
 * @param extension Output file extension.
 * @returns A Rolldown `entryFileNames` callback.
 */
function moduleFileNames(extension: 'js' | 'cjs') {
  return (chunk: Chunk) => {
    const id = chunk.facadeModuleId;

    if (!id) {
      return `[name].${extension}`;
    }

    const file = relative(srcDir, id);

    if (isAbsolute(file) || file.startsWith('..')) {
      return `[name].${extension}`;
    }

    return file.replace(/\.(ts|js)$/, `.${extension}`);
  };
}

/**
 * Emits a package.json with the given module type into the build output.
 *
 * @param type Module type for the generated package.json.
 * @returns A Vite plugin.
 */
function packageJson(type: 'module' | 'commonjs'): Plugin {
  return {
    name: `${type}-package-json`,
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'package.json',
        source: `{"type":"${type}"}\n`
      });
    }
  };
}

export default defineConfig(({mode}) => {
  switch (mode) {
    case 'cjs':
      return {
        plugins: [packageJson('commonjs')],
        build: {
          target,
          copyPublicDir: false,
          outDir: 'dist/cjs',
          lib: {
            entry,
            formats: ['cjs'],
            fileName: () => 'index.js'
          },
          rolldownOptions: {
            external: ['apca-w3'],
            output: {
              preserveModules: true,
              preserveModulesRoot: srcDir,
              entryFileNames: moduleFileNames('js')
            }
          }
        }
      };
    case 'umd':
      return {
        plugins: [packageJson('commonjs')],
        build: {
          target,
          copyPublicDir: false,
          outDir: 'dist/umd',
          minify: false,
          lib: {
            entry,
            name: 'chrys',
            formats: ['umd'],
            fileName: () => 'index.js'
          }
        }
      };
    case 'umd-min':
      return {
        plugins: [packageJson('commonjs')],
        build: {
          target,
          copyPublicDir: false,
          outDir: 'dist/umd',
          emptyOutDir: false,
          minify: true,
          lib: {
            entry,
            name: 'chrys',
            formats: ['umd'],
            fileName: () => 'index.min.js'
          }
        }
      };
    case 'es':
    default:
      return {
        plugins: [packageJson('module')],
        build: {
          target,
          copyPublicDir: false,
          outDir: 'dist/es',
          lib: {
            entry,
            formats: ['es'],
            fileName: () => 'index.js'
          },
          rolldownOptions: {
            external: ['apca-w3'],
            output: {
              preserveModules: true,
              preserveModulesRoot: srcDir,
              entryFileNames: moduleFileNames('js')
            }
          }
        }
      };
  }
});
