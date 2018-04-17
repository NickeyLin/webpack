'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
{{#if_eq entry "single"}}
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
{{/if_eq}}
{{#if_eq entry "multi"}}

const entries = webpackConfig.entry;

async function build(entry) {
  return new Promise((resolve, reject) => {

    let { assetsRoot, assetsSubDirectory } = config.build;

    rm(path.join(assetsRoot, assetsSubDirectory), err => {
      if (err) throw err;
      webpack(webpackConfig, function(err, stats) {
        // spinner.stop();
        if (err) throw err;
        process.stdout.write("\n");
        process.stdout.write(
          stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + "\n\n"
        );

        if (stats.hasErrors()) {
          console.log(chalk.red("  Build failed with errors.\n"));
          process.exit(1);
        }
        resolve();
        // console.log(chalk.cyan("  Build complete.\n"));
      });
    });
  });
}

async function start() {
  for (const target in entries) {
    if (entries.hasOwnProperty(target)) {
      const entry = entries[target];
      console.log(chalk.yellow(`\n------------------Building [${target}]------------------\n`));
      spinner.start(`building for production of [${target}] ... `);

      // setup entry
      webpackConfig.entry = entry;

      // setup output path
      webpackConfig.output.path = path.resolve(__dirname, "../dist", target);

      await build(entry);
      console.log(
        chalk.green(`\n------------------Build [${target}] complete!------------------\n`)
      );
    }
  }
  spinner.stop();
  console.log(chalk.cyan("  Build complete.\n"));
}

start();
{{/if_eq}}
