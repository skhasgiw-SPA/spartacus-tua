/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <deborah.cholmeley-jones@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// Script used by node sass to resolve external imputs
// Used only to test library
module.exports = function importer(url, prev, done) {
  if (url[0] === '~') {
    return { file: resolveModule(url.substr(1), prev) };
  } else {
    return null;
  }
};

// Resolve the import path for external modules (ex: Bootstrap)
function resolveModule(targetUrl, prev) {
  var baseUrl = prev.split('projects')[0];
  return baseUrl.concat('node_modules/', targetUrl);
}
