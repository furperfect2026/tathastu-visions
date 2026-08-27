# Assets Handoff for Lets-Scroll

Since you chose the **Continuous Walkthrough** (Architecture A) and **Desktop + Mobile**, the camera never pulls back. It glides forward through all 6 scenes as one unbroken take.

To make the transition seamless (no cuts), **every video must start on the EXACT last frame of the previous video**. 
For the mobile version, you will run the same prompts but in a **9:16 portrait** aspect ratio.

## Step 1: The Initial Still Image
Generate the very first image to kick off the journey. You need one 16:9 (Landscape) and one 9:16 (Portrait).

| Prompt File | Instructions | Save As | Status |
|---|---|---|---|
| `still_blueprint.txt` | Generate 1x Landscape (16:9) and 1x Portrait (9:16) image. | `still_blueprint.png` (Desktop) <br> `still_blueprint-m.png` (Mobile) | Pending |

## Step 2: The Video Chain (Desktop 16:9)
Use an AI video tool that supports **Start Image** conditioning (like Runway Gen-3, Luma Dream Machine, or Kling). Set the duration to ~8 seconds.

| Prompt File | Start Image (Conditioning) | Save As | Status |
|---|---|---|---|
| `leg_1_blueprint.txt` | `still_blueprint.png` | `leg_1_blueprint.mp4` | Pending |
| `leg_2_groundwork.txt` | *The LAST frame of `leg_1_blueprint.mp4`* | `leg_2_groundwork.mp4` | Pending |
| `leg_3_framing.txt` | *The LAST frame of `leg_2_groundwork.mp4`* | `leg_3_framing.mp4` | Pending |
| `leg_4_exterior.txt` | *The LAST frame of `leg_3_framing.mp4`* | `leg_4_exterior.mp4` | Pending |
| `leg_5_interior.txt` | *The LAST frame of `leg_4_exterior.mp4`* | `leg_5_interior.mp4` | Pending |
| `leg_6_masterpiece.txt`| *The LAST frame of `leg_5_interior.mp4`* | `leg_6_masterpiece.mp4` | Pending |

## Step 3: The Video Chain (Mobile 9:16)
Repeat Step 2, but use your Portrait (9:16) start images and set your video generator to 9:16 ratio.

| Prompt File | Start Image (Conditioning) | Save As | Status |
|---|---|---|---|
| `leg_1_blueprint.txt` | `still_blueprint-m.png` | `leg_1_blueprint-m.mp4` | Pending |
| `leg_2_groundwork.txt` | *The LAST frame of `leg_1_blueprint-m.mp4`* | `leg_2_groundwork-m.mp4` | Pending |
| `leg_3_framing.txt` | *The LAST frame of `leg_2_groundwork-m.mp4`* | `leg_3_framing-m.mp4` | Pending |
| `leg_4_exterior.txt` | *The LAST frame of `leg_3_framing-m.mp4`* | `leg_4_exterior-m.mp4` | Pending |
| `leg_5_interior.txt` | *The LAST frame of `leg_4_exterior-m.mp4`* | `leg_5_interior-m.mp4` | Pending |
| `leg_6_masterpiece.txt`| *The LAST frame of `leg_5_interior-m.mp4`* | `leg_6_masterpiece-m.mp4` | Pending |

**Important:** To get the last frame of a video, you can just pause the video at the very end and take a screenshot, or use a free tool online to extract the final frame.
