# CTRLbot-IoT Phone Walkthrough v1.0.9: transcript

**Status: corrected 2026-09-30.** Machine transcript from `faster-whisper 1.2.1` `medium.en`, not yet
checked against the recording. Correct it by hand against the frames in
`ingest/iot-phone-walkthrough/contact.html`, then change this line to `Status: corrected <date>`.
Once corrected it is the script of record, and a re-run of `npm run ingest:recording`
leaves it alone unless given `--force`.

- Source: `video input/CTRLbot-IoT Phone Walkthrough v1.0.9.mp4` (6:58, h264 1130x1970 29.92fps, aac 48000 Hz mono)
- Narration: `public/narration/iot-phone-walkthrough/source-normalized.m4a`
- Word timings: `ingest/iot-phone-walkthrough/words.json`, in seconds on the narration track, which
  shares the recording's time base. Cut a narration edit list straight from them.

"Control Bot" is written **CTRLbot**. Product names past that, and anything misheard, are
corrected by hand. Filler and false starts stay: this is an index into what was said, not
a polished read.

---

## Timestamped transcript

| Time | Line |
| --- | --- |
| 0:01.3 | Welcome to CTRLbot. This will be a walkthrough of CTRLbot IoT, the Android app available for phone and tablets. Let's get started. |
| 0:12.8 | When you first open up the app, you're presented with a short walkthrough that'll help you navigate the application and set it up for control. |
| 0:21.5 | You can X out of this anytime, and you can get back into it through the setup page if you need to. |
| 0:28.7 | The first thing you see is our CTRLbot AI. |
| 0:34.0 | This is a walking, talking manual and troubleshooter. |
| 0:39.4 | It'll help you with setting up |
| 0:41.9 | control and any issues you have with the room and operation. |
| 0:48.4 | It really begins with our device driver database. |
| 0:53.3 | We have an extensive database with hundreds of manufacturers, |
| 0:57.3 | thousands of commands, control devices through IP, |
| 1:02.0 | or with an endpoint, you can control it with RS-232 or IR. |
| 1:08.9 | Endpoints sit on the network and then they can convert IP |
| 1:13.0 | to something else like serial or infrared. |
| 1:18.1 | Let's start by just adding a simple projector. |
| 1:23.2 | When I select Epson, |
| 1:24.5 | you can see it has lots of device information, |
| 1:26.6 | specs, setup, support. |
| 1:28.7 | If you want to look at the product page |
| 1:30.8 | or the manufacturer page, just click on this link |
| 1:34.4 | and it'll take you to the manufacturer page |
| 1:36.5 | or to the product page, depending on what you want to view. |
| 1:42.0 | Simply press the plus button to add the device |
| 1:45.7 | and then enter in the IP address. |
| 1:53.0 | Once I'm connected, it automatically saves this connection. |
| 1:56.6 | I can do some testing here by selecting some of these buttons |
| 2:00.6 | And you can see the terminal shows that right there. |
| 2:03.8 | If I needed to send something directly to it, |
| 2:06.9 | I would just click on this and I can put in a message. |
| 2:15.5 | Xing out of this saves that connection. |
| 2:19.4 | And then you can come in and do more testing of it. |
| 2:24.1 | You can use the buttons. |
| 2:25.8 | You can test it as a switcher. |
| 2:29.2 | You can go back to the terminal |
| 2:31.5 | or you can access the device webpage if it has one. |
| 2:35.6 | You can always come back in here |
| 2:37.2 | and edit the connections if you need to. |
| 2:40.9 | Next, let's go to activities. |
| 2:43.9 | Activities are where you set up what the end user will see |
| 2:48.2 | in the final unified user interface. |
| 2:53.5 | And this builds itself. |
| 2:55.3 | You can come in and you can see that Power On |
| 2:58.1 | and already has the Epson PowerLite power on command. |
| 3:03.7 | And the same with switcher, right? |
| 3:05.7 | If you haven't added any other switchers, |
| 3:07.8 | it'll use that Epson as the switcher |
| 3:11.1 | and the same for audio, right? |
| 3:13.8 | If you need to do any customization, you can, |
| 3:16.5 | but if not, you can go straight to the end user interface. |
| 3:21.6 | This is where you control the room. |
| 3:24.7 | The person that walks in through the door |
| 3:27.2 | and needs to use this space sees this interface and they can turn it on and then they can select |
| 3:35.4 | sources to send to that Epson projector screen. They can manipulate the audio |
| 3:43.7 | and they can power the room off or on. If you need to make changes just press and hold the setup |
| 3:53.7 | button and it'll take you back to these setup menus. I'd like to show you a new feature it's |
| 4:06.6 | called device discovery. Basically it goes out and scans the network for any attached devices |
| 4:13.8 | and then tries to make a connection to the device driver library. So let's go ahead and add some |
| 4:24.7 | endpoints from Matrox. |
| 4:27.1 | These are IPMX encoders and decoders, |
| 4:31.0 | and that's a universal control protocol |
| 4:34.1 | that we just added. |
| 4:38.4 | And just adding these drivers, |
| 4:41.8 | we'll add them to add the connection. |
| 4:45.7 | And what's happening behind the scenes |
| 4:47.6 | is that it's actually making the connection, |
| 4:50.6 | verifying it, and then adding and saving it, right? |
| 4:53.6 | And if you needed to approve any certs |
| 4:57.8 | or have a login and password, |
| 5:01.1 | it'll pop up and it'll prompt you for those things. |
| 5:07.1 | Great. |
| 5:10.5 | Now that we've added them, |
| 5:12.0 | we can come into the connect menu |
| 5:14.4 | and you can see in here, |
| 5:17.5 | if we want to do some testing, |
| 5:19.9 | we can just select the whole Matrox, right? |
| 5:24.5 | And then you will have the whole switcher here. |
| 5:27.3 | At any point you wanted to go into each individual one, |
| 5:30.7 | you just select them right here. |
| 5:33.4 | Again, we can come into activities |
| 5:36.4 | and we'll want to set the switcher |
| 5:40.0 | to encoders and decoders. |
| 5:43.0 | And here we are, we have all of our encoders |
| 5:45.6 | and decoders all set up. |
| 5:46.9 | If I wanted to change the icon or the label, |
| 5:49.3 | I would do that right here. |
| 5:51.7 | Let's go to the end user interface. |
| 5:54.4 | Oh, you can see now our interface has changed |
| 5:56.2 | from many to one output to many to many. |
| 6:02.2 | And I can change these just by selecting a source |
| 6:06.6 | and then selecting a display. |
| 6:09.8 | I can also drag and drop, oops, |
| 6:12.9 | I can also drag and drop these in like that. |
| 6:17.9 | Also, if you select a source and then hit this all button, |
| 6:22.1 | it'll navigate that to all the displays. |
| 6:24.4 | And again, if I want to make any changes, |
| 6:33.2 | I'll just press the Setup button. |
| 6:36.3 | And then if I wanted to do anything |
| 6:38.0 | like look at the User Manual, review the Quick Start, |
| 6:42.3 | or do a complete factory reset, |
| 6:44.3 | I would do that from the Settings page. |
| 6:49.3 | Thank you for your time. |
| 6:51.2 | I hope this was informative. |
