/**
 * The general module is different.
 * It has several submodules that should be exported.
 */

// Some useful tools for working with data.
export * from './data/module';

// A framework for validator functions that return
// the reasons for why an input was considered invalid.
export * from './validator-with-reasons-framework/module';

// Some useful tools for working with arrays.
export * from './my-array-extensions/module';