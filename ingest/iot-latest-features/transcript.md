# W05 Feture walkthroug: transcript

**Status: corrected 2026-10-02.** Machine transcript from `faster-whisper 1.2.1` `medium.en`, checked
against the recording and contact sheet.
Once corrected it is the script of record, and a re-run of `npm run ingest:recording`
leaves it alone unless given `--force`.

- Source: `video input/W05 Feture walkthroug.mp4` (6:59, h264 1698x1218 30fps, aac 48000 Hz mono)
- Narration: `public/narration/iot-latest-features/source-normalized.m4a`
- Word timings: `ingest/iot-latest-features/words.json`, in seconds on the narration track, which
  shares the recording's time base. Cut a narration edit list straight from them.

"Control Bot" is written **CTRLbot**. Product names past that, and anything misheard, are
corrected by hand. Filler and false starts stay: this is an index into what was said, not
a polished read.

---

## Timestamped transcript

| Time | Line |
| --- | --- |
| 0:00.9 | Welcome to CTRLbot. This will be a short walkthrough of the latest features and benefits of the CTRLbot IoT app and the latest release. Let's get started. |
| 0:22.1 | We added a bunch of new devices and really increased our database. |
| 0:31.5 | It's already a really large database of hundreds of manufacturers, thousands of commands. |
| 0:39.6 | And what we did was we added a new category called network switches. |
| 0:45.8 | We only have the Luxul in there right now. |
| 0:47.6 | but this is gonna have a lot more switches coming up |
| 0:52.1 | and it's gonna aid in setting up switches for AV over IP. |
| 0:57.2 | And on that note, we added a lot more AV over IP endpoints. |
| 1:01.8 | We have IPMX, which is this universal protocol |
| 1:06.3 | for AV over IP switching and control. |
| 1:11.8 | We also added Kramer, Matrox, |
| 1:14.7 | and Hall Research endpoints for AV over IP. |
| 1:20.4 | As far as endpoints for RS-232, |
| 1:25.8 | IP to RS-232, or IP to IR, |
| 1:30.4 | we've added additional models for Global Caché. |
| 1:35.4 | We have their complete line now. |
| 1:37.6 | We also added a PUSR, |
| 1:40.1 | which is an industrial-type wireless or wired Ethernet portal |
| 1:48.7 | and allows you to convert IP to RS-232 or RS-45 <!-- 114–116s: RS-485 or RS-45 unconfirmed --> |
| 1:56.8 | or just connect the tablet straight to the device |
| 2:00.4 | and then control IP devices on the network. |
| 2:04.9 | So this is a great, great product. |
| 2:06.9 | Um, and, and so, yeah, we added all these, these devices here, but the, the, the biggest, |
| 2:13.3 | uh, uh, you know, quality of life, uh, and just, um, uh, feature that we added is this |
| 2:21.9 | device discovery up here in the corner, right? |
| 2:24.3 | And you can see here, um, what, what this is doing is going out and scanning, uh, the, |
| 2:30.3 | the network for any connected devices, right? |
| 2:32.8 | And then it's making a match when it sees something on the network that is matching a device driver in the database, then it'll allow you to add that driver just with one click and see how easy that is. |
| 2:51.6 | And right now I'm adding some Matrox MGX decoders |
| 2:56.6 | and encoders. |
| 2:58.1 | And if there was any kind of authorization |
| 3:01.3 | that needs to happen here, |
| 3:02.9 | or a sort of certificate that needs to be trusted, |
| 3:09.2 | that would pop up. |
| 3:11.1 | But for these devices that isn't required. |
| 3:16.3 | And let's add a Global Caché as well. |
| 3:20.1 | And so I can kind of show you a couple of things with that. |
| 3:25.3 | All right, let's take a look. |
| 3:27.1 | I'm gonna also just add an Acer projector, RS-232. |
| 3:32.9 | And I'm adding that so you can kind of see |
| 3:36.1 | that we have this, you know, end point right in here |
| 3:41.6 | and we can connect to it directly. |
| 3:44.6 | And then you can see how that kind of, |
| 3:47.4 | this whole terminal is new right here. |
| 3:50.8 | also the layout, the way that we have the commands |
| 3:55.3 | and the configuration on the right. |
| 3:59.8 | And so all that's new. |
| 4:02.6 | All right, now we can come into connect here |
| 4:05.0 | and take a look at some of the connections. |
| 4:09.9 | You can obviously test the Matrox switcher |
| 4:12.6 | and see how it's connected to all of them as a group. |
| 4:18.6 | You can select any of the individual ones |
| 4:21.4 | if you want to control any of those. |
| 4:25.3 | We're gonna just look at the Global Caché real quick |
| 4:28.3 | because I wanna show you some of the different options |
| 4:30.7 | you have now. |
| 4:32.3 | So you have your buttons that you can just go in |
| 4:34.4 | and you can set the Global Caché |
| 4:37.1 | or you can open up the terminal now directly, right? |
| 4:40.7 | And I can send, I get devices and you can see the feedback. |
| 4:44.0 | If I wanted to send a command directly, |
| 4:46.7 | I can do that from right here as well. |
| 4:48.7 | Let's see, just gives you another option |
| 4:51.9 | to be able to send and test things using the console |
| 4:56.6 | and a great new addition to the feature set there. |
| 5:04.3 | And additionally, if the device has a webpage, right, |
| 5:08.3 | then you'll be able to access that webpage directly, |
| 5:11.4 | which is really, really, really good, |
| 5:15.1 | especially for a device like this, we can come right in and you can change any of the parameters |
| 5:21.7 | if you want to do that instead of using the terminal or somewhere else. |
| 5:29.7 | Great. Now let's just take a look at our activities. We haven't really changed too much |
| 5:37.0 | here. But we do have a addition that you can you can basically |
| 5:42.5 | add messages, right? Hello, world, right to and this will |
| 5:51.1 | pop up when you hit that power off button, right. And you can |
| 5:57.1 | see our av over IP. So already set up, you can change the fonts |
| 6:02.0 | or the labels and you can change the icons for the sources. |
| 6:09.5 | Let's go into the end user interface. |
| 6:13.0 | Another great feature now is you can drag and drop |
| 6:18.3 | the sources on there. |
| 6:19.6 | You still have the option to select source, select output, |
| 6:25.3 | or you can drag and drop source to output. |
| 6:29.3 | And of course you can select a source |
| 6:31.7 | and send to all by hitting that all button. |
| 6:36.1 | Also, just a little safety feature. |
| 6:38.7 | We have a little X in the corner. |
| 6:40.6 | So if you want to cancel or power off, |
| 6:42.6 | you're able to do that now. |
| 6:46.0 | And it's a good little feature. |
| 6:47.8 | And there's our hello world message. |
| 6:50.1 | Isn't that wonderful? |
| 6:51.4 | Anyway, thanks for joining me. |
| 6:52.9 | And I hope this was informative. |
