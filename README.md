# bamboo-fountain-web
Bamboo Fountain is an open source screenplay editor that includes all your basic script writing needs, made by ronin-on-linux, using components from Fountain.

bamboo-fountain-web provides a writing experience that is pleasantly simple, allowing you to feel at home with its theme-able UI, while being accessible from anywhere and offline.

Future Developments:
- My next goal is to get a native gtk or qt linux desktop version started in development soon, with the aim of replicating and expanding the functionality of Bamboo Fountain, offering a fully featured screenplay writing software for creatives who prefer the open source ecosystem and dislike electron apps. (native app will be published under a separate git repo)
- Implement dual dialogue fountain compatibility into web app.
- Page and scene numbers for pdf export.

Current Features:
- Permissive MIT License
- 'Take Tour' example file to help new users get started.
- Open and save locally, with autosave recovery. Ctrl + S and has file save toasts and manual save button.
- 'Ctrl + Z' and 'Ctrl + Y' undo/redo.
- Intuitive Title Page and Screenplay editor, with live line formatting, using JS blocks to manage each line format with intuitive line type guessing that stays out of your way.
- Slick and simple UI with dynamic line id tags that reveal line type.
- Multiple beautiful themes that are popular amongst linux users. Themes persist even if window is closed. Auto-theme detects your OS light or dark mode.
- Rearrangeable scenes in the left-side outliner (collapsible outliner for better focus).
- PDF and Fountain save/export.
- #1#, #101# and #A1# scene numbering in .fountain export.
- Press Tab to cycle your line through block types (Action, Scene, Character, etc). (Alternatively Ctrl + Shift + [first letter of your line type] also works).
- Character name detection. Exising names can be typed on a new line and will auto format to character and queue dialogue upon hitting enter. Adding vo, os, oc short hand will also auto format to their appropriate syntax. (e.g. if there is at least one existing character line for 'JOHN' and you type: 'john vo' on a new line and press Enter, it will result in JOHN (V.O.), indent the line correctly, and queue dialogue).
- Hosted on GitHub Pages, but has built in PWA compatibility so you can install and use offline.

> [!INFO] 
> This was a weekend project that I decided to vibe code since I have no interest in learning javascript at the moment, that allowed me to block out my ideas and get a feel for what I want to do with the native linux desktop app. I will attempt to learn and program the native application with my own skills, but I knew I wanted an online version, and this is the result.
