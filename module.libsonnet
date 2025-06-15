/**
 * @file spellcraft-packer_libsonnet
 * @fileOverview Core utility functions and constants for SpellCraft Packer integration.
 * This libsonnet file provides helper functions commonly used when defining
 * Packer configurations with SpellCraft and Jsonnet.
 *
 * It makes native SpellCraft functions like `envvar` and `path` directly
 * available within this libsonnet context.
 *
 * @description
 * **Module:** `spellcraft-packer_libsonnet` (This line is for human readers; JSDoc uses @name below)
 */

// We define the module and its members using separate "floating" JSDoc blocks
// that are not directly above the Jsonnet code, to avoid parsing issues.

/**
 * @module spellcraft-packer_libsonnet
 * @description Provides core utility functions and constants for SpellCraft Packer integration.
 */

/**
 * Retrieves the value of an environment variable.
 * This is a wrapper around the SpellCraft native function `envvar`.
 *
 * @function envvar
 * @memberof module:spellcraft-packer_libsonnet
 * @param {string} name - The name of the environment variable to retrieve.
 * @returns {string|boolean} The value of the environment variable if found,
 *                           otherwise `false`.
 * @example
 * local user = $.envvar("USER");
 * if user then { username: user } else {}
 */

/**
 * Returns the absolute path of the directory containing the currently processed
 * main Jsonnet file.
 * This is a wrapper around the SpellCraft native function `path`.
 *
 * @function path
 * @memberof module:spellcraft-packer_libsonnet
 * @returns {string} The absolute directory path.
 * @example
 * local currentDir = $.path();
 * {
 *   source_file: currentDir + "/my_script.sh"
 * }
 */

{
  local sonnetry = self,

  envvar(name):: std.native("envvar")(name),

  path():: std.native("path")(),
}