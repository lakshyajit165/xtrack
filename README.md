# xtrack
An app to keep a track of your expenses.

# Steps to run prepare and deploy a newer version to playstore:

- ionic cordova build android --prod --release
- (This will generate a release build based on the settings in the config.xml in the platforms/android/app/build/outputs/apk directory of an app. An Ionic app will have preset default values in this file but this can be changed to customize builds.)
- keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000 (This step needs to be ran only once. **NOTE** -alias alias_name is also created once and will be used in subsequent builds/deployments)
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore <path to unsigned apk> alias_name
- zipalign -v 4 <path to unsigned apk> <appname>.apk