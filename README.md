# bamboo-fountain-web
Bamboo Fountain is an open source screenplay editor that includes all your basic script writing needs, directed by ronin-on-linux, using components from Fountain.

bamboo-fountain-web provides a writing experience that is pleasantly simple, allowing you to feel at home with its theme-able UI, while being accessible from anywhere and offline. No server access, no cloud, no AI assistant features. Just focused screenwriting.

<img width="1201" height="898" alt="Document" src="https://github.com/user-attachments/assets/4de3bca1-af6a-44b6-8654-3b096084a45c" />

## Future Developments
- [ ] My next goal is to get a native gtk or qt linux desktop version started in development soon, with the aim of replicating and expanding the functionality of Bamboo Fountain, offering a fully featured screenplay writing software for creatives who prefer the open source ecosystem and dislike electron apps. (native app will be published under a separate git repo)
- [ ] Implement markdown mode and text selection outside of individual text blocks.
- [ ] Implement dual dialogue fountain compatibility into web app.
- [ ] Implement screenplay length estimates and action/dialogue statistics.
- [ ] Page and scene numbers for pdf export.
- [ ] Make sub-theme accents persistant between close and next open.
- [ ] Eventually integrate note encryption of some sort to keep users data safe.

## Current Features
- Permissive MIT License
- 'Take Tour' example file to help new users get started.
- Open and save locally, with background autosave recovery. Ctrl + S and has file save toasts and manual save button.
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

> [!NOTE] 
> This is a project that I decided to vibe code since I have no interest in learning javascript and react at the moment, that allowed me to block out my ideas and get a feel for what I want to do with the native Linux desktop app. My goal is to code the desktop version from scratch and I am using this vibe-coding method to experiment with different methods and ideas as well as receive direction and feedback from users prior to settling down and writing my own code for the native desktop app for Linux and Windows.
>
> I try to review the code myself to make sure that I know what the code is generally doing and that nothing glaringly problematic is published. Because I am not the most prolific coder, the final native desktop version may not look exactly like the react/js version, so I will probably let this live on the progressive web app world even after I publish the desktop version so that mac users can still access the tool. (I have ZERO experience in xcode or swift and don't own a mac.)
