# Manual Generation Instructions

You chose the manual generation path for the Continuous Walkthrough camera style.

To replace the solid-color placeholder videos with realistic AI video, generate them sequentially in a video AI tool (like Luma, Kling, Runway, or Midjourney + Seedance).

## 1. The Stills
Generate 4 wide 16:9 images using the prompts in prompt_scene1.txt to prompt_scene4.txt. Save them as scene1.png, scene2.png, etc.

## 2. The Video Legs
Generate the 8-second clips. Because this is a continuous walkthrough, the camera only glides forward. NO CONNECTORS are needed.

| Scene | Prompt | Start Image | Save As |
|---|---|---|---|
| 1 | prompt_scene1.txt + " gliding smoothly FORWARD\ | scene1.png | assets/vid/scene1.mp4 |
| 2 | prompt_scene2.txt + \continue gliding smoothly FORWARD\ | Extract the LAST frame from scene1.mp4 | assets/vid/scene2.mp4 |
| 3 | prompt_scene3.txt + \continue gliding smoothly FORWARD\ | Extract the LAST frame from scene2.mp4 | assets/vid/scene3.mp4 |
| 4 | prompt_scene4.txt + \continue gliding smoothly FORWARD\ | Extract the LAST frame from scene3.mp4 | assets/vid/scene4.mp4 |

Once you have the MP4s, simply replace the placeholder dummy videos in ssets/vid/ and the page will instantly update!