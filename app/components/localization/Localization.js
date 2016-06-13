var Localization = require("Localization");
/*
 * Localization.getCurrentLocale() will return:
 * from iOS:
 *         [language designator]-[script designator]-[region designator]
 *                                                                     (e.g. zh-Hans-US, en-US, etc.)
 * from Android:
 *             [two-leter lowercase language code (ISO 639-1)]_[two-letter uppercase country codes (ISO 3166-1)]
 *                                                                                                             (e.g. zh_CN, en_US, etc.)
 */

var deviceLocale = Localization.getCurrentLocale().split('-');

/*
 * Turns "zh-Hans-US" into "zh-Hans" or "en-GB" into "en", this might not a practical solution for your own app's requirements
 */
 
deviceLocale = deviceLocale.slice( 0, deviceLocale.length === 3 ? 2 : 1 ).join('-');

var defaultLocale = { language: "en", code: "en_US" };
var supportedLocales = [
	{ language: "zh", 		code: "zh_CN" },
	{ language: "zh_CN", 	code: "zh_CN" },
	{ language: "zh-Hans", 	code: "zh_CN" },
	{ language: "zh_TW", 	code: "zh_TW" },
	{ language: "zh-Hant", 	code: "zh_TW" },
	{ language: "ko", 		code: "ko_KR" },
	{ language: "ko_KR", 	code: "ko_KR" }
];

/*
 * Each OS returns a string in a unique format and will need to be managed within your app.
 * The differences are outlined below:
 *
 * Android
 *   Will retrun: [two-letter lowercase language code (ISO 639-1)]_[two-letter uppercase country code (ISO 3166-1)]
 *   >> For example: `en_US` or `zh_CN`
 *   More details can be found here:
 *   http://developer.android.com/reference/java/util/Locale.html
 *
 * iOS
 *   Will return: [language designator]-[script designator]-\[region designator\]
 *   **For example:** `zh-Hans-US` or `en-US`
 *   More details can be found here:
 *   https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html
 *   https://developer.apple.com/library/ios/technotes/tn2418/_index.html
 *
 * Windows / Mac
 *   Will return the value `"Default"`.
 *   You can change this value in `Localization.uno` or manage it in your JavaScript.
 */

function findLanguage(obj) {
	return obj.language.toLowerCase() === deviceLocale.toLowerCase();
}

var locale = supportedLocales.find(findLanguage) || defaultLocale;

module.exports = {
	locale: locale.code,
	deviceLocale: deviceLocale
};
