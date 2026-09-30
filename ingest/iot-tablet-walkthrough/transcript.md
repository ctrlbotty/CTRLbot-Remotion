# CTRLbot-IoT Walkthough v1.09: transcript

**Status: DRAFT.** Machine transcript from `faster-whisper 1.2.1` `medium.en`, not yet
checked against the recording. Correct it by hand against the frames in
`ingest/iot-tablet-walkthrough/contact.html`, then change this line to `Status: corrected <date>`.
Once corrected it is the script of record, and a re-run of `npm run ingest:recording`
leaves it alone unless given `--force`.

- Source: `video input/CTRLbot-IoT Walkthough v1.09.mp4` (7:07, h264 2040x1440 60fps, aac 48000 Hz mono)
- Narration: `public/narration/iot-tablet-walkthrough/source-normalized.m4a`
- Word timings: `ingest/iot-tablet-walkthrough/words.json`, in seconds on the narration track, which
  shares the recording's time base. Cut a narration edit list straight from them.

"Control Bot" is written **CTRLbot**. Product names past that, and anything misheard, are
corrected by hand. Filler and false starts stay: this is an index into what was said, not
a polished read.

---

## Timestamped transcript

| Time | Line |
| --- | --- |
| 0:01.5 | Welcome to CTRLbot. This will be a walkthrough of the CTRLbot IoT app that's available for Android, for phone, tablet, and Chromebook. Let's get started. |
| 0:14.8 | When you first open up the app, you'll have a nice little walkthrough. You can close this out or review it. If you ever want to get back to it, you can go into settings here and click on the quick start. |
| 0:28.2 | The first thing you'll see when you open up the app is our |
| 0:32.5 | CTRLbot.ai. And this is |
| 0:35.8 | going to help you figure out and troubleshoot things and also |
| 0:40.0 | is a living manual. So anything, |
| 0:44.2 | any questions you have about the application or how to set it up, you |
| 0:48.2 | can just put in right here. Alright, let's get started. |
| 0:54.0 | It all begins with adding devices, right? And we have an |
| 0:58.0 | extensive device driver library of IP RS-232 and IR as well. |
| 1:04.5 | In order to use RS-232 or IR, |
| 1:07.4 | you'll have to use one of our endpoints |
| 1:10.0 | and you can always sort these things out |
| 1:12.6 | through our sorting right here. |
| 1:16.9 | Let's just add a projector. |
| 1:19.7 | And you can see when I click on the actual projector, |
| 1:22.7 | it opens up this nice little page |
| 1:24.5 | and gives you all kinds of great information. |
| 1:26.4 | If I want, I can go to the manufacturer webpage right here, and I can also go to the product |
| 1:33.3 | page as well. |
| 1:35.8 | And down here, you can see all kinds of all the information that you need to make the |
| 1:41.0 | connection. |
| 1:42.3 | Just hitting plus will take you to this page. |
| 1:45.1 | And then we can just put in the IP address of our projector. |
| 2:05.2 | Pressing connect, once that connection is made, it automatically saves that connection. |
| 2:09.7 | So you don't have to actually hit a save button. |
| 2:12.5 | And if you want, you can test some |
| 2:15.7 | of these commands right here. |
| 2:20.1 | If you need to test the actual device, |
| 2:22.3 | we have a little device testing page. |
| 2:24.7 | There's like a tech page, right? |
| 2:26.2 | So all the devices that you add to the system |
| 2:28.8 | will be listed right here. |
| 2:30.1 | And then you can go through and test it out. |
| 2:33.6 | And here's what it looked like as a switcher, right? |
| 2:37.5 | And here's a terminal, always available |
| 2:39.6 | so that you can always communicate with the device |
| 2:41.7 | and test any of these commands. |
| 2:44.5 | Also, if the device has a webpage, |
| 2:46.4 | it'll take you to that webpage right here. |
| 2:49.8 | The next step is going to be setting up the activities. |
| 2:53.3 | And these activities form themselves, right? |
| 2:56.8 | So there isn't a whole lot that you have to do, |
| 3:01.4 | but of course you can customize this any way you want. |
| 3:04.8 | And so you have your power presets, right? |
| 3:07.9 | You can see how our projector |
| 3:09.8 | already turned on and off, you can you can assign a switcher, and the Epson has been selected as the |
| 3:17.4 | switcher, and then you can assign the audio levels. And these are all what's going to get set up for |
| 3:24.0 | the end user interface. And once you have all this set up, you click on the end user interface, |
| 3:29.3 | and then this locks it down for the actual end user, right? And you can test it as the technician. |
| 3:37.3 | and you can see my TV, my projector is switching, |
| 3:43.7 | and I can change the volume, I can mute it, |
| 3:49.8 | and I can power the system down. |
| 3:58.7 | Anytime I need to go back and change anything, |
| 4:01.3 | I just press and hold the little setup button, |
| 4:03.9 | and it'll take me right back here. |
| 4:06.5 | Let's go ahead and add some more devices. |
| 4:09.3 | You see up in the corner, |
| 4:10.4 | there's a little discovery feature. Clicking on it, you can see it scans a whole network |
| 4:17.5 | and tries to find a match for the devices that are on the network that are also in the device |
| 4:25.0 | driver database. And so we have a few of Matrox endpoints, right? And these use IPMX, |
| 4:36.7 | which is a universal control protocol, and we're going to add a bunch of these. |
| 4:41.9 | So let's just add these. And one click, all you need. If there's setup information, |
| 4:49.1 | like a login, or any kind of certificates that need to be authorized, they'll pop up automatically |
| 4:56.0 | and await your approval, and it'll let you log in and change those values. |
| 5:03.7 | All right. I think I added all of them. Let's just see, |
| 5:12.4 | I'm going to come over and take a look at our yeah, |
| 5:17.2 | you can see here, the way that we, we organize these is, is interesting, right? |
| 5:22.0 | So we'll, we'll organize them so that you can you |
| 5:27.3 | know, open it up and, and click on each individual |
| 5:33.6 | encoder or decoder, or you can switch and test right here. |
| 5:38.4 | All right, let's go back over to activities. |
| 5:42.4 | So now we'll want to change the switcher |
| 5:47.2 | over to encoders and decoders. |
| 5:50.0 | And you can see here our convert IP, |
| 5:53.8 | Matrox encoders and decoders all set up, ready to go. |
| 5:58.6 | And we'll leave the audio for the display |
| 6:01.1 | and the power already set up for the display. |
| 6:04.9 | Now, when we come in here, |
| 6:06.4 | we have a very different interface, right? |
| 6:09.1 | And you can see all it takes is one press, |
| 6:12.1 | and then you can click over here. |
| 6:14.1 | We also have a drag and drop feature, |
| 6:16.2 | so you can press and hold and drag it over. |
| 6:19.7 | And of course, we have our send to all. |
| 6:22.4 | At any time, you can select an input |
| 6:24.9 | and press this all button, |
| 6:26.9 | and it sends everything where it needs to go. |
| 6:39.5 | At any time, if you need to start over |
| 6:42.1 | or you need help with the user manual, |
| 6:44.2 | So full user manual, it can be found right here. |
| 6:48.7 | And the quick start, |
| 6:50.2 | if you need to watch a quick start again, |
| 6:52.2 | you can play that right here. |
| 6:54.8 | And if you need to do a factory reset |
| 6:57.3 | or update the database, you can do that right here. |
| 7:03.1 | Thank you for your time. |
