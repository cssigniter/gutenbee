# GutenBee - WordPress Plugin
Premium Blocks for WordPress

## Table of Contents
- [Development](#development)
- [Build](#build)
- [Updating readme.txt without releasing a new version](#updating-readmetxt-without-releasing-a-new-version)
- - [Easiest way, more local files](#easiest-way-more-local-files)
- - [Harder way, less local files](#harder-way-less-local-files)
- [Releasing new versions to WP.org](#releasing-new-versions-to-wporg)

## Development
Development must be made in short-lived branches. When a feature is complete, its branch should be merged into `main` and get deleted. The `main` branch should remain stable at all times.

Install [nvm](https://github.com/nvm-sh/nvm) and [yarn](https://yarnpkg.com/getting-started/install) on your machine.

While developing, inside the plugin folder run:
```
nvm use
yarn
yarn start
```

## Build
Run `yarn build` before releasing an update.

## Updating readme.txt without releasing a new version
Updating the .org's readme.txt file via Github is not possible. Instead, it should be done via Subversion.
The following guide assumes your git repositories reside in a `git` folder, and your svn repositories in an `svn` folder. Replace as necessary.

### Easiest way, more local files
If you don't have one already, checkout a working copy of the whole repo:
```
cd svn
svn checkout https://plugins.svn.wordpress.org/gutenbee
```
Assuming `1.0.2` as the latest released version, make your changes in **3 files** (edit in git, copy/paste in the others):
1. In **git**'s copy of `git/gutenbee/readme.txt`
2. In **svn**'s `svn/gutenbee/trunk/readme.txt`
3. In **svn**'s `svn/gutenbee/tags/1.0.2/readme.txt`.

Then:
1. Commit and push `git/gutenbee` via git.
2. Commit `svn/gutenbee` via svn.

### Harder way, less local files
Assuming you don't have a working copy of the whole repo, run this to only get the basic structure:
```
cd svn
svn checkout --depth=immediates https://plugins.svn.wordpress.org/gutenbee
cd gutenbee
svn update trunk --set-depth=inifnity
svn update tags --set-depth=immediates
```

Now, if you want to see the files of the `1.0.2` tag, do:
```
cd tags
svn update 1.0.2 --set-depth=inifnity
```

You should see a list of files added.

Now edit the 3 copies of the readme.txt and commit, as described above (in the **Easiest way** section).

Finally, to get rid of the tag's files, do:
```
cd tags
svn update 1.0.2 --set-depth=empty
```

You should see a list of files removed. 

## Releasing new versions to WP.org
Before releasing a new version (e.g. **1.0.2**), make sure `main` is ready to be released. This includes:
- Make sure files inside the `build` folder are ready for release. Open them and check they are minified. If not, run the build step above.
- In `gutenbee.php` the plugin header `Version:` number is set to 1.0.2
- Also in `gutenbee.php` the constant `GUTENBEE_PLUGIN_VERSION` number is set to 1.0.2
- The language file `languages/gutenbee.pot` has been updated, if needed.
- The `readme.txt` file has:
  - **Tested up to:** is set to the latest WordPress version.
  - **Stable tag:** is set to 1.0.2
  - A **changelog** entry for 1.0.2 has been created at the bottom of the file.

Then we need to create a [new Release](https://github.com/cssigniter/gutenbee/releases/new).
- **Choose a tag:** Type in the exact new version number without a `v`, i.e. `1.0.2`, and click on the `+ Create new tag: 1.0.2 on publish`
- **Release title:** Type in the exact new version number without a `v`.
- **Target:** Normally should be `main`, unless we need to release a hotfix off of a branch.
- **Description:** The release's changelog.
- **Publish release:** Upon publishing a release, a Github action will run which will:
  - Release the plugin in wp.org
  - Generate a zip file and attach it to the newly created release.
