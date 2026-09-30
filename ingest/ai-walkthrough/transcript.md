# CTRLbot.AI Walkthrough — transcript

Source: `CTRLbot AI Walkthrough.mp4` (4:22, 1362x1074, 10fps, mono AAC).
Transcribed 2026-08-13 with `faster-whisper` `medium.en`, VAD-filtered, then corrected by
hand against the frames.

**Corrections applied.** The speaker says "control bot" throughout; per the style guide in
`../../0 - CTRLbot.ai/ctrlbot.ai/docs/about/About_CTRLbot_AI.md` that is written **CTRLbot**
(pronounced "Control Bot"). Filler repeats and false starts are kept — this is the script
of record, not a polished read.

---

## Timestamped transcript

| Time | Line |
| --- | --- |
| 0:00 | Welcome to CTRLbot.AI. |
| 0:04 | The AI chatbot that asks questions first and assumes later. |
| 0:10 | This is how it works. |
| 0:13 | You put in a problem you're having, and it'll try and troubleshoot that problem and give you the best answer possible by asking you a series of questions. |
| 0:25 | *[types]* I broke my phone. |
| 0:30 | Great. It's experiencing a hardware failure or something, then ask you some questions. |
| 0:35 | Yes, I cracked it. |
| 0:37 | Did I break it myself? No. |
| 0:39 | Is it old? Yes. |
| 0:42 | Is your phone too old? No. |
| 0:45 | These answers then go in and make the next assumption better, right? |
| 0:51 | You're asking about it. And it gives you a snarky reply, right? There's some snark here, right? |
| 0:57 | And this is because it's not trying to make you feel better about anything. |
| 1:07 | It's trying to really help you and give you hard truths. |
| 1:12 | And it wants the user to feel like it has integrity — that it's not just trying to say what the user wants to hear. |
| 1:25 | And that's important, because most chatbots out there, they're designed to want to please the user over quality information. |
| 1:37 | Well, here you go. Oh, battery degradation, right? Phone is completely dead. |
| 1:43 | Then it gives you three questions. |
| 1:44 | Is your phone fully dead — no power button, no light — or is it just unresponsive, screen on but frozen? |
| 1:52 | No, my phone is stuck or frozen, right? |
| 1:56 | Ah, it does some thinking. |
| 2:00 | And then it gives me three really good links. |
| 2:03 | I have a nice Wikipedia link, a nice Reddit link, and then a video that'll actually help with the problem. |
| 2:12 | Great, it's not dead or frozen. You smashed the screen on a phone that's not ancient, and it's now your problem. |
| 2:21 | Right, there's some snark here, but it's gonna tell you how to restart it, right? |
| 2:26 | It says hold down your volume key, blah, blah, blah, blah. |
| 2:30 | That's essentially what CTRLbot is, right? |
| 2:33 | It's a troubleshooter that's going to give you real good links, and it's no nonsense. |
| 2:40 | It has some attitude — but that attitude is what makes it different, and makes it more believable. |
| 2:53 | The other thing you'll notice about the UI is that it's all black. |
| 2:58 | There isn't sign-in, there isn't anything else. There isn't all of this external stuff. |
| 3:04 | It's just nice and clean. And if you wait long enough, you'll see that it will start prompting you for questions, right? |
| 3:15 | This is the frequently asked questions system, and the way it works is that you can click on any of these. |
| 3:20 | "Is CTRLbot.AI free to use?" Yes, it's free to use. There's no login, no account, no subscription required. |
| 3:27 | Then it'll give you follow-up questions that related to this, and in this way you can dig down and find out more about CTRLbot.AI. |
| 3:39 | The other little hidden feature that a lot of people don't see is you can manipulate the AI real easy — make a small change by just clicking on the CTRLbot. |
| 3:51 | Look at that. Now we're in white mode. |
| 3:54 | Click on it again. Now we're in emergency construction mode — construction yellow mode. |
| 4:01 | This is the AV mode. |
| 4:04 | And then this is my favorite, retro 80s mode. |
| 4:09 | And that essentially is what CTRLbot is, how to use it, and what its primary reason for existence is. |
| 4:19 | Thank you. |

---

## What is on screen, beat by beat

Verified against extracted frames, not inferred from the audio.

| Time | Screen |
| --- | --- |
| 0:00–0:25 | Black page. Logo, empty prompt pill, placeholder *"Spill it"*. Nothing else. |
| 0:25–0:30 | `I broke my phone` typed into the pill. |
| 0:30–0:45 | Instant assumption card, then five Q.AI rows streaming in with YES/NO buttons: *Is the screen cracked or physically damaged?* / *Did you break your phone yourself?* / *Is your device older than your last relationship?* / *Is your phone too old?* / *Are you using iCloud?* |
| 0:45–1:43 | L.AI #1 — the long assumption ("Congrats on your third phone in three years"), one Wikipedia resource link (*Battery degradation*), then the targeted question with YES / NO / PASS, each button carrying its own explanation. |
| 1:52–2:00 | NO picked — "stuck or frozen". Thinking state. |
| 2:00–2:30 | Final output: three resource links (Wikipedia *Smartphone*, Reddit *r/mobilerepair*, YouTube *JerryRigEverything*) followed by the answer in voice. |
| 2:53–3:39 | Reset to the blank page. The FAQ auto-surfaces on idle, a question is clicked, the pre-written answer types out, related follow-ups appear underneath. |
| 3:39–4:11 | Theme cycling by clicking the logo: **light → orange → yellow → AV gradient → 8-bit DOS green → back to dark**. |

## Notes for scripting

- The speaker's core claim is the product's own positioning: *asks questions first, assumes
  later*, and the snark is a **trust mechanism**, not decoration. Both are approved claims.
- "No login, no account, no subscription" is approved verbatim.
- The theme order the speaker narrates skips orange; the frames show all six. Use the frame
  order.
- "Control bot" is never written that way. `CTRLbot.AI` is the assistant, `CTRLbot` is the
  platform, `ctrlbot.ai` is only ever the address.
