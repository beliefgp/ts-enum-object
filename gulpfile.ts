import gulp from 'gulp';
import ts from 'gulp-typescript';
import path from 'path';
import rimraf from 'rimraf';
import merge2 from 'merge2';

const cwd = process.cwd();

function getProjectPath(...filePath: string[]) {
  return path.join(cwd, ...filePath);
}

const tsDefaultReporter = ts.reporter.defaultReporter();
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

function compileTs(tsConfigPath: string, esModule: boolean, outDir: string) {
  const tsProject = ts.createProject(tsConfigPath, {
    module: esModule ? 'ESNext' : 'CommonJS',
    noEmitOnError: false,
  });

  let hasError = false;

  function check() {
    if (hasError) {
      process.exit(1);
    }
  }

  const tsResult = tsProject
    .src()
    .pipe(
      tsProject({
        error: (...args) => {
          hasError = true;
          tsDefaultReporter.error(...args);
        },
        finish: tsDefaultReporter.finish,
      }),
    )
    .on('finish', check)
    .on('end', check);

  const jsFile = tsResult.js.pipe(gulp.dest(outDir));
  const tsdFile = tsResult.dts.pipe(gulp.dest(outDir));

  return merge2([jsFile, tsdFile]);
}

const compile = (tsConfigPath: string) => {
  rimraf.sync(esDir);
  rimraf.sync(libDir);

  const esTask = gulp.parallel(done => compileTs(tsConfigPath, true, esDir).on('finish', done));

  const libTask = gulp.parallel(done => compileTs(tsConfigPath, false, libDir).on('finish', done));

  return gulp.parallel(esTask, libTask);
};

export default compile(require.resolve('./tsconfig.json'));
