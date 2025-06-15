'use strict';

/**
 * @fileOverview Placeholder for documenting CLI commands added by SpellCraft Packer integration.
 * This file (or these JSDoc blocks if placed elsewhere) describes the CLI commands
 * that become available when the SpellCraft Packer Integration module is active.
 */

// It's good practice to define the module itself if it's purely conceptual
// and doesn't correspond to a direct JavaScript file module export.

/**
 * @module spellcraft-packer-cli
 * @description This module represents the set of CLI commands provided by the
 * SpellCraft Packer Integration. These commands are added to the main
 * `spellcraft` CLI when the integration module is imported and active.
 */

/**
 * (Added by SpellCraft Packer Integration)
 * Generates files from a Jsonnet configuration, then runs `packer init` (optional)
 * and `packer build` on the output directory.
 *
 * This command orchestrates the rendering of Packer JSON configurations via SpellCraft
 * and then invokes HashiCorp Packer to initialize and build the machine images or artifacts.
 *
 * **Usage:** `spellcraft build <filename> [--skip-init]`
 *
 * @name build
 * @function
 * @memberof module:spellcraft-packer-cli
 * @param {string} filename - The path to the Jsonnet configuration file to consume. (Required)
 * @param {boolean} [skip-init=false] - If true, skips the `packer init` step before building.
 *                                         Useful if providers are already initialized or managed externally.
 *                                         Alias: `-s`.
 *
 * @example
 * # Render config.jsonnet, then run packer init and packer build
 * spellcraft build ./config.jsonnet
 *
 * @example
 * # Render config.jsonnet, skip packer init, then run packer build
 * spellcraft build ./config.jsonnet --skip-init
 * spellcraft build ./config.jsonnet -s
 */

const packer = require("@c6fc/packer");

exports._spellcraft_metadata = {
	cliExtensions: (yargs, spellframe) => {
		yargs.command("build <filename>", "Generate files from a configuration and run 'packer build' on the output", (yargs) => {
			return yargs.positional('filename', {
				describe: 'Jsonnet configuration file to consume'
			}).option('skip-init', {
				alias: 's',
				type: 'boolean',
				description: 'Skip provider initialization.'
			});
		}, async (argv) => {

			await spellframe.init();
			await spellframe.render(argv.filename);
			await spellframe.write();

			if (!argv['skip-init']) {
				await packer.exec("init", spellframe.renderPath);
			}

			await packer.exec("build", spellframe.renderPath);

		});

		console.log(`[+] Imported SpellFrame CLI extensions for @c6fc/packer`);
	},
	init: async () => {
		await packer.isReady();
	}
}