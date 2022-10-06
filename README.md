# l4d2-modman

ModMan is a mod manager GUI for L4D2 for Windows and Linux (and probably Mac OS too). Realistically this could work for any source engine game, but it's mainly focused around L4D2. 

![ModMan in action](/media/showcase.png)

**THIS IS A LEGACY VERSION AND IT'S QUITE UNFINISHED!**  I'm letting this version of ModMan behind and integrating it's features in a new app. I have now become familiar with Electron and I plan on rewriting it all for a better version. Soon(tm).

That being said, ModMad does actually do a bunch of cool stuff:

- It lets user sort and filter throught their mods by various categories and settings
- Detect conflicting mods
- Fetch missing mod info online via the workshop
- Apply labels to mods based on the files a mod modifies

Pretty darn cool, I know. But currently the design is clunky and the app can be quite slow at times. I blame spaghetti code and my (at the time) unfamiliarity of Electron.

### Getting started

This will get modman up and running:

```
cd frontend
npm i
npm run dev
```
